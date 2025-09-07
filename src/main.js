import { galileoReact } from "./core";

/** @jsx galileoReact.createElement */
function App(props) {
  return galileoReact.createElement("h1", null, "Hello ", props.name);
}

const element = galileoReact.createElement(App, { name: "galileoPage" });
// const element = galileoReact.createElement("h1", null, "h1 world");
const container = document.getElementById("app");
galileoReact.render(element, container);
