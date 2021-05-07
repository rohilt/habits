import type {
	Entry,
	EntryHeader,
	EntryProperties,
	EntryProperty,
	Journal,
	ParseError
} from './parser.types';

import { isEntry, isJournal, isParseError } from './parser.types';

export const parseJournal = (fileContents: string): Journal | ParseError => {
	let entries = fileContents
		.replace(/(\r?\n)+/, '\r\n')
		.split(/(\r?\n)+(?![\t\r\n])/)
		.filter((s) => !s.match(/^\r?\n$/))
		.map(parseEntry);
	if (entries.some(isParseError)) return entries.filter(isParseError)[0];
	else
		return {
			parseType: 'journal',
			entries: entries.filter(isEntry)
		};
};

export const parseEntry = (contents: string): Entry | ParseError => {
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
		parseType: 'entry',
		line: 0
	};
};

export const parseHeader = (contents: string): EntryHeader | ParseError => {
	let vals = contents.split(/ /);
	if (vals.length < 2)
		return {
			parseType: 'parseError',
			error: 'missing activity'
		};
	let dateGroup = vals[0].match(/(\d{4})-(\d{2})-(\d{2})/);
	if (!dateGroup)
		return {
			parseType: 'parseError',
			error: 'invalid date'
		};
	let date = new Date(Number(dateGroup[1]), Number(dateGroup[2]) - 1, Number(dateGroup[3]));
	return {
		parseType: 'entryHeader',
		date: date,
		activity: vals.slice(1).join(' ')
	};
};

export const parseProperties = (contents: string[]): EntryProperties | ParseError => {
	if (!contents.every((s) => /^:|min|hour|hr/.test(s)))
		return {
			parseType: 'parseError',
			error: 'entry property is neither arbitrary (:property) or time (min, hour)'
		};
	if (!contents.some((s) => /min|hour|hr/.test(s)))
		return {
			parseType: 'parseError',
			error: 'missing time property'
		};
	let properties = contents.map(parseProperty);
	return {
		parseType: 'entryProperties',
		time: 0
	}; //TODO
};

export const parseProperty = (contents: string): EntryProperty | ParseError => {
	let arbitraryGroup = contents.match(/^:([A-Za-z]+) ([-0-9.]+|[ \w]+)$/);
	let arbitraryGroupBool = contents.match(/^:(!?)([A-Za-z]+)$/);
	if (arbitraryGroup) {
		let value = Number(arbitraryGroup[2]) ? Number(arbitraryGroup[2]) : arbitraryGroup[2];
		return {
			parseType: 'arbitraryEntryProperty',
			label: arbitraryGroup[1],
			value: value
		};
	}
	if (arbitraryGroupBool)
		return {
			parseType: 'arbitraryEntryProperty',
			label: arbitraryGroupBool[2],
			value: !arbitraryGroupBool[1]
		};
	return {
		parseType: 'timeEntryProperty',
		time: 1
	};
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
};
