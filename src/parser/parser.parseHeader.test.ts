import { parseHeader } from './parser';

it('simple', () => {
	expect(parseHeader('2020-01-01 ACTIVITY')).toEqual({
		parseType: 'entryHeader',
		date: new Date(2020, 0, 1),
		activity: 'ACTIVITY'
	});
});

it('bad date', () => {
	expect(parseHeader('NOT A VALID DATE')).toEqual({
		parseType: 'parseError',
		error: 'invalid date'
	});
});

it('missing activity', () => {
	expect(parseHeader('2020-01-01')).toEqual({
		parseType: 'parseError',
		error: 'missing activity'
	});
});
