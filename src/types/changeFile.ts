// TODO: don't use enums! string literals and types
/** The different types of changes. */
export enum ChangeType {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  /** Not rendered in the change log md */
  NONE = "NONE",
  /** Not rendered in the change log md */
  DEPENDENCY = "DEPENDENCY",
}
export type ChangeTypeStringLiteral = `${ChangeType}`;

/** Represents a change that can be recorded in a {@link ChangeFile}. */
export type Change = {
  packageName: string;
  comment: string;
  type: ChangeType;
};

/** Represents a change file. */
export type ChangeFile = {
  changes: Change[];
};
