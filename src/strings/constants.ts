import { ChangeType, changeTypeEnum } from "../types/changeFile";

/** Readable descriptions of each {@link changeTypeEnum}. */
export const ChangeTypeDescription: {
  [Property in ChangeType]: string;
} = {
  [changeTypeEnum.MAJOR]:
    "Indicates that these changes are incompatible API changes.",
  [changeTypeEnum.MINOR]:
    "Indicates that these changes add functionality in a backwards compatible manner.",
  [changeTypeEnum.PATCH]:
    "Indicates that these changes fix bugs in a backwards compatible manner.",
  [changeTypeEnum.NONE]:
    "Indicates that these changes make changes to the source code that do not effect the user (e.g. change eslint rules, change a readme file, ...).",
  /*
    auto generated and added to the change log json.

    e.g. "Updating dependency \"align-matters\" to `2.0.1`"

    this probably does not make sense to add because there isn't an api command for updating package versions (e.g., `rush upgrade`)
    */
  [changeTypeEnum.DEPENDENCY]: "Information about package dependency changes.",
};

/** Readable names of each {@link changeTypeEnum}. */
export const ChangeTypeString: {
  [Property in ChangeType]: string;
} = {
  [changeTypeEnum.MAJOR]: "Major",
  [changeTypeEnum.MINOR]: "Minor",
  [changeTypeEnum.PATCH]: "Patch",
  [changeTypeEnum.NONE]: "None",
  [changeTypeEnum.DEPENDENCY]: "Dependency",
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
