import { parseProperties } from './parser';

it('simple', () => {
	expect(parseProperties(['30 minutes', ':distance 1', ':location xyz'])).toEqual({
		parseType: 'entryProperties',
		minutes: 30,
		distance: 1,
		location: 'xyz'
	});
});

it('complex', () => {
	expect(
		parseProperties(['45 minutes 3 hour', '75 min', ':distance 1', ':location xyz', ':!bool'])
	).toEqual({
		parseType: 'entryProperties',
		minutes: 300,
		distance: 1,
		location: 'xyz',
		bool: false
	});
});

it('complex', () => {
	expect(
		parseProperties(['45 minutes 1 hour', '15 min', ':distance 1', ':distance 0.7', ':bool'])
	).toEqual({
		parseType: 'entryProperties',
		minutes: 120,
		distance: 1.7,
		bool: true
	});
});

it('missing time', () => {
	expect(parseProperties([':distance 1', ':location xyz'])).toEqual({
		parseType: 'parseError',
		error: 'missing time property'
	});
});

it('invalid property', () => {
	expect(parseProperties([':distance 1', 'this is not valid', ':location xyz', '15 mins'])).toEqual(
		{
			parseType: 'parseError',
			error: 'invalid entry property: this is not valid'
		}
	);
});

it('propogates parseProperty parse error (invalid property)', () => {
	expect(parseProperties([':distance 1', ':inval1d', ':location xyz', '30 minute'])).toEqual({
		parseType: 'parseError',
		error: 'invalid property name: inval1d'
	});
});

it('duplicate property', () => {
	expect(parseProperties(['10 min, :distance 1', ':distance 2'])).toEqual({
		parseType: 'entryProperties',
		minutes: 10,
		distance: 3
	});
});

it('duplicate property (even if same)', () => {
	expect(parseProperties(['1 hr 15 mins, 10 minutes, :distance 1', ':distance 1'])).toEqual({
		parseType: 'entryProperties',
		minutes: 85,
		distance: 2
	});
});

it('duplicate string property', () => {
	expect(parseProperties([':location abc', ':location xyz', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'duplicate string property: location'
	});
});

it('duplicate boolean property', () => {
	expect(parseProperties([':bool', ':!bool', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'duplicate boolean property: bool'
	});
});

it('inconsistent property type', () => {
	expect(parseProperties([':bad 15', ':!bad', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'property has inconsistent type: bad'
	});
});

it('inconsistent property type', () => {
	expect(parseProperties([':bad this shouldnt work', ':bad', '15 mins'])).toEqual({
		parseType: 'parseError',
		error: 'property has inconsistent type: bad'
	});
});

it('propogate parseProperty parse error (arbitrary boolean/string)', () => {
	expect(parseProperties(['5 mins', ':!prop asdf'])).toEqual({
		parseType: 'parseError',
		error: 'property cannot be boolean and number/string'
	});
});

it('propogate parseProperty parse error (bad time value)', () => {
	expect(parseProperties(['mins hrs'])).toEqual({
		parseType: 'parseError',
		error: 'invalid time value: mins'
	});
});
