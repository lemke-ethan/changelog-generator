// Copyright 2025 MFB Technologies, Inc.

import jsonToMd from "json2md"

// TODO: fix the typing
export function convertToMarkdown(value: Record<string, unknown>[]): string {
  return jsonToMd(value)
}
