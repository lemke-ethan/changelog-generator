import { ChangeType, ChangeTypeStringLiteral } from "./changeFile"

export type ChangeLogEntryComments = {
    [Property in ChangeTypeStringLiteral]?: {comment: string}[]
}

export type ChangeLogEntry = {
    version: string,
    date: string,
    comments: ChangeLogEntryComments
}

export type ChangeLog = {
    name: string
    entries: ChangeLogEntry[]
}