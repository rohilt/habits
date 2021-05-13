import { writable } from 'svelte/store';
import type { Journal, ParseError } from '../parser/parser.types';
import type { Writable } from 'svelte/types/runtime/store';

export const journal: Writable<{
	fileName: string;
	journal: Journal;
	parseError: ParseError;
}> = writable({ fileName: null, journal: null, parseError: null });
export const uploadPage: Writable<boolean> = writable(true);
