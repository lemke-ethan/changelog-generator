import { ChangeType } from "./changeFile"

/** Represents a collection of comments in a change log entry. */
export type ChangeLogEntryComments = {
  [Property in ChangeType]?: { comment: string }[];
};

/** Represents an entry in the change log. */
export type ChangeLogEntry = {
  version: string;
  date: string;
  comments: ChangeLogEntryComments;
};

/** Represents a change log. */
export type ChangeLog = {
  name: string;
  entries: ChangeLogEntry[];
};
