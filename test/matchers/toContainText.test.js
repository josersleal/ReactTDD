/* import { toContaintext } from "./toContaintext";

const stripTerminalColor = (text) => text.replace(/\x1B\[d+m/g, "");

describe("toContaintext matcher", function () {
  it("returns pass is true when text is found in the given DOM element", () => {
    const domElement = {
      textContent: "textToFind",
    };
    const result = toContaintext(domElement, "textToFind");

    expect(result.pass).toBe(true);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { textContent: "" };
    const result = toContaintext(domElement, "text to find");

    expect(stripTerminalColor(result.message())).toContain(
      'expect(element).toContainText("text to find")'
    );
  });
});
 */
// TODO: review why above not passing?
import { toContainText } from "./toContaintext";

describe("toContainText matcher", () => {
  const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");

  it("returns pass is true when text is found in the given DOM element", () => {
    const domElement = {
      textContent: "text to find",
    };
    const result = toContainText(domElement, "text to find");
    expect(result.pass).toBe(true);
  });

  it("return pass is false when the text is not found in the given DOM element", () => {
    const domElement = { textContent: "" };
    const result = toContainText(domElement, "text to find");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { textContent: "" };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toContainText("text to find")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      textContent: "text to find",
    };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toContainText("text to find")`
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = {
      textContent: "text to find",
    };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual text: "text to find"`
    );
  });
});
