// Copyright 2024 MFB Technologies, Inc.

/** The different types of changes. */
export const changeTypeEnum = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
  /** Not rendered in the change log md */
  NONE: "NONE",
  /** Not rendered in the change log md */
  DEPENDENCY: "DEPENDENCY"
} as const
export type ChangeType = (typeof changeTypeEnum)[keyof typeof changeTypeEnum]

/** Represents a change that can be recorded in a {@link ChangeFile}. */
export type Change = {
  packageName: string
  comment: string
  type: ChangeType
}

/** Represents a change file. */
export type ChangeFile = {
  /** Collection of changes recorded in this change file. Typically it is only one change. */
  changes: Change[]
}

/** Get the short description of most change types. Defaults to an empty string. */
export function getChangeTypeDescription(changeType: ChangeType): string {
  switch (changeType) {
    case changeTypeEnum.MAJOR: {
      return "changes that break compatibility"
    }
    case changeTypeEnum.MINOR: {
      return "changes that add functionality in a backward compatible manner"
    }
    case changeTypeEnum.PATCH: {
      return "changes that fix things in a backward compatible manner"
    }
    case changeTypeEnum.NONE: {
      return "changes that do not require a release (e.g. updated the README.md, ...)"
    }
    default:
      return ""
  }
}
