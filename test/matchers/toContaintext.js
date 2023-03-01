/* import { matcherHint, printExpected } from "jest-matcher-utils";

  export const toContaintext = (received, expectedText) => {
    const pass = received.textContent.includes(expectedText);

    const message = () =>
      matcherHint("toContainText", "element", printExpected(expectedText), {});

    return { pass, message };
  };
 */

import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (received, expectedText) => {
  const pass = received.textContent.includes(expectedText);

  const sourceHint = () =>
    matcherHint("toContainText", "element", printExpected(expectedText), {
      isNot: pass,
    });

  const actualTextHint = () =>
    "Actual text: " + printReceived(received.textContent);

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return { pass, message };
};
