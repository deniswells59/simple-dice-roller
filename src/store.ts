import { writable, Writable } from 'svelte/store';
import type { RollResult, Roll } from './types/Roll';

export const rollResults: Writable<RollResult[]> = writable([]);

export const customRolls: Writable<Roll[]> = writable([]);
