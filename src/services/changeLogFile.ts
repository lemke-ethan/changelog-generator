// Copyright 2024 MFB Technologies, Inc.

import path from "path"
import { ChangeLog } from "../types/changeLog.js"
import { readJson, writeJson } from "./fileSystem.js"
import { isChangeLog } from "../types/changeLog.guards.js"
import {
  ChangeLogError,
  changeLogErrorCodes,
  createChangeLogError,
  isChangeLogError
} from "../utils/changeLogError.js"

const changeLogJsonFileName = "CHANGELOG.json"

export async function getChangelogJsonFile(args: {
  projectRootDirectory: string
}): Promise<ChangeLog | ChangeLogError> {
  const fullPath = path.join(args.projectRootDirectory, changeLogJsonFileName)
  const result = await readJson(fullPath)
  if (isChangeLog(result)) {
    return result
  } else if (isChangeLogError(result)) {
    return result
  } else {
    return createChangeLogError({
      code: changeLogErrorCodes.UNKNOWN_FILE_SYSTEM_ERROR,
      message: "Failed to load the change log JSON file."
    })
  }
}

export async function createChangelogJsonFile(args: {
  projectName: string
  projectRootDirectory: string
}): Promise<ChangeLog | ChangeLogError> {
  const data = getInitChangeLogJsonFile({ projectName: args.projectName })
  const result = await writeJson({
    path: args.projectRootDirectory,
    fileName: changeLogJsonFileName,
    data
  })
  if (!isChangeLog(result)) {
    return Promise.resolve(
      createChangeLogError({
        code: changeLogErrorCodes.INVALID_CHANGELOG_JSON,
        message: "Invalid change log JSON file."
      })
    )
  }
  return result
}

function getInitChangeLogJsonFile(args: { projectName: string }): ChangeLog {
  return {
    name: args.projectName,
    entries: []
  }
}
