import { parseHeader, parseProperties, parseProperty } from '../parser/parser';

it('parseHeader: simple', () => {
	expect(parseHeader('2020-01-01 ACTIVITY')).toEqual({
		parseType: 'entryHeader',
		date: new Date(2020, 0, 1),
		activity: 'ACTIVITY'
	});
});

it('parseHeader: bad date', () => {
	expect(parseHeader('NOT A VALID DATE')).toEqual({
		parseType: 'parseError',
		error: 'invalid date'
	});
});

it('parseHeader: missing activity', () => {
	expect(parseHeader('2020-01-01')).toEqual({
		parseType: 'parseError',
		error: 'missing activity'
	});
});

it('parseProperties: simple', () => {
	expect(parseProperties(['30 minutes', ':distance 1', ':location xyz'])).toEqual({
		parseType: 'entryProperties',
		time: 30,
		distance: 1,
		location: 'xyz'
	});
});

it('parseProperties: missing time', () => {
	expect(parseProperties([':distance 1', ':location xyz'])).toEqual({
		parseType: 'parseError',
		error: 'missing time property'
	});
});

it('parseProperties: invalid property', () => {
	expect(parseProperties([':distance 1', 'this is not valid', ':location xyz'])).toEqual({
		parseType: 'parseError',
		error: 'entry has a property which is neither arbitrary (:property) or time (min, hour)'
	});
});

it('parseProperties: duplicate property', () => {
	expect(parseProperties([':distance 1', ':distance 2'])).toEqual({
		parseType: 'parseError',
		error: 'entry has a duplicate property: distance'
	});
});

it('parseProperties: duplicate property (even if same)', () => {
	expect(parseProperties([':distance 1', ':distance 1'])).toEqual({
		parseType: 'parseError',
		error: 'entry has a duplicate property: distance'
	});
});

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
		error: 'missing time value'
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

it('parseProperty: simple boolean', () => {
	expect(parseProperty(':prop')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: true
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
		value: '5 asdf'
	});
});

it('parseProperty: simple string (with number)', () => {
	expect(parseProperty(':prop 5 asdf')).toEqual({
		parseType: 'arbitraryEntryProperty',
		label: 'prop',
		value: '5 asdf'
	});
});
