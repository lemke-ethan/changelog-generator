// Copyright 2024 MFB Technologies, Inc.

import { ChangeType } from "./changeFile.js"

/** Represents a collection of comments in a change log entry. */
export type ChangeLogEntryComments = {
  [Property in ChangeType]?: { comment: string }[]
}

/** Represents an entry in the change log. */
export type ChangeLogEntry = {
  version: string
  date: string
  comments: ChangeLogEntryComments
}

/** Represents a change log. */
export type ChangeLog = {
  name: string
  entries: ChangeLogEntry[]
}
