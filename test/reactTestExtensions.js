import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

export let container;

export const runningTest = () =>
  console.log("runningTest; ", expect.getState().currentTestName);

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) => {
  act(() => ReactDOM.createRoot(container).render(component));
};

export const click = (element) => {
  // runningTest();
  // console.log("@click: ", element);
  act(() => {
    element.click();
  });
};

export const submit = (formElement) => {
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  });

  act(() => formElement.dispatchEvent(event));

  return event;
};

export const labelFor = (fieldForName) => element(`label[for=${fieldForName}]`);


export const element = (selector) => document.querySelector(selector);
export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));
export const typesOf = (elements) => elements.map((element) => element.type);
export const textOf = (elements) =>
  elements.map((element) => element.textContent);

export const form = (id) => element("form");
export const fieldOnForm = (fieldName) => form().elements[fieldName];

export const submitButton = () => element("input[type=submit]");

const originalValueProperty = (reactElement) => {
  const prototype = Object.getPrototypeOf(reactElement);
  return Object.getOwnPropertyDescriptor(prototype, "value");
};

export const change = (target, value) => {
  originalValueProperty(target).set.call(target, value);

  const event = new Event("change", {
    target,
    bubbles: true,
  });
  act(() => target.dispatchEvent(event));
};
