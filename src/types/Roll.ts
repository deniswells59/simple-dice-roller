export enum DiceType {
  D2 = 2,
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D20 = 20,
  D100 = 100,
}

export enum ModifierOperation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  NONE = 'NONE',
}

export interface Roll {
  value: number;
  list: number[];
  modifierOperation: ModifierOperation;
  modifier: number;
}
