import "../src/searcher.js";

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    const searcher = document.querySelector("search-form");
    searcher.data = json;
  });
