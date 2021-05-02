import type { Entry, EntryHeader, EntryProperty, Journal } from './parser.types';

export const parseFileContents = (fileContents: string): Journal =>
	fileContents.split(/\r?\n\r?\n/).map(parseJournalEntry);

const parseJournalEntry = (contents: string): Entry => {
	let vals = contents.split(/\r?\n/);
	return {
		...parseDateActivity(vals[0]),
		properties: vals.slice(1).map(parseProperties)
	};
};

const parseDateActivity = (contents: string): EntryHeader => {
	let vals = contents.split(/ /);
	return {
		date: new Date(Date.parse(vals[0])),
		activity: vals[1]
	};
};

// TODO
const parseProperties = (contents: string): EntryProperty => {
	return {
		label: contents
	};
};
