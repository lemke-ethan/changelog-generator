/** The different types of changes. */
export enum ChangeType {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  NONE = "NONE",
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
