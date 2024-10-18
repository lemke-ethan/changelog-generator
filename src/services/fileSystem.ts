// Copyright 2024 MFB Technologies, Inc.

import * as nodeFs from "fs"
import * as nodeAsyncFs from "node:fs/promises"
import path from "path"

export async function readJson(path: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    nodeFs.readFile(path, { encoding: "utf8" }, (error, data) => {
      if (error !== null) {
        reject(error)
        return
      }
      const result = JSON.parse(data)
      resolve(result)
    })
  })
}

/** Overwrites/creates the file with the data. */
export async function writeJson(args: {
  path: string
  fileName: string
  data: Record<string, unknown>
}): Promise<void> {
  await ensureFullPathExists(args.path)
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(args.data, null, 2)
    const fullPath = path.join(args.path, args.fileName)
    nodeFs.writeFile(fullPath, json, { encoding: "utf-8" }, err => {
      if (err !== null) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/** Ensures that the given path exists using recursion. If it doesn't then it is created. */
async function ensureFullPathExists(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    nodeFs.mkdir(path, { recursive: true }, err => {
      if (err !== null) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/** Gets a list of full file paths of files in the specified directory. */
export async function getFilesListInDirectory(args: {
  path: string
}): Promise<string[]> {
  if (!nodeFs.existsSync(args.path)) {
    return []
  }
  return nodeAsyncFs.readdir(args.path)
}
