import { parseProperty } from './parser';

it('simple time', () => {
	expect(parseProperty('20 minutes, 2 hours')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 140
	});
});

it('simple time (no comma)', () => {
	expect(parseProperty('4 hours 35 minutes')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 275
	});
});

it('simple time (minutes)', () => {
	expect(parseProperty('45 mins')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 45
	});
});

it('simple time (hours)', () => {
	expect(parseProperty('10 hrs')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 600
	});
});

it('missing time value', () => {
	expect(parseProperty('minutes')).toEqual({
		parseType: 'parseError',
		error: 'missing time value'
	});
});

it('missing time value again', () => {
	expect(parseProperty('mins hrs')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: mins'
	});
});

it('invalid number', () => {
	expect(parseProperty('5, mins')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: 5,'
	});
});

it('sum of time values', () => {
	expect(parseProperty('5 mins 10 minutes')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 15
	});
});

it('complex sum of time values', () => {
	expect(parseProperty('1 hour 25 mins 4 hrs 3 mins')).toEqual({
		parseType: 'entryProperty',
		label: 'minutes',
		value: 328
	});
});

it('negative time value', () => {
	expect(parseProperty('-2 minutes')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: -2'
	});
});

it('invalid value', () => {
	expect(parseProperty('minutes 10')).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: minutes'
	});
});

it('invalid unit', () => {
	expect(parseProperty('10 10 mins hrs')).toEqual({
		parseType: 'parseError',
		error: 'invalid time unit: 10'
	});
});

it('invalid unit', () => {
	expect(parseProperty('10 minhrs')).toEqual({
		parseType: 'parseError',
		error: 'invalid time unit: minhrs'
	});
});

it('simple number', () => {
	expect(parseProperty(':prop 5')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: 5
	});
});

it('simple number (decimal)', () => {
	expect(parseProperty(':prop 8.4')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: 8.4
	});
});

it('simple number (negative)', () => {
	expect(parseProperty(':prop -10.5')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: -10.5
	});
});

it('simple true boolean', () => {
	expect(parseProperty(':prop')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: true
	});
});

it('simple true boolean (with space)', () => {
	expect(parseProperty(':prop ')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('simple false boolean', () => {
	expect(parseProperty(':!prop')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: false
	});
});

it('simple false boolean (with space)', () => {
	expect(parseProperty(':!prop ')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('boolean and string', () => {
	expect(parseProperty(':!prop asdf')).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('invalid property name', () => {
	expect(parseProperty(':inval1d')).toEqual({
		parseType: 'parseError',
		error: 'invalid property name: inval1d'
	});
});

it('simple string', () => {
	expect(parseProperty(':prop asdf')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: 'asdf'
	});
});

it('simple string (with number)', () => {
	expect(parseProperty(':prop 5 asdf')).toEqual({
		parseType: 'entryProperty',
		label: 'prop',
		value: '5 asdf'
	});
});
