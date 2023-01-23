<script lang="ts">
  import { customRolls } from '../store';

  import { DICE_LIST, Roll, MODIFIER_OPERATION, MODIFIER_SYMBOLS } from '../types/Roll';

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

  let customRollFormOpen = false;
  let customRoll: Roll = { ...unpoplulatedRoll };

  const openForm = () => {
    customRollFormOpen = true;
  };

  const closeForm = () => {
    customRollFormOpen = false;
    customRoll = { ...unpoplulatedRoll };
  };

  const onInputChange = ({ event, key }: { event: Event; key: string }): void => {
    const target = event.target as HTMLInputElement;
    const newValue = isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);

    customRoll[key] = newValue;
  };

  const createCustomRoll = (e: Event) => {
    e.preventDefault();

    const newCustomRoll = { ...customRoll };
    closeForm();

    customRolls.update((currentCustomRolls) => [...currentCustomRolls, newCustomRoll]);
  };
</script>

<Container class="my-8 mx-2">
  {#if !customRollFormOpen}
    <Button class="min-h-[10%] w-full bg-white" onClickHandler={openForm}>+ Custom</Button>
  {:else}
    <Container class="p-2 my-8 border-2 border-black bg-white">
      <form on:submit={createCustomRoll}>
        <Input
          class="w-full my-4"
          placeholder="Name"
          type="text"
          onChange={(e) => onInputChange({ event: e, key: 'name' })}
        />

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
                type="number"
                value={customRoll.numOfDice}
                onChange={(e) => onInputChange({ event: e, key: 'numOfDice' })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-full text-center"
                id="diceType"
                options={Object.keys(DICE_LIST)}
                values={Object.keys(DICE_LIST).map((k) => DICE_LIST[k])}
                selectedValue={customRoll.diceType}
                onChange={(e) => onInputChange({ event: e, key: 'diceType' })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-full text-center"
                id="modifierOperation"
                options={Object.keys(MODIFIER_OPERATION).map((k) => MODIFIER_SYMBOLS[k])}
                values={Object.keys(MODIFIER_OPERATION)}
                selectedValue={customRoll.modifierOperation}
                onChange={(e) => onInputChange({ event: e, key: 'modifierOperation' })}
              />
            </td>
            <td class="w-[20%]">
              <Input
                class="w-full text-center"
                placeholder="0"
                id="modifier"
                min="0"
                type="number"
                value={customRoll.modifier}
                onChange={(e) => onInputChange({ event: e, key: 'modifier' })}
                disabled={customRoll.modifierOperation === MODIFIER_OPERATION.NONE}
              />
            </td>
          </tr>
        </table>

        <Button type="submit" class="w-full mt-6 mb-2" primaryAction>Save</Button>
        <Button class="w-full mb-2" onClickHandler={closeForm}>Cancel</Button>
      </form>
    </Container>
  {/if}
</Container>
