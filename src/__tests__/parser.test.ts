import { parseHeader, parseProperties } from '../parser/parser';

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
