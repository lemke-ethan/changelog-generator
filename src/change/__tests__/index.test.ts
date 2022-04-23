import { change } from "../index";

it("does not throw", () => {
  expect(() => {
    change();
  }).not.toThrow();
});
