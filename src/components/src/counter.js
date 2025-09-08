import { galileoReact } from "../../core";

export default function Counter() {
  const [n, setN] = galileoReact.useState(0);
  return galileoReact.createElement(
    "div",
    null,
    galileoReact.createElement("h1", null, n),
    galileoReact.createElement("div", null, "click to change number"),
    galileoReact.createElement("button", { onclick: () => setN(n + 1) }, "+"),
    galileoReact.createElement("button", { onclick: () => setN(n - 1) }, "-")
  );
}
