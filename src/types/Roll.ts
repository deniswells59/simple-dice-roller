/**
 * I converted my TS enums to Objects to more easily iterate through the
 * kets and values. ObjectValues is helping to create a Union type out of all
 * the values.
 *
 * I don't know if I like this yet. On one hand, I have to bring in double the
 * imports, but it DOES give me the separation between logic and types — which
 * improves readability.
 */

export type ObjectValues<T> = T[keyof T];

export const DICE_LIST = {
  D2: 2,
  D4: 4,
  D6: 6,
  D8: 8,
  D10: 10,
  D12: 12,
  D20: 20,
  D100: 100,
} as const;

export type DiceList = ObjectValues<typeof DICE_LIST>;

export const MODIFIER_OPERATION = {
  ADD: '+',
  SUBTRACT: '-',
  NONE: 'NONE',
} as const;

export type ModifierOperation = ObjectValues<typeof MODIFIER_OPERATION>;

export interface Roll {
  numOfDice: number;
  diceType: DiceList;
  modifierOperation: ModifierOperation;
  modifier: number;
}

/**
 * TODO
 * Implement some way to limit CustomRollList based on fixed
 * MAX_CUSTOM_ROLL_LENGTH
 */
export const MAX_CUSTOM_ROLL_LENGTH = 4;
export type RollList = Roll[];

export interface CustomRoll {
  name: string;
  rollList: RollList;
}

export interface RollResult {
  value: number;
  list: number[];
  modifierOperation: ModifierOperation;
  modifier: number;
}
