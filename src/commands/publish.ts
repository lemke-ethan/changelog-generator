// Copyright 2024 MFB Technologies, Inc.

import {
  getAllLocalChangeFilePaths,
  readChangeFile
} from "../services/changeFile.js"
import {
  createChangelogJsonFile,
  getChangelogJsonFile
} from "../services/changeLogFile.js"
import { getCurrentProjectName } from "../services/npm.js"
import { changeTypeEnum } from "../types/changeFile.js"
import { isChangeLogError } from "../utils/changeLogError.js"

// TODO: incorporate npm publish command
// TODO: assume that package versions use numeric versions only

/**
 * Combines all of the existing changes files into the change log and consolidates the version bumps
 * in the change files down to a single version, which is used to update the package.json version.
 *
 * If `CHANGELOG.md` and `CHANGELOG.json` files do not exist at the root of your project then they
 * will be created. These files need to be tracked in version control.
 *
 * By default this command will perform a readonly operation. If you want to update the change log
 * files and the project's version (i.e. package.json), then specify `apply`.
 */
export async function publish(args?: {
  /**
   * By default this command will perform a readonly operation. If you want to update the change log
   * files and the project's version (i.e. package.json), then specify this argument.
   */
  apply?: boolean
}): Promise<void> {
  /*
    TODO:
      1. get the current CHANGELOG.json, if one is not found then init it
      1. init the new version number to the current package's version number
      1. for each change file
       1. load the change file into memory 
       1. add an entry for it to the CHANGELOG.json instance in memory
       1. using the existing version number, calculate a new version number using semver protocol 
       and the change type from the change file
       1. if the version number from the previous step is "smaller" than the new version number then
       continue
       1. otherwise, update the new version number and continue 
      1. write the CHANGELOG.json to disk
      1. (abstract this out) parse the CHANGELOG.json into https://www.npmjs.com/package/json2md form
      1. overwrite/create the CHANGELOG.md with parsed json data
      1. if `args.apply` then attempt to update the package.json version number, log an error if we fail
  */
  // assume script is run from the root of the project
  const projectRootDirectory = process.cwd()
  const allLocalChangeFilePaths = await getAllLocalChangeFilePaths({
    projectRootDir: projectRootDirectory
  })
  if (allLocalChangeFilePaths.length < 1) {
    console.log("No change files were found. Nothing to do.")
    return
  }
  const currentChangelogJson = await getChangelogJsonFile({
    projectRootDirectory
  })
  if (isChangeLogError(currentChangelogJson)) {
    const projectName = await getCurrentProjectName(projectRootDirectory)
    const newChangeLogJsonFile = await createChangelogJsonFile({
      projectName,
      projectRootDirectory
    })
    if (isChangeLogError(newChangeLogJsonFile)) {
      throw newChangeLogJsonFile
    }
  }
  let bumpMajor = false
  let bumpMinor = false
  let bumpPatch = false
  for (let index = 0; index < allLocalChangeFilePaths.length; index++) {
    const localChangeFilePath = allLocalChangeFilePaths[index]
    if (localChangeFilePath === undefined) continue
    const changeFile = await readChangeFile(localChangeFilePath)
    for (let index = 0; index < changeFile.changes.length; index++) {
      const change = changeFile.changes[index]
      if (change === undefined) continue
      switch (change.type) {
        case changeTypeEnum.DEPENDENCY:
        case changeTypeEnum.NONE:
          continue
        case changeTypeEnum.PATCH:
          if (!bumpMajor && !bumpMinor) {
            bumpPatch = true
          }
          break
        case changeTypeEnum.MINOR:
          if (!bumpMajor) {
            bumpMinor = true
            bumpPatch = false
          }
          break
        case changeTypeEnum.MAJOR:
          if (!bumpMajor) {
            bumpMajor = true
            bumpMinor = false
            bumpPatch = false
          }
          break
      }
    }
  }

  console.log(currentChangelogJson, { bumpMajor, bumpMinor, bumpPatch })
}
