import type {
	Entry,
	EntryHeader,
	EntryProperties,
	EntryProperty,
	Journal,
	ParseError
} from './parser.types';

export const isParseError = (
	maybeError: Entry | EntryHeader | EntryProperty | EntryProperties | Journal | ParseError
): maybeError is ParseError => (maybeError as ParseError).parseType === 'parseError';

export const isEntry = (maybeEntry: Entry | ParseError): maybeEntry is Entry =>
	(maybeEntry as Entry).parseType === 'entry';

export const isJournal = (maybeJournal: Journal | ParseError): maybeJournal is Journal =>
	(maybeJournal as Journal).parseType === 'journal';

export const parseFileContents = (fileContents: string): Journal | ParseError => {
	let entries = fileContents
		.replace(/(\r?\n)+/, '\r\n')
		.split(/(\r?\n)+(?![\t\r\n])/)
		.filter((s) => !s.match(/^\r?\n$/))
		.map(parseJournalEntry);
	if (entries.some(isParseError)) return entries.filter(isParseError)[0];
	else
		return {
			parseType: 'journal',
			entries: entries.filter(isEntry)
		};
};

export const parseJournalEntry = (contents: string): Entry | ParseError => {
	let vals = contents.split(/\r?\n\t/);
	let header = parseHeader(vals[0]);
	if (isParseError(header)) return header;
	let properties = parseProperties(vals.slice(1));
	if (isParseError(properties))
		return {
			...properties,
			date: header.date,
			activity: header.activity
		};
	return {
		...header,
		...properties,
		parseType: 'entry'
	};
};

export const parseHeader = (contents: string): EntryHeader | ParseError => {
	let vals = contents.split(/ /);
	let date = new Date(Date.parse(vals[0]));
	if (!date)
		return {
			parseType: 'parseError',
			error: 'invalid date format'
		};
	return {
		parseType: 'entryHeader',
		date: date,
		activity: vals[1]
	};
};

export const parseProperties = (contents: string[]): EntryProperties | ParseError => {
	if (!contents.every((s) => /^:|min|hour|hr/.test(s)))
		return {
			parseType: 'parseError',
			error: 'entry has a property which is neither arbitrary (:property) or time (min, hour)'
		};
	return {
		parseType: 'entryProperties',
		time: 0
	}; //TODO
};

// const parseProperty = (contents: string): EntryProperty | ParseError => {
// 	const splitContents = contents.split(/ /);
// 	if (/min|hour/.test(contents)) {
// 		let minutesIndex = splitContents
// 			.map((s) => /min/.test(s))
// 			.reduce((a, c, i) => (a == -1 && c ? i : -1), -1);
// 		let hoursIndex = splitContents
// 			.map((s) => /hour/.test(s))
// 			.reduce((a, c, i) => (a == -1 && c ? i : -1), -1);
// 		let minutes = Number(splitContents[minutesIndex]) + 60 * Number(splitContents[hoursIndex]);
// 		return {
// 			minutes: minutes
// 		};
// 	}
// 	return {
// 		label: contents
// 	};
// };
