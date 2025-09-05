import { createDom } from "./ReactDOM";

function commitRoot() {
  // TBD: add nodes to DOM
}

// concurrent mode
export let nextUnitOfWork = null;
export let wipRoot = null; // work in progress root

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    // whether remaining time for this free cycle is enough
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  // 1. create dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  //   We are adding a new node to the DOM each time we work on an element.
  // And the browser could interrupt our work before we finish rendering the whole tree.
  // In that case, the user will see an incomplete UI. And we don’t want that.
  //   if (fiber.parent) {
  //     fiber.parent.dom.appendChild(fiber.dom);
  //   }
  // 2. create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
    // first sub element is child, others are siblings
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // 3. return next unit of work
  //   step 1: child
  if (fiber.child) {
    return fiber.child;
  }

  //  step 2: sibling
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // step 3: uncle
    nextFiber = nextFiber.parent;
  }
}
