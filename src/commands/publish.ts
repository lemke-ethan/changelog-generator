// TODO: incorporate npm publish command

/**
 * Combines all of the existing changes files into the change log and compresses the version bumps
 * in the change files down to a single version, which is used to update the package.json version.
 * 
 * If `CHANGELOG.md` and `CHANGELOG.json` files do not exist at the root of your project then they 
 * will be created.
 */
export function publish(args?: {
  /** Show this commands documentation and exits. */
  help?: boolean;
  /** Attempts to update the projects package.json version, respectively. */
  apply?: boolean;
}) {
  /*
    TODO:
      1. check for changes files in the current project
      1. if no change files exist, then exit
      1. get the current package version number from the package.json, if one is not found use 
      version number 0.0.0
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
  throw new Error("TODO");
}
