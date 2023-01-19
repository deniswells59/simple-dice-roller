import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { vi } from 'vitest';

import DiceButtons from '../DiceButtons.svelte';

import { customRolls } from '../../store';
import { DICE_LIST, MODIFIER_OPERATION } from '../../types/Roll';
import { rollDice } from '../../utils/rollDice';

vi.mock('../../utils/rollDice', () => {
  const rollDiceMock = vi.fn();

  return {
    rollDice: rollDiceMock,
  };
});

describe('DiceButtons', async () => {
  test('it renders', () => {
    const { getByText } = render(DiceButtons);

    const D20Button = getByText('D20');

    expect(D20Button).toBeInTheDocument();
  });

  test('it does not render (SANITY CHECK, MIGHT DELETE LATER ¯_(ツ)_/¯', () => {
    const { queryByText } = render(DiceButtons);

    const nonExistentButton = queryByText('D21');

    expect(nonExistentButton).not.toBeInTheDocument();
  });

  test('it renders custom rolls', async () => {
    const { queryByText, getByText } = render(DiceButtons);

    const customButtonMissing = queryByText('Fireball!');
    expect(customButtonMissing).not.toBeInTheDocument();

    customRolls.set([
      {
        name: 'Fireball!',
        diceType: DICE_LIST.D6,
        numOfDice: 6,
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
    ]);

    await tick();

    const customButtonExists = getByText('Fireball!');
    expect(customButtonExists).toBeInTheDocument();
  });

  test('it calls rollDice on click', () => {
    const { getByText } = render(DiceButtons);
    const D20Button = getByText('D20');

    fireEvent(D20Button, new MouseEvent('click'));

    expect(rollDice).toHaveBeenCalledWith({ name: 'D20', diceType: DICE_LIST.D20 });
  });

  test('it calls rollDice with custom roll', async () => {
    customRolls.set([
      {
        name: 'Fireball!',
        diceType: DICE_LIST.D6,
        numOfDice: 6,
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
    ]);

    const { getByText } = render(DiceButtons);
    const customButton = getByText('Fireball!');

    fireEvent(customButton, new MouseEvent('click'));

    expect(rollDice).toHaveBeenCalledWith({
      name: 'Fireball!',
      diceType: DICE_LIST.D6,
      numOfDice: 6,
      modifierOperation: MODIFIER_OPERATION.ADD,
      modifier: 6,
    });
  });
});
