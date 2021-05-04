import { parseFileContents } from '../parser/parser';

const add = (x: number, y: number): number => x + y;

test('should work', () => {
	expect(add(2, 2)).toEqual(4);
});
