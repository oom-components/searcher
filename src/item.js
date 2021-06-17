export default class Item extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
    :host(:not([hidden])) {
      display: block;
    }
    :host(.is-focused) {
      background: gray;
    }
    button {
      display: block;
      box-sizing: border-box;
      width: 100%;
      text-align: inherit;
      border: none;
      padding: 0;
      background: none;
    }
    </style>
    <button type="button"><slot></slot></button>
    `;

    this.addEventListener("focus", () => this.focused = true);
    this.addEventListener("mouseenter", () => this.focused = true);
    this.addEventListener("click", () => this.select());
    this.hidden = true;
  }

  query(query) {
    this.hidden = !query || this.innerText.indexOf(query) === -1;
  }

  set hidden(value) {
    super.hidden = value;

    if (value) {
      this.focused = false;
      this.selected = false;
    }
  }

  select() {
    this.dispatchEvent(new CustomEvent("selected", { bubbles: true }));
  }

  set focused(enable) {
    if (enable) {
      const prev = this.searcher.focusedItem;

      if (prev) {
        prev.focused = false;
      }
      this.classList.add("is-focused");
    } else {
      this.classList.remove("is-focused");
    }
  }

  get focused() {
    return this.classList.contains("is-focused");
  }

  get searcher() {
    return this.closest("search-form");
  }
}

customElements.define("search-item", Item);
