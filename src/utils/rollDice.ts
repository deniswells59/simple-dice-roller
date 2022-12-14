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
}): number => {
  let roll = 0;
  for (let i = numberOfDice; i > 0; i--) {
    roll += rollSingleDice(diceType);
  }

  const modifiedRoll = modifyRoll(roll, modifierOperation, modifier);

  return modifiedRoll;
};

export { rollDice, DiceType, ModifierOperation };
