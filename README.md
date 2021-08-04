# @oom/searcher

Javascript library to include a searcher from a json file.

- Build with ES6.
- No default CSS styles provided (yes, it's a feature).

## Install

```sh
npm install @oom/searcher
```

## Usage

### HTML

Let's start with the following html code:

```html
<oom-search label="Search" placeholder="Type to search" src="path/to/data.json"></oom-search>
```

The JSON must have the following structure:

```json
[
  {
    "value": "Returned value on select",
    "label": "(optional) visible text of this option. If it's empty, the 'value' property will be used",
    "search": "(optional) to include extra text to search (in addition to 'label')"
  }
]
```

### JS

Use javascript for a complete experience:

```js
import Searcher from "./searcher.js";

// Register the component
customElements.define("oom-search", Searcher);

// Set a callback
const searcher = document.querySelector("search-form");

searcher.addEventListener("selected", (ev) => {
  const { value } = ev.detail;
  window.location.href = value;
});
```

### CSS

This web component uses
[::part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for styling:

```css
/* Style for the search-box container */
oom-search {
}

/* Styles for the input */
oom-search::part(input) {
}
oom-search::part(input):focus {
}

/* Styles for the label */
oom-search::part(label) {
}

/* Styles for the list of items */
oom-search::part(items) {
}

/* Style for the individual items */
oom-search::part(item) {
}

/* Style the active item */
oom-search::part(active) {
}
```

See the [demo](demo) for styling examples.
