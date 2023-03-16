import { toBeInputFieldOfType } from "./toBeInputFieldOfType";

const elementFrom = (domElementToCheck) => {
  const parent = document.createElement("div");
  parent.innerHTML = domElementToCheck;

  return parent.firstChild;
};

describe.only("Given an toBeInputFieldOfType matcher", () => {
  it("Then returns pass is true when input element of the right type is found", () => {
    const domElement = elementFrom("<input type=text />");

    const result = toBeInputFieldOfType(domElement, "text");

    expect(result.pass).toBe(true);
  });

  it("Then return pass is false when the element is null", () => {
    const result = toBeInputFieldOfType(null, "text");

    expect(result.pass).toBe(false);
  });

  it("return pass is false when the element is the wrong tag", () => {
    const domElement = elementFrom("<p />");

    const result = toBeInputFieldOfType(domElement, "text");

    expect(result.pass).toBe(false);
  });

  it("return pass is false when the input element is the wrong type", () => {
    const domElement = elementFrom("<input type=date />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(result.pass).toBe(false);
  });
});
