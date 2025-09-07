import { createDom } from "./ReactDOM";

function commitRoot() {
  deletions.forEach(commitWork);
  // add nodes to DOM
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  // domParent.appendChild(fiber.dom);
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // update dom
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateDom(dom, prevProps, nextProps) {
  // remove old props
  Object.keys(prevProps)
    .filter((key) => key !== "children")
    .filter((key) => !(key in nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // set new or unchanged props
  Object.keys(nextProps)
    .filter((key) => key !== "children")
    .filter((key) => prevProps[key] !== nextProps[key])
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter((key) => key.startsWith("on"))
    .filter((key) => !(key in nextProps) || prevProps[key] !== nextProps[key])
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // add new event listeners
  Object.keys(nextProps)
    .filter((key) => key.startsWith("on"))
    .filter((key) => prevProps[key] !== nextProps[key])
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

// concurrent mode
export let nextUnitOfWork = null;
export let currentRoot = null; // last fiber tree
export let wipRoot = null; // work in progress root
export let deletions = null;

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
  reconcilerChildren(fiber, elements);

  // simple version, not considering update and delete
  // const elements = fiber.props.children;
  // let index = 0;
  // let prevSibling = null;
  // while (index < elements.length) {
  //   const element = elements[index];

  //   const newFiber = {
  //     type: element.type,
  //     props: element.props,
  //     parent: fiber,
  //     dom: null,
  //   };
  //   // first sub element is child, others are siblings
  //   if (index === 0) {
  //     fiber.child = newFiber;
  //   } else {
  //     prevSibling.sibling = newFiber;
  //   }
  //   prevSibling = newFiber;
  //   index++;
  // }

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
  //   step 4: null, for top root fiber
  return null;
}

function reconcilerChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      // keep dom node and update props
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    // type is different and there is new element
    if (element && !sameType) {
      // create new dom node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    // type is different and there is oldFiber
    if (oldFiber && !sameType) {
      // delete the oldFiber's dom node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    index++;
  }
}
