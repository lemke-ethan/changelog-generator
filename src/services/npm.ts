// Copyright 2024 MFB Technologies, Inc.

import path from "path"
import { readJson } from "./fileSystem.js"

export async function getCurrentProjectName(
  projectRootDir: string
): Promise<string> {
  const projectPackageJsonPath = path.resolve(projectRootDir, "package.json")
  const rawPackageJson = await readJson(projectPackageJsonPath)
  if (!isPackageJson(rawPackageJson)) {
    throw new Error(`Invalid package.json at ${projectPackageJsonPath}.`)
  }
  return rawPackageJson.name
}

type PackageJson = {
  name: string
}
export function isPackageJson(obj: unknown): obj is PackageJson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    typeof obj.name === "string"
  )
}
