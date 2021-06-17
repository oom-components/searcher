import Item from "./item.js";

export default class Searcher extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
    :host {
      display: inline-block;
      position: relative;
    }
    div {
      position: absolute;
      width: 100%;
      overflow-y: auto;
      max-height: 500px;
      box-shadow: 0 1px 4px #0003;
    }
    </style>
    <input type="search" autocomplete="off">
    <div>
      <slot></slot>
    </div>
    `;
    this.input = shadow.querySelector("input");

    this.addEventListener("selected", (event) => {
      this.input.value = event.target.innerText;
      this.matchItems.forEach((item) => item.hidden = true);
    });
  }

  set data(data) {
    this.innerHTML = "";

    for (const row of data) {
      const item = new Item();
      item.innerHTML = row.label;
      item.setAttribute("value", row.value);
      this.appendChild(item);
    }
  }

  connectedCallback() {
    const { input } = this;
    input.addEventListener("input", () => this.search(input.value));
    input.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowDown": {
          event.preventDefault();
          const focused = this.focusedItem;
          const matches = Array.from(this.matchItems);

          if (focused) {
            const key = matches.indexOf(focused);

            if (matches[key + 1]) {
              matches[key + 1].focused = true;
              scroll(matches[key + 1]);
            }
          } else if (matches.length) {
            matches[0].focused = true;
            scroll(matches[0]);
          }
          break;
        }

        case "ArrowUp": {
          event.preventDefault();
          const focused = this.focusedItem;

          if (focused) {
            const matches = Array.from(this.matchItems);
            const key = matches.indexOf(focused);

            if (key > 0) {
              matches[key - 1].focused = true;
              scroll(matches[key - 1]);
            }
          }
          break;
        }

        case "Enter":
          const focused = this.focusedItem;

          if (focused) {
            focused.select();
          }
          break;

        case "Escape":
          input.value = "";
          this.search("");
          break;
      }
    });
  }

  get items() {
    return this.querySelectorAll("search-item");
  }

  get focusedItem() {
    return this.querySelector("search-item.is-focused");
  }

  get selectedItem() {
    return this.querySelector("search-item.is-selected");
  }

  get matchItems() {
    return this.querySelectorAll("search-item:not([hidden])");
  }

  search(query) {
    this.items.forEach((item) => item.query(query));
    if (!this.focusedItem) {
      const first = this.matchItems[0];

      if (first) {
        first.focused = true;
      }
    }
  }
}

customElements.define("search-form", Searcher);

function scroll(item) {
  let scroll;

  const viewbox = item.parentElement.getBoundingClientRect();
  const rect = item.getBoundingClientRect();

  if (viewbox.top - rect.top > 0) {
    scroll = item.previousElementSibling ? "start" : "center";
  } else if (viewbox.bottom < rect.bottom) {
    scroll = item.previousElementSibling ? "end" : "center";
  }

  if (scroll) {
    try {
      item.scrollIntoView({
        block: scroll,
      });
    } catch (err) {
      item.scrollIntoView();
    }
  }
}
