export interface EntryHeader {
	parseType: 'entryHeader';
	date: Date;
	activity: string;
}

export interface EntryProperties {
	parseType: 'entryProperties';
	time?: number;
}

export interface EntryProperty {
	parseType: 'entryProperty';
	entryType: 'arbitrary' | 'time';
	label?: string;
	value: number | string;
}

export interface Entry {
	parseType: 'entry';
	date: Date;
	activity: string;
	minutes?: number;
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
}
