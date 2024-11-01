// Copyright 2024 MFB Technologies, Inc.

import path from "path"
import { readJson } from "./fileSystem.js"

/** @throws an error if the package.json is invalid. */
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

/** @throws an error if the package.json is invalid. */
export async function getCurrentProjectVersion(
  projectRootDir: string
): Promise<string> {
  const projectPackageJsonPath = path.resolve(projectRootDir, "package.json")
  const rawPackageJson = await readJson(projectPackageJsonPath)
  if (!isPackageJson(rawPackageJson)) {
    throw new Error(`Invalid package.json at ${projectPackageJsonPath}.`)
  }
  return rawPackageJson.version
}

type PackageJson = {
  name: string
  version: string
}
export function isPackageJson(obj: unknown): obj is PackageJson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "version" in obj &&
    typeof obj.version === "string"
  )
}
