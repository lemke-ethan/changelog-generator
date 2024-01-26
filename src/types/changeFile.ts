/** The different types of changes. */
export const changeTypeEnum = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
  /** Not rendered in the change log md */
  NONE: "NONE",
  /** Not rendered in the change log md */
  DEPENDENCY: "DEPENDENCY",
} as const
export type ChangeType = typeof changeTypeEnum[keyof typeof changeTypeEnum];

/** Represents a change that can be recorded in a {@link ChangeFile}. */
export type Change = {
  packageName: string
  comment: string
  type: ChangeType
};

/** Represents a change file. */
export type ChangeFile = {
  changes: Change[]
};
