import { galileoReact } from "./core";
import { counter } from "./components";
import "./style.css";

/** @jsx galileoReact.createElement */
function App(props) {
  return galileoReact.createElement("main", null, counter());
}

const element = galileoReact.createElement(App, null);
// const element = galileoReact.createElement("h1", null, "h1 world");
const container = document.getElementById("root");
galileoReact.render(element, container);
