import { toContainText } from "./matchers/toContaintext";
import { toHaveClass } from "./matchers/toHaveClass";

expect.extend({
  toContainText,
  toHaveClass,
});
