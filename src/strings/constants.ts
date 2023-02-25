import { ChangeType, ChangeTypeStringLiteral } from "../types/changeFile";

/** Readable descriptions of each {@link ChangeType}. */
export const ChangeTypeDescription: {
  [Property in ChangeTypeStringLiteral]: string;
} = {
  [ChangeType.MAJOR]:
    "Indicates that these changes are incompatible API changes.",
  [ChangeType.MINOR]:
    "Indicates that these changes add functionality in a backwards compatible manner.",
  [ChangeType.PATCH]:
    "Indicates that these changes fix bugs in a backwards compatible manner.",
  [ChangeType.NONE]:
    "Indicates that these changes make changes to the source code that do not effect the user (e.g. change eslint rules, change a readme file, ...).",
  /*
    auto generated and added to the change log json.

    e.g. "Updating dependency \"align-matters\" to `2.0.1`"

    this probably does not make sense to add because there isn't an api command for updating package versions (e.g., `rush upgrade`)
    */
  [ChangeType.DEPENDENCY]: "Information about package dependency changes.",
};

/** Readable names of each {@link ChangeType}. */
export const ChangeTypeString: {
  [Property in ChangeTypeStringLiteral]: string;
} = {
  [ChangeType.MAJOR]: "Major",
  [ChangeType.MINOR]: "Minor",
  [ChangeType.PATCH]: "Patch",
  [ChangeType.NONE]: "None",
  [ChangeType.DEPENDENCY]: "Dependency",
};

/** Readable name of the change command. */
export const ChangeCommandName = "change";

/** Readable description of the change command. */
export const ChangeCommandDescription =
  "Generates a change file if a change is detected.";

/** Readable flags of each option in the change command. */
export const ChangeCommandOptionFlag = {
  verify: "--verify",
};

/** Readable descriptions of each option in the change command. */
export const ChangeCommandOptionDescription: {
  [Property in keyof typeof ChangeCommandOptionFlag]: string;
} = {
  verify: "Verify the change file has been generated and is valid.",
};
