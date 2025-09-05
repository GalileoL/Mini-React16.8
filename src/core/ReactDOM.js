import { nextUnitOfWork, wipRoot } from "./reconciler";

// this is render way before fiber (before React 15), as we say, stack reconciler
// this is a recursive way to render the element to DOM
// it is not async, and it is not interruptible
// it is just a simple version of ReactDOM.render
export function renderInReact15(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // assign props except children
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  // do render for each child in props
  element.props.children.forEach((child) => renderInReact15(child, dom));

  container.appendChild(dom);
}

export function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  Object.keys(fiber.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
}

export function render(element, container) {
  // set next unit of work
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}
