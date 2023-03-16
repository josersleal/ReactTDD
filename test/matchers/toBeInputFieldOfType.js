import { matcherHint, printExpected } from "jest-matcher-utils";

export const toBeInputFieldOfType = (element, expectedType) => {
  const pass = element?.tagName === "INPUT" && element.type === expectedType;

  const sourceHint = () =>
    matcherHint(
      "toBeInputFieldOfType",
      "element",
      printExpected(expectedType),
      { isNot: pass }
    );

  const receivedText = () => {
    if (!element) "element was not found!";
    if (element?.tagName !== "INPUT") `<${element?.tagName.toLowerCase()}>`;
    return `<input type=${element.type}`;
  };

  const actualHint = () => `Actual: ${receivedText}`;

  const message = () => [sourceHint(), actualHint()].join("\n\n");

  return { pass, message };
};
