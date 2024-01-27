// Copyright 2024 MFB Technologies, Inc.

import { spawn } from "child_process"

/**
 * Checks for changes from "HEAD" to remote "main" branch. If changes exist and a change file
 * doesn't exist then the user will be prompted with a series of questions about what kind of change
 * is being made to generate a change file in the format of <branch name>-<timestamp>.json. If no
 * changes are detected then nothing happens.
 *
 * If a change file already exists then the user will be shown the existing change comments from
 * each change file and they will be prompted to append to the existing comments or do nothing.
 * Appending to the existing comments will prompt the user with a series of questions and generate a
 * new (additional) change file in the respective format.
 *
 * The change files will be generated in a `./changes` directory. This directory and its contents
 * needs to be tracked.
 */
export async function change(args?: {
  /** Verify the change file has been generated and is valid. */
  verify?: boolean
}): Promise<void> {
  /* 
    TODO:
      1. get the current branch name: `git branch --show-current`
      1. get the remote name using the current branch name: `git config branch.<branch name>.remote`
      1. get the "main" origin branch by parsing out "HEAD branch:" from `git remote show <remote name>`
      1. check for a diff from HEAD against "main" origin branch `git diff HEAD..<remote name>/<main branch name> --shortstat`
      1. if a diff does not exist then exit 
      1. otherwise,
       1. if `verify` is true, then throw an error
       1. show the user what branch they are on
       1. show the user what the target branch is (i.e. "main" branch name with remote name)
       1. check for existing change files for the project 
       1. if there are no existing change files then prompt the user
       1. otherwise, 
        1. show the user the existing comments from the existing change files
        1. prompt the user do nothing or append comments
        1. if the user wants to append comments, then prompt the user to generate a new change file

      prompting the user to generate a change file or append comments looks like this

      1. prompt the user for a change description
      1. prompt the user for a change type (use the types and descriptions from types module)
      1. generate a new change file with file name <branch name>-<timestamp>.json in ./changes/
  */

  const currentBranchName = await getCurrentGitBranchName()
  const remoteName = await getRemoteName(currentBranchName)
  const headBranchName = await getHeadBranchName(remoteName)
  // TODO: finish implementation
  console.log({ currentBranchName, remoteName, headBranchName })
}

async function getCurrentGitBranchName(): Promise<string> {
  return runCommand({ command: "git", args: ["branch", "--show-current"] })
}

async function getRemoteName(currentBranchName: string): Promise<string> {
  return runCommand({
    command: "git",
    args: ["config", `branch.${currentBranchName}.remote`]
  })
}

async function showRemoteOrigin(remoteName: string): Promise<string> {
  return runCommand({
    command: "git",
    args: ["remote", "show", remoteName]
  })
}

async function getHeadBranchName(remoteName: string): Promise<string> {
  const remoteOrigin = await showRemoteOrigin(remoteName)
  const headBranchKey = "HEAD branch: "
  const newLineChar = "\n"
  const headBranchName = remoteOrigin
    .split(newLineChar)
    .find(line => line.includes(headBranchKey))
  if (headBranchName === undefined) {
    throw new Error("unable to find the head branch name.")
  }
  return headBranchName.trim().replace(headBranchKey, "")
}

/** Runs a command and returns its output. */
async function runCommand(args: {
  command: string
  args?: readonly string[]
}): Promise<string> {
  const command = spawn(args.command, args.args)
  return new Promise((resolve, reject) => {
    let result = ""
    command.on("error", err => {
      reject("command failed: failed to start the subprocess: " + err.message)
    })
    command.on("close", code => {
      if (code !== 0) {
        reject("command failed with exit code " + code)
      } else {
        resolve(result)
      }
    })
    command.stdout.on("data", (data: unknown) => {
      if (!hasToStringMethod(data)) {
        reject("unknown response data: " + JSON.stringify(data))
        command.kill(1)
        return
      }
      result += data.toString().trim()
    })
    command.stderr.on("data", data => {
      reject(`command failed: ${data}`)
      command.kill(1)
    })
  })
}

// TODO: move to utils module
function hasToStringMethod(obj: unknown): obj is { toString: () => string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "toString" in obj &&
    typeof obj.toString === "function"
  )
}
