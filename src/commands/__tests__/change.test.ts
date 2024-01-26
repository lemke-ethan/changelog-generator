// Copyright 2024 MFB Technologies, Inc.

import { change } from "../change"

it("does not throw", () => {
  expect(() => {
    change()
  }).not.toThrow()
})
