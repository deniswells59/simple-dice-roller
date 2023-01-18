<script lang="ts">
  import { customRolls } from '../store';

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

  let customRollFormOpen = false;
  let customRoll: Roll = { ...unpoplulatedRoll };

  const customButtonClickHandler = () => {
    customRollFormOpen = true;
  };

  const onInputChange = ({
    event,
    key,
  }: {
    event: Event;
    key: string;
  }): void => {
    const target = event.target as HTMLInputElement;
    const newValue = isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);

    customRoll[key] = newValue
  };

  const createCustomRoll = () => {
    customRolls.update((currentCustomRolls) => [...currentCustomRolls, customRoll]);
  };
</script>

<Container>
  <Button
    class="min-h-[10%] w-full my-8 bg-white"
    onClickHandler={() => customButtonClickHandler()}
  >
    {#if !customRollFormOpen}
      + Custom
    {:else}
      <Input
        class="w-full my-4"
        placeholder="Name"
        type="text"
        onChange={(e) => onInputChange({ event: e, key: 'name' })}
      />
      <table>
        <tr>
          <th>Dice #</th>
          <th>Dice</th>
          <th>Mod</th>
          <th>Mod #</th>
        </tr>

          <tr class="w-full">
            <td class="w-[20%]">
              <Input
                min="1"
                class="w-full text-center"
                placeholder="1"
                type="number"
                value={customRoll.numOfDice}
                onChange={(e) => onInputChange({ event: e, key: 'numOfDice' })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-full text-center"
                options={Object.keys(DICE_LIST)}
                values={Object.keys(DICE_LIST).map((k) => DICE_LIST[k])}
                selectedValue={customRoll.diceType}
                onChange={(e) => onInputChange({ event: e, key: 'diceType' })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-ful text-center"
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
                type="number"
                value={customRoll.modifier}
                onChange={(e) => onInputChange({ event: e, key: 'modifier' })}
                disabled={customRoll.modifierOperation === MODIFIER_OPERATION.NONE}
              />
            </td>
          </tr>

      </table>

      <Button class="w-full my-2" primaryAction onClickHandler={createCustomRoll}>Save</Button>
    {/if}
  </Button>
</Container>
