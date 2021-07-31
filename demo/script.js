import "../searcher.js";

const searcher = document.querySelector("search-form");

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    searcher.data = json;
  });

searcher.addEventListener("selected", (ev) => {
  console.log(ev.target.value);
});
