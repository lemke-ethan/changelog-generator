import { change } from "../change";

it("does not throw", () => {
  expect(() => {
    change();
  }).not.toThrow();
});
