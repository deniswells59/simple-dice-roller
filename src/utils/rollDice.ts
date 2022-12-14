const getRandomByMinMax = (min: number, max: DiceType): number => {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
};

const rollSingleDice = (diceMax: DiceType): number => {
  const value = getRandomByMinMax(1, diceMax);
  return value;
};

enum DiceType {
  D2 = 2,
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D20 = 20,
  D100 = 100,
}

enum ModifierOperation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  NONE = 'NONE',
}

const modifyRoll = (
  roll: number,
  modifierOperation: ModifierOperation,
  modifier: number
): number => {
  switch (modifierOperation) {
    case ModifierOperation.NONE:
      return roll;
    case ModifierOperation.SUBTRACT:
      const moddedValue = roll - modifier;

      return moddedValue < 1 ? 1 : moddedValue;
    case ModifierOperation.ADD:
      return roll + modifier;
  }
};

const rollDice = ({
  numberOfDice = 1,
  diceType,
  modifierOperation = ModifierOperation.NONE,
  modifier = 0,
}: {
  numberOfDice?: number;
  diceType: DiceType;
  modifierOperation?: ModifierOperation;
  modifier?: number;
}): any => {
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
    modifier
  };
};

export { rollDice, DiceType, ModifierOperation };
