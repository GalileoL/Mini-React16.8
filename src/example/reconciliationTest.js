import { galileoReact } from "../core";

// const element = galileoReact.createElement(App, { name: "galileoPage" });
const element = galileoReact.createElement("h1", null, "h1 world");
const container = document.getElementById("app");
galileoReact.render(element, container);
const element2 = galileoReact.createElement("h2", null, "h2 world");
setTimeout(() => {
  galileoReact.render(element2, container);
  console.log("time is ", new Date().toLocaleString());
}, 3000);

const element3 = galileoReact.createElement("h2", null, "h3 world");
setTimeout(() => {
  galileoReact.render(element3, container);
  console.log("time is ", new Date().toLocaleString());
}, 6000);
