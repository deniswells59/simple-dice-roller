import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';

import CustomForm from '../CustomFormModal.svelte';

import { customRolls } from '../../store';
import {
  DICE_LIST,
  MODIFIER_OPERATION,
  MODIFIER_SYMBOLS,
} from '../../types/Roll';

describe('CustomForm Component', async () => {
  test('it renders and opens form', async () => {
    const { getByText, getByPlaceholderText } = render(CustomForm);

    const customFormButton = getByText('+ Create');
    expect(customFormButton).toBeInTheDocument();

    fireEvent(customFormButton, new MouseEvent('click'));

    await tick();

    const numInput = getByPlaceholderText('1');
    expect(numInput).toBeInTheDocument();
  });

  test('it fills and submits form', async () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } =
      render(CustomForm);

    const rollToCreate = {
      name: 'Fireball!',
      numOfDice: 6,
      diceType: DICE_LIST.D6,
      modifierOperation: MODIFIER_OPERATION.ADD,
      modifier: 6,
    };

    // 1. Opens form
    const customFormButton = getByText('+ Create');
    fireEvent(customFormButton, new MouseEvent('click'));

    await tick();

    // 2. Add Name
    const nameInput = getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: rollToCreate.name } });

    expect(nameInput).toHaveValue(rollToCreate.name);

    // 3. Add Number of Dice
    const numOfDiceInput = getByPlaceholderText('1');
    fireEvent.change(numOfDiceInput, {
      target: { value: rollToCreate.numOfDice },
    });

    expect(numOfDiceInput).toHaveValue(rollToCreate.numOfDice);

    // 4. Add Dice Type
    const diceTypeInput = getByDisplayValue('D20');
    fireEvent.change(diceTypeInput, {
      target: { value: rollToCreate.diceType },
    });

    expect(numOfDiceInput).toHaveValue(rollToCreate.diceType);

    // 5. Add Modifier Operation
    const modOpInput = getByDisplayValue(MODIFIER_SYMBOLS.NONE);
    fireEvent.change(modOpInput, {
      target: { value: rollToCreate.modifierOperation },
    });

    expect(modOpInput).toHaveValue(rollToCreate.modifierOperation);

    // 6. Add Modifier Number
    const modNumberInput = getByPlaceholderText('0');
    fireEvent.change(modNumberInput, {
      target: { value: rollToCreate.modifier },
    });

    expect(modNumberInput).toHaveValue(rollToCreate.modifier);

    // 7. Submit Form
    const submitButton = getByText('Save');
    fireEvent(submitButton, new MouseEvent('click'));

    await tick();

    // Verify state
    const currentCustomRolls = get(customRolls);
    expect(currentCustomRolls[0]).toEqual(rollToCreate);
  });
});
