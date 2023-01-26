import { fireEvent, render } from '@testing-library/svelte';
import { vi } from 'vitest';

import BaseDiceButtons from '../BaseDiceButtons.svelte';
import { DICE_LIST } from '../../types/Roll';
import { rollDice } from '../../utils/rollDice';

vi.mock('../../utils/rollDice', () => {
  const rollDiceMock = vi.fn();

  return {
    rollDice: rollDiceMock,
  };
});

describe('BaseDiceButtons Component', async () => {
  test('it renders', () => {
    const { getByText } = render(BaseDiceButtons);

    const D20Button = getByText('D20');

    expect(D20Button).toBeInTheDocument();
  });

  test('it does not render (SANITY CHECK, MIGHT DELETE LATER ¯_(ツ)_/¯', () => {
    const { queryByText } = render(BaseDiceButtons);

    const nonExistentButton = queryByText('D21');

    expect(nonExistentButton).not.toBeInTheDocument();
  });

  test('it calls rollDice on click', () => {
    const { getByText } = render(BaseDiceButtons);
    const D20Button = getByText('D20');

    fireEvent(D20Button, new MouseEvent('click'));

    expect(rollDice).toHaveBeenCalledWith({
      name: 'D20',
      diceType: DICE_LIST.D20,
    });
  });
});
