<script lang="ts">
  import generateUniqueID from 'generate-unique-id';

  import {
    DICE_LIST,
    Roll,
    MODIFIER_OPERATION,
    MODIFIER_SYMBOLS,
  } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';

  const unpoplulatedRoll: Roll = {
    name: '',
    numOfDice: 1,
    diceType: DICE_LIST.D20,
    modifierOperation: MODIFIER_OPERATION.NONE,
    modifier: 0,
  };

  export let staticForm = false;
  export let closeForm = () => {};
  export let onSubmit = (_roll: Roll) => {};
  export let clearFormOnSubmit: boolean = true;
  export let defaultValues: Roll = unpoplulatedRoll;
  export let containerStyles: string = '';
  export let showCloseButton: boolean = true;

  let customRoll: Roll = { ...defaultValues };

  const closeAndCleanForm = () => {
    closeForm();

    if (clearFormOnSubmit) {
      customRoll = { ...unpoplulatedRoll };
    }
  };

  const onInputChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const key = target.id;
    const newValue = isNaN(parseInt(target.value))
      ? target.value
      : parseInt(target.value);

    customRoll[key] = newValue;
  };

  const onSubmitHandler = (e: Event) => {
    e.preventDefault();

    const uniqueID = generateUniqueID();
    const newCustomRoll = {
      ...customRoll,
      id: uniqueID,
      name: customRoll.name.trim(),
    };

    onSubmit(newCustomRoll);

    closeAndCleanForm();
  };
</script>

<Container
  class={`${containerStyles} border-2 border-black bg-white md:max-w-xl`}
>
  <form on:submit={onSubmitHandler} class="flex flex-col items-center">
    {#if !staticForm}
      <Input
        class="w-full my-4"
        placeholder="Name"
        id="name"
        type="text"
        maxlength="30"
        value={customRoll.name}
        required
        onChange={onInputChange}
      />
    {/if}

    <table>
      <tr class="w-full">
        <th class="w-[20%]"><label for="numberOfDice">Dice #</label></th>
        <th class="w-[20%]"><label for="diceType">Dice</label></th>
        <th class="w-[20%]"><label for="modifierOperation">Mod</label></th>
        <th class="w-[20%]"><label for="modifier">Mod #</label></th></tr
      >

      <tr class="w-full">
        <td class="w-[20%]">
          <Input
            class="w-full text-center"
            placeholder="1"
            id="numOfDice"
            min="1"
            max="1000"
            type="number"
            value={customRoll.numOfDice}
            required
            onChange={onInputChange}
          />
        </td>
        <td class="w-[20%]">
          <Dropdown
            class="w-full text-center"
            id="diceType"
            options={Object.keys(DICE_LIST)}
            values={Object.keys(DICE_LIST).map((k) => DICE_LIST[k])}
            selectedValue={customRoll.diceType}
            onChange={onInputChange}
          />
        </td>
        <td class="w-[20%]">
          <Dropdown
            class="w-full text-center"
            id="modifierOperation"
            options={Object.keys(MODIFIER_OPERATION).map(
              (k) => MODIFIER_SYMBOLS[k]
            )}
            values={Object.keys(MODIFIER_OPERATION)}
            selectedValue={customRoll.modifierOperation}
            onChange={onInputChange}
          />
        </td>
        <td class="w-[20%]">
          <Input
            class="w-full text-center"
            placeholder="0"
            id="modifier"
            min="0"
            max="1000"
            type="number"
            value={customRoll.modifier}
            onChange={onInputChange}
            disabled={customRoll.modifierOperation === MODIFIER_OPERATION.NONE}
          />
        </td>
      </tr>
    </table>

    <slot name="actions" />

    {#if showCloseButton}
      <Button class="w-full" onClickHandler={closeAndCleanForm}>Cancel</Button>
    {/if}
  </form>
</Container>
