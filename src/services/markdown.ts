// Copyright 2025 MFB Technologies, Inc.

import jsonToMd from "json2md"

export function convertToMarkdown(
  value: (
    | {
        h1: string
        p?: undefined
      }
    | {
        p: string
        h1?: undefined
      }
    | [
        {
          h3: string
        },
        {
          ul: string[]
        }
      ]
    | {
        h2: string
        p?: undefined
      }
    | {
        p: string
        h2?: undefined
      }
  )[]
): string {
  return jsonToMd(value)
}
