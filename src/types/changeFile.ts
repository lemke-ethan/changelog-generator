export enum ChangeType {
    MAJOR = "MAJOR",
    MINOR = "MINOR",
    PATCH = "PATCH",
    NONE = "NONE"
}

export type ChangeTypeStringLiteral = `${ChangeType}`

export const ChangeTypeDescription: {[Property in ChangeTypeStringLiteral]: string} = {
    [ChangeType.MAJOR]: "indicates that these changes incompatible API changes.",
    [ChangeType.MINOR]: "indicates that these changes add functionality in a backwards compatible manner.",
    [ChangeType.PATCH]: "indicates that these changes fix bugs in a backwards compatible manner.",
    [ChangeType.NONE]: "indicates that these changes make changes to the source code that do not effect the user (e.g. change eslint rules, change a readme file, ...).",
}

export type Change = {
    packageName: string
    comment: string
    type: ChangeType
}

export type ChangeFile = {
    changes: Change[]
}