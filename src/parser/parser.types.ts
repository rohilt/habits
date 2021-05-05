export interface EntryHeader {
	parseType: 'entryHeader';
	date: Date;
	activity: string;
}

export interface EntryProperties {
	parseType: 'entryProperties';
	time: number;
}

export type EntryProperty = ArbitraryEntryProperty | TimeEntryProperty;

export interface ArbitraryEntryProperty {
	parseType: 'arbitraryEntryProperty';
	label: string;
	value: number | string | boolean;
}

export interface TimeEntryProperty {
	parseType: 'timeEntryProperty';
	time: number;
}

export interface Entry {
	parseType: 'entry';
	date: Date;
	activity: string;
	minutes?: number;
	line: number;
}

export interface Journal {
	parseType: 'journal';
	entries: Entry[];
}

export interface ParseError {
	parseType: 'parseError';
	error: string;
	date?: Date;
	activity?: string;
	line?: number;
}

export const isParseError = (
	maybeError: Entry | EntryHeader | EntryProperty | EntryProperties | Journal | ParseError
): maybeError is ParseError => (maybeError as ParseError).parseType === 'parseError';

export const isEntry = (maybeEntry: Entry | ParseError): maybeEntry is Entry =>
	(maybeEntry as Entry).parseType === 'entry';

export const isJournal = (maybeJournal: Journal | ParseError): maybeJournal is Journal =>
	(maybeJournal as Journal).parseType === 'journal';
