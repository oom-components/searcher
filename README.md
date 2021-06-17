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
<oom-searcher></oom-searcher>
```

### JS

Use javascript for a complete experience:

```js
import "./searcher.js";

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    const searcher = document.querySelector("oom-searcher");
    searcher.data = json;
  });
```
