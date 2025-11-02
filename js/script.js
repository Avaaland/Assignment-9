console.log("script.js loaded");

const API_KEY = "UXIw3o9wtaCFWri8zRyAmq8OyJ7vrybf";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";
const LIMIT = 12;
const RATING = "g";
const LANG = "en";

const inputEl = document.querySelector("#search-input");
const fetchBtn = document.querySelector("#fetch-gif-btn");

function endpointFor(query) {
    const q = encodeURIComponent(query);
    return `${BASE_URL}?api_key=${API_KEY}&q=${q}&limit=${LIMIT}&rating=${RATING}&lang=${LANG}`;
}

async function fetchGifs(query) {
    const res = await fetch(endpointFor(query));
    const data = await res.json();
    console.log("Raw Giphy data:", data);
}

fetchBtn.addEventListener("click", async () => {
    const query = (inputEl.value || "cats").trim();
    await fetchGifs(query);
})

