import { writable, Writable } from 'svelte/store';
import type { RollResult, CustomRoll } from './types/Roll';

export const rollResults: Writable<RollResult[]> = writable([]);

export const customRolls: Writable<CustomRoll[]> = writable([]);
