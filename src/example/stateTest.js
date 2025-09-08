import { galileoReact } from "../core";

function Counter() {
  const [n, setN] = galileoReact.useState(0);
  return (
    // <div>
    //   <h1>{n}</h1>
    //   <button onClick={() => setN(n + 1)}>+</button>
    //   <button onClick={() => setN(n - 1)}>-</button>
    // </div>
    galileoReact.createElement(
      "div",
      null,
      galileoReact.createElement("h1", null, n),
      galileoReact.createElement("button", { onclick: () => setN(n + 1) }, "+"),
      galileoReact.createElement("button", { onclick: () => setN(n - 1) }, "-")
    )
  );
}

galileoReact.render(
  galileoReact.createElement(Counter, null),
  document.getElementById("root")
);
