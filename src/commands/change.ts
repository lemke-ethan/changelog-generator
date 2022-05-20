/**
 * Checks for changes from "HEAD" to remote "main" branch. If changes exist then the user will be 
 * prompted with a series of questions about what kind of change is being made to generate a change 
 * file in the format of <branch name>-<timestamp>.json. If no changes are detected then nothing 
 * happens.
 * 
 * If a change file already exists then the user will be shown the existing change comments from
 * each change file and they will be prompted to append to the existing comments or do nothing. 
 * Appending to the existing comments will 
 * 
 * The change files will be generated in a `./changes` directory. This directory and its contents 
 * needs to be tracked.
 */
export function change(args?: {
  /** Verify the change file has been generated and is valid. */
  verify?: boolean;
  /** Show this commands documentation and exit. */
  help?: boolean;
}) {
  /* 
    TODO:
      1. get the current branch name: `git branch --show-current`
      1. get the remote name using the current branch name: `git config branch.<branch name>.remote`
      1. get the "main" origin branch by parsing out "HEAD branch:" from `git remote show <remote name>`
      1. check for a diff from HEAD against "main" origin branch `git diff HEAD..<remote name>/<main branch name> --shortstat`
      1. if a diff does not exist then exit
      1. otherwise,
       1. show the user what branch they are on
       1. show the user what the target branch is (i.e. "main" branch name with remote name)
       1. check for existing change files for the project 
       1. if there are no existing change files then prompt the user
       1. otherwise, s
        1. show the user the existing comments from the existing change files
        1. prompt the user do nothing or append comments

      prompting the user to generate a change file or append comments looks like this

      1. prompt the user for a change description
      1. prompt the user for a change type (use the types and descriptions from types module)
      1. generate a new change file with file name <branch name>-<timestamp>.json in ./changes/
  */

  throw new Error("TODO");
}
