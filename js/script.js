console.log("script.js loaded");

const API_KEY = "UXIw3o9wtaCFWri8zRyAmq8OyJ7vrybf";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";
const LIMIT = 12;
const RATING = "g";
const LANG = "en";

const inputEl = document.querySelector("#search-input");
const fetchBtn = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");
const statusMsg = document.querySelector("#status-msg");

function setStatus(msg = "") {
    if (statusMsg) {
        statusMsg.textContent = msg;
    } else {
        console.log(msg);
    }
}

function endpointFor(query) {
    const q = encodeURIComponent(query);
    return `${BASE_URL}?api_key=${API_KEY}&q=${q}&limit=${LIMIT}&rating=${RATING}&lang=${LANG}`;
}

function renderGifs(items) {
    gifContainer.innerHTML = "";
    if (!items || items.length === 0) {
        setStatus("No results. Try another search.");
        return;
    }
    setStatus(`Showing ${items.length} GIF${items.length > 1 ? "s" : ""}.`);
    const html = items.map(g => {
        const url = g.images?.fixed_width?.url;
        const alt = g.title || "Giphy GIF";
        return `
            <div class="col-6 col-md-4 col-lg-3">
                <img src="${url}" alt="${alt}" class="img-fluid img-gif shadow-sm" loading="lazy">
            </div>`;
    }).join ("");
    gifContainer.innerHTML = html;
}

async function fetchGifs(query) {
    try {
        setStatus("Loading...");
        const res = await fetch(endpointFor(query));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderGifs(data.data);
    }   catch (err) {
        console.error(err);
        setStatus("Error fetching GIFs. Please try again.");
        gifContainer.innerHTML = "";
    }
}

fetchBtn.addEventListener("click", async () => {
    const query = (inputEl.value || "cats").trim();
    await fetchGifs(query);
});

inputEl.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const query = (inputEl.value || "cats").trim();
        await fetchGifs(query);
    }
});