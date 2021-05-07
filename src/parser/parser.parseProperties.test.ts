import { parseProperties } from './parser';

it('parseProperties: simple', () => {
	expect(parseProperties(['30 minutes', ':distance 1', ':location xyz'])).toEqual({
		parseType: 'entryProperties',
		time: 30,
		distance: 1,
		location: 'xyz'
	});
});

it('parseProperties: complex', () => {
	expect(parseProperties(['45 minutes 3 hour', '75 min', ':distance 1', ':location xyz'])).toEqual({
		parseType: 'entryProperties',
		time: 300,
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
		error: 'invalid entry property: this is not valid'
	});
});

it('parseProperties: invalid property (calls parseProperty)', () => {
	expect(parseProperties([':distance 1', ':inval$d', ':location xyz'])).toEqual({
		parseType: 'parseError',
		error: 'invalid property name: inval$d'
	});
});

it('parseProperties: duplicate property', () => {
	expect(parseProperties(['10 min, :distance 1', ':distance 2'])).toEqual({
		parseType: 'entryProperties',
		time: 10,
		distance: 3
	});
});

it('parseProperties: duplicate property (even if same)', () => {
	expect(parseProperties(['1 hr 15 mins, 10 minutes, :distance 1', ':distance 1'])).toEqual({
		parseType: 'entryProperties',
		time: 85,
		distance: 2
	});
});

it('parseProperties: duplicate string property', () => {
	expect(parseProperties([':location abc', ':location xyz', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'duplicate string property: location'
	});
});

it('parseProperties: duplicate boolean property', () => {
	expect(parseProperties([':bool', ':!bool', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'duplicate boolean property: bool'
	});
});
