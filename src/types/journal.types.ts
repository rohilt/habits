export interface EntryProperty {
    label: string,
    // TODO
}

export interface EntryHeader {
    date: Date,
    activity: string,
}

export interface Entry {
    date: Date,
    activity: string,
    properties: EntryProperty[],
}

export type Journal = Entry[]