import { DiceList, MODIFIER_OPERATION, ModifierOperation, Roll } from '../types/Roll';

const getRandomByMinMax = (min: number, max: number) => {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
};

const rollSingleDice = (diceMax: DiceList): number => {
  const value = getRandomByMinMax(1, diceMax as number);
  return value;
};

const modifyRoll = (
  roll: number,
  modifierOperation: ModifierOperation,
  modifier: number
): number => {
  switch (modifierOperation) {
    case MODIFIER_OPERATION.NONE: {
      return roll;
    }
    case MODIFIER_OPERATION.SUBTRACT: {
      const moddedValue = roll - modifier;

      return moddedValue < 1 ? 1 : moddedValue;
    }
    case MODIFIER_OPERATION.ADD: {
      return roll + modifier;
    }
  }
};

export const rollDice = ({
  numberOfDice = 1,
  diceType,
  modifierOperation = MODIFIER_OPERATION.NONE,
  modifier = 0,
}: {
  numberOfDice?: number;
  diceType: DiceList;
  modifierOperation?: ModifierOperation;
  modifier?: number;
}): Roll => {
  // Creates Array of roll values based on number of dice needed to be rolled
  const emptyArray = Array.from({ length: numberOfDice });
  const rollList = emptyArray.map(() => rollSingleDice(diceType));

  // Adds them all up
  const rollValue = rollList.reduce((roll, acc) => acc + roll, 0);

  // Includes any modifiers
  const modifiedRollValue = modifyRoll(rollValue, modifierOperation, modifier);

  return {
    value: modifiedRollValue,
    list: rollList,
    modifierOperation,
    modifier,
  };
};
