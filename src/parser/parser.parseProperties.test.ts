import { parseProperties } from './parser';

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
