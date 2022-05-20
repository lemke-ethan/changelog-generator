import { ChangeType, ChangeTypeStringLiteral } from "../types/changeFile";

/** Readable descriptions of each {@link ChangeType}. */
export const ChangeTypeDescription: {[Property in ChangeTypeStringLiteral]: string} = {
    [ChangeType.MAJOR]: "Indicates that these changes incompatible API changes.",
    [ChangeType.MINOR]: "Indicates that these changes add functionality in a backwards compatible manner.",
    [ChangeType.PATCH]: "Indicates that these changes fix bugs in a backwards compatible manner.",
    [ChangeType.NONE]: "Indicates that these changes make changes to the source code that do not effect the user (e.g. change eslint rules, change a readme file, ...).",
}

/** Readable names of each {@link ChangeType}. */
export const ChangeTypeString: {[Property in ChangeTypeStringLiteral]: string} = {
    [ChangeType.MAJOR]: "Major",
    [ChangeType.MINOR]: "Minor",
    [ChangeType.PATCH]: "Patch",
    [ChangeType.NONE]: "None",
}