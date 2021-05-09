export interface EntryHeader {
	parseType: 'entryHeader';
	date: Date;
	activity: string;
}

export interface EntryProperties {
	parseType: 'entryProperties';
}

export interface EntryProperty<Type> {
	parseType: 'entryProperty';
	label: string;
	value: Type;
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
	maybeError: Entry | EntryHeader | EntryProperty<any> | EntryProperties | Journal | ParseError
): maybeError is ParseError => (maybeError as ParseError).parseType === 'parseError';

export const isEntry = (maybeEntry: Entry | ParseError): maybeEntry is Entry =>
	(maybeEntry as Entry).parseType === 'entry';

export const isJournal = (maybeJournal: Journal | ParseError): maybeJournal is Journal =>
	(maybeJournal as Journal).parseType === 'journal';

export const isEntryProperty = (
	maybeEntryProperty: EntryProperty<any> | ParseError
): maybeEntryProperty is EntryProperty<any> =>
	(maybeEntryProperty as EntryProperty<any>).parseType === 'entryProperty';

export const entryPropertyType = (entryProperty: EntryProperty<any>) => typeof entryProperty.value;
