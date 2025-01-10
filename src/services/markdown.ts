// Copyright 2025 MFB Technologies, Inc.

import jsonToMd from "json2md"

export function createJsonConverter(): {
  toMarkdown: (value: Record<string, unknown>[]) => string
} {
  // fix the lint errors with unordered list items
  jsonToMd.converters.ul = inputs => {
    return inputs.reduce((result, input) => result + "\n- " + input, "")
  }
  return {
    toMarkdown: convertToMarkdown
  }
}

// TODO: fix the typing
function convertToMarkdown(value: Record<string, unknown>[]): string {
  return jsonToMd(value)
}
