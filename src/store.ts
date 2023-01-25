import { writable, Writable } from 'svelte/store';
import type { RollResult, Roll } from './types/Roll';

export const rollResults: Writable<RollResult[]> = writable([]);

const CUSTOM_ROLLS_STORAGE_NAME = 'custom_rolls';
const storedCustomRolls = localStorage.getItem(CUSTOM_ROLLS_STORAGE_NAME);
const parsedStoredCustomRolls = JSON.parse(storedCustomRolls);

export const customRolls: Writable<Roll[]> = writable(
  parsedStoredCustomRolls || []
);

customRolls.subscribe((newCustomRolls) => {
  localStorage.setItem(
    CUSTOM_ROLLS_STORAGE_NAME,
    JSON.stringify(newCustomRolls)
  );
});
