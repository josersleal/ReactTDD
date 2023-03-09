import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) => {
  act(() => ReactDOM.createRoot(container).render(component));
};

export const click = (element) => {
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

export const element = (selector) => document.querySelector(selector);
export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));
export const typesOf = (elements) => elements.map((element) => element.type);
export const textOf = (elements) =>
  elements.map((element) => element.textContent);

export const form = (id) => element("form");
export const field = (fieldName) => form().elements[fieldName];
