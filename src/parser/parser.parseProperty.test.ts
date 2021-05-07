import { parseProperty } from './parser';

it('parseProperty: simple time', () => {
	expect(parseProperty('20 minutes, 2 hours')).toEqual({
		parseType: 'timeEntryProperty',
		time: 140
	});
});

it('parseProperty: simple time (no comma)', () => {
	expect(parseProperty('4 hours 35 minutes')).toEqual({
		parseType: 'timeEntryProperty',
		time: 275
	});
});

it('parseProperty: simple time (minutes)', () => {
	expect(parseProperty('45 mins')).toEqual({
		parseType: 'timeEntryProperty',
		time: 45
	});
});

it('parseProperty: simple time (hours)', () => {
	expect(parseProperty('10 hrs')).toEqual({
		parseType: 'timeEntryProperty',
		time: 600
	});
});

it('parseProperty: missing time value', () => {
	expect(parseProperty('minutes')).toEqual({
		parseType: 'parseError',
		error: 'missing time value'
	});
});

it('parseProperty: missing time value again', () => {
	expect(parseProperty('mins hrs')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: mins'
	});
});

it('parseProperty: invalid number', () => {
	expect(parseProperty('5, mins')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: 5,'
	});
});

it('parseProperty: sum of time values', () => {
	expect(parseProperty('5 mins 10 minutes')).toEqual({
		parseType: 'timeEntryProperty',
		time: 15
	});
});

it('parseProperty: complex sum of time values', () => {
	expect(parseProperty('1 hour 25 mins 4 hrs 3 mins')).toEqual({
		parseType: 'timeEntryProperty',
		time: 328
	});
});

it('parseProperty: negative time value', () => {
	expect(parseProperty('-2 minutes')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: -2'
	});
});

it('parseProperty: simple number', () => {
	expect(parseProperty(':prop 5')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: 5
	});
});

it('parseProperty: simple number (decimal)', () => {
	expect(parseProperty(':prop 8.4')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: 8.4
	});
});

it('parseProperty: simple number (negative)', () => {
	expect(parseProperty(':prop -10.5')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: -10.5
	});
});

it('parseProperty: simple true boolean', () => {
	expect(parseProperty(':prop')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: true
	});
});

it('parseProperty: simple true boolean (with space)', () => {
	expect(parseProperty(':prop ')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('parseProperty: simple false boolean', () => {
	expect(parseProperty(':!prop')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: false
	});
});

it('parseProperty: simple false boolean (with space)', () => {
	expect(parseProperty(':!prop ')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('parseProperty: boolean and string', () => {
	expect(parseProperty(':!prop asdf')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('parseProperty: invalid property name', () => {
	expect(parseProperty(':inval1d')).toEqual({
		parseType: 'parseError',
		error: 'invalid property name: inval1d'
	});
});

it('parseProperty: simple string', () => {
	expect(parseProperty(':prop asdf')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: 'asdf'
	});
});

it('parseProperty: simple string (with number)', () => {
	expect(parseProperty(':prop 5 asdf')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: '5 asdf'
	});
});
