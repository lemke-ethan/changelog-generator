// Copyright 2024 MFB Technologies, Inc.

import path from "path"
import { ChangeFile, isChangeFile } from "../types/changeFile.js"
import { getFilesListInDirectory, readJson, writeJson } from "./fileSystem.js"
import { changeFileDirectoryRoot } from "../constants.js"

/** Gets all of the file paths for each local change file in a specific branch. */
export async function getBranchesChangeFiles(args: {
  targetBranchName: string
  projectRootDir: string
}): Promise<string[]> {
  const changeFileFullRootDir = path.join(
    args.projectRootDir,
    changeFileDirectoryRoot
  )
  const allFileNames = await getFilesListInDirectory({
    path: changeFileFullRootDir
  })
  const branchNameFormatted = getFormattedChangeFileBranchName(
    args.targetBranchName
  )
  return allFileNames
    .filter(fileName => fileName.includes(branchNameFormatted))
    .map(fileName => path.join(changeFileFullRootDir, fileName))
}

/** Gets all of the file paths for each local change for all branches. */
export async function getAllLocalChangeFiles(args: {
  projectRootDir: string
}): Promise<string[]> {
  const changeFileFullRootDir = path.join(
    args.projectRootDir,
    changeFileDirectoryRoot
  )
  const allFileNames = await getFilesListInDirectory({
    path: changeFileFullRootDir
  })
  return allFileNames.map(fileName =>
    path.join(changeFileFullRootDir, fileName)
  )
}

/*
 * The change files will be generated in a `changes/` directory with `[branch name]_[date/time]`,
 * where the branch name uses numbers, letters and "-"s as separators and an example of the
 * date/time format is "yyyy-mm-dd-hh-mm". This directory and its contents needs to be tracked.
 */
export async function saveChangeFile(args: {
  projectRootDir: string
  currentBranchName: string
  file: ChangeFile
}): Promise<void> {
  const fileNameDelimiter = "_"
  const changeFileFullRootDir = path.join(
    args.projectRootDir,
    changeFileDirectoryRoot
  )
  const dateTimeStr = getFormattedChangeFileDateTimeStamp()
  const branchNameFormatted = getFormattedChangeFileBranchName(
    args.currentBranchName
  )
  const changeFileFileNameWithExtension = `${branchNameFormatted}${fileNameDelimiter}${dateTimeStr}.json`
  await writeJson({
    path: changeFileFullRootDir,
    fileName: changeFileFileNameWithExtension,
    data: args.file
  })
}

export async function readChangeFile(path: string): Promise<ChangeFile> {
  const rawChangeFile = await readJson(path)
  if (isChangeFile(rawChangeFile)) {
    return rawChangeFile
  }
  throw new Error(`Invalid change file found: ${path}.`)
}

export function isLocalChangeFile(changedFilePath: string) {
  return changedFilePath.startsWith(changeFileDirectoryRoot)
}

function getFormattedChangeFileDateTimeStamp(): string {
  const nowUtc = new Date()
  return `${nowUtc.getFullYear()}-${nowUtc.getMonth()}-${nowUtc.getDate()}-${nowUtc.getHours()}-${nowUtc.getMinutes()}`
}

function getFormattedChangeFileBranchName(branchName: string): string {
  const dashChar = "-"
  const notAlphaNumOrDashChar = new RegExp("[^a-zA-Z0-9-]")
  return branchName.split(notAlphaNumOrDashChar).join(dashChar)
}

async function getChangeFiles(args: {
  // Use this to build the change file directory path
  pathToProjectRootDirectory: string
  // use this to check for change files associated with the current branch
  currentBranchName: string
}): Promise<ChangeFile[]> {
  // TODO: finish implementing
  /*
    what if you are on branch A, you generate change files, merge A into your main branch, then push
    more changes to A and run the cli?

    should you see the change files for the changes you already made? or, should the changes on your
    main branch be excluded (i.e. if the main branch has those change files already in it, then don't
    show skips)?

    https://git-scm.com/docs/git-diff

    `git diff origin/main --compact-summary` can be used to list the files with their relative paths.
    if there are no change files in that list, then we should prompt to generate some. if there are
    one or more change files in that list then prompt with skip.
  */
  return []
}
