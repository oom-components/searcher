import Searcher from "../searcher.js";

customElements.define("oom-search", Searcher);

const searcher = document.querySelector("oom-search");

searcher.addEventListener("selected", (ev) => {
  console.log(ev.detail);
});
