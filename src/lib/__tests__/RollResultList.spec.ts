import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { tick } from 'svelte';
import { vi } from 'vitest';

import RollResultList from '../RollResultList.svelte';
import * as config from '../../constants/config';

import { rollResults } from '../../store';
import { DICE_LIST, MODIFIER_OPERATION, MODIFIER_SYMBOLS } from '../../types/Roll';

vi.mock('../../constants/config', () => ({
  __esModule: true,
  ROLL_LIST_TIMEOUT: 1000,
}));

describe('RollResultList Component - TEST!', async () => {
  beforeEach(() => {
    rollResults.set([
      {
        name: 'Fireball!',
        value: 20,
        diceType: DICE_LIST.D6,
        list: [3, 2, 1, 3, 2, 4],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
    ]);
  });

  test('it renders all roll results', async () => {
    // @ts-ignore
    config.ROLL_LIST_TIMEOUT = 6000;

    const { getByText } = render(RollResultList);

    rollResults.set([
      {
        name: 'Fireball!',
        value: 20,
        diceType: DICE_LIST.D6,
        list: [3, 2, 1, 3, 2, 4],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
      {
        name: 'Magic Missile',
        value: 4,
        diceType: DICE_LIST.D4,
        list: [3],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 1,
      },
    ]);

    await tick();

    const clearButton = getByText('Clear X');
    expect(clearButton).toBeInTheDocument();

    const fireballResult = getByText('Fireball!');
    expect(fireballResult).toBeInTheDocument();

    const missileResult = getByText('Magic Missile');
    expect(missileResult).toBeInTheDocument();
  });

  test('it hides results list on click', async () => {
    // @ts-ignore
    config.ROLL_LIST_TIMEOUT = 1000;

    const { getByText } = render(RollResultList);

    await tick();

    const fireballResult = getByText('Fireball!');
    expect(fireballResult).toBeInTheDocument();

    const clearButton = getByText('Clear X');

    fireEvent(clearButton, new MouseEvent('click'));

    await waitFor(() => {
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  test('it hides results list on timeout', async () => {
    // @ts-ignore
    config.ROLL_LIST_TIMEOUT = 1000;
    const { getByText } = render(RollResultList);
    await tick();

    const clearButton = getByText('Clear X');
    expect(clearButton).toBeInTheDocument();

    await waitFor(() => {
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  test('it only renders 3 most recent results', async () => {
    // @ts-ignore
    config.ROLL_LIST_TIMEOUT = 6000;

    const { getByText, queryByText } = render(RollResultList);

    const intialResultList = [
      {
        name: 'Fireball! 123',
        value: 20,
        diceType: DICE_LIST.D6,
        list: [3, 2, 1, 3, 2, 4],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
      {
        name: 'Magic Missile 456',
        value: 4,
        diceType: DICE_LIST.D4,
        list: [3],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 1,
      },
      {
        name: 'Snowball! 789',
        value: 20,
        diceType: DICE_LIST.D6,
        list: [3, 2, 1, 3, 2, 4],
        modifierOperation: MODIFIER_OPERATION.ADD,
        modifier: 6,
      },
    ];

    const resultToAdd = {
      name: 'Regular Missile 1011',
      value: 4,
      diceType: DICE_LIST.D4,
      list: [3],
      modifierOperation: MODIFIER_OPERATION.ADD,
      modifier: 1,
    };

    rollResults.set([...intialResultList]);
    await tick();

    const fireballResult = getByText('Fireball! 123');
    expect(fireballResult).toBeInTheDocument();

    const missileResult = getByText('Magic Missile 456');
    expect(missileResult).toBeInTheDocument();

    const snowballResult = getByText('Snowball! 789');
    expect(snowballResult).toBeInTheDocument();

    rollResults.update((old) => [...old, resultToAdd]);
    await tick();

    // Querying for Fireball element again
    // Looks like the element doesn't fully "disappear" because
    // "Magic Missile" is bumped up and populates the OG <p> tag
    const fireballResultAgain = queryByText('Fireball! 123');
    expect(fireballResultAgain).not.toBeInTheDocument();

    const regularMissileResult = getByText('Regular Missile 1011');
    expect(regularMissileResult).toBeInTheDocument();
  });
});
