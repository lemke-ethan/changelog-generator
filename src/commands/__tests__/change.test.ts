// Copyright 2024 MFB Technologies, Inc.

import { change } from "../change"

it("does not throw", async () => {
  await expect(change()).resolves.not.toThrow()
})
