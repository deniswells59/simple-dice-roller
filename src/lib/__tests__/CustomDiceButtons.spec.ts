import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { vi } from 'vitest';

import CustomDiceButtons from '../CustomDiceButtons.svelte';

import { customRolls } from '../../store';
import { DICE_LIST, MODIFIER_OPERATION } from '../../types/Roll';
import { rollDice } from '../../utils/rollDice';

vi.mock('../../utils/rollDice', () => {
  const rollDiceMock = vi.fn();

  return {
    rollDice: rollDiceMock,
  };
});

describe('CustomDiceButtons Component', async () => {
  test('it renders custom rolls', async () => {
    const { queryByText, getByText } = render(CustomDiceButtons);

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

    const { getByText } = render(CustomDiceButtons);
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
