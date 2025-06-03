# 🧰 JS Utils & Commands Library

Welcome to the **JS Utils & Commands Library** — a growing collection of reusable, plug-and-play JavaScript functions, scripts, and commands designed to save you time and keep your code DRY.

Whether you're working on a web app, a Node project, or just scripting something quick — this repo has your back.

---

## 📦 What's Inside?

- 📁 Organized by category
- 🧠 Clean, readable, well-documented code
- 🧪 Ready for testing and easy integration
- 🌐 Works in browser and Node environments (where possible)

---

## 🧠 Example Snippets

### ➕ Debounce Function

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
