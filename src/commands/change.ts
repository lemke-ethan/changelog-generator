/**
 * Asks questions about what kind of change is being made to generate a change file in the format
 * of <branch name>-<timestamp>.json.
 */
export function change(args?: {
  /** Verify the change file has been generated and is valid. */
  verify?: boolean;
  /** Show this commands documentation and exit. */
  help?: boolean;
  /** The name of the branch to compare the checked out branch against. */
  targetBranch?: string;
}) {
  throw new Error("TODO");
}
