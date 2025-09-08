// currently rendering fiber
let currentFunctionFiber = null;
let hookIndex = null;
let scheduleUpdateRoot = () => {};

export function injectScheduleUpdateRoot(fn) {
  scheduleUpdateRoot = typeof fn === "function" ? fn : () => {};
}

export function prepareToUseHooks(fiber) {
  currentFunctionFiber = fiber;
  hookIndex = 0;
  if (!fiber.hooks) {
    fiber.hooks = [];
  }
}

export function useState(initial) {
  const oldHook =
    currentFunctionFiber.alternate &&
    currentFunctionFiber.alternate.hooks &&
    currentFunctionFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = typeof action === "function" ? action(hook.state) : action;
  });

  const setState = (action) => {
    hook.queue.push(action);
    console.log("hook.queue is ", hook.queue);
    console.log("action is ", action);

    scheduleUpdateRoot();
  };

  currentFunctionFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
