<script lang="ts">
  import {
    DICE_LIST,
    RollList,
    Roll,
    MAX_CUSTOM_ROLL_LENGTH,
    MODIFIER_OPERATION,
  } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';

  const unpoplulatedRoll: Roll = {
    numOfDice: 1,
    diceType: DICE_LIST.D20,
    modifierOperation: MODIFIER_OPERATION.NONE,
    modifier: 0,
  };

  let customRollFormOpen = false;
  let customRollName = '';
  let customRollList: RollList = [{ ...unpoplulatedRoll }];

  const customButtonClickHandler = () => {
    customRollFormOpen = true;
  };

  const addDice = () => {
    customRollList = [...customRollList, { ...unpoplulatedRoll }];
  };

  const removeDice = () => {
    const spliced = customRollList.slice(0, -1);
    customRollList = spliced;
  };

  const onInputChange = ({
    event,
    key,
    index,
  }: {
    event: Event;
    key: string;
    index?: number;
  }): void => {
    const target = event.target as HTMLInputElement;

    if (key === 'name') {
      customRollName = target.value;
      return;
    }

    const newValue = isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);

    const rollToUpdate = { ...customRollList[index], [key]: newValue };
    customRollList = Object.assign([], customRollList, { [index]: rollToUpdate });
  };

  const createCustomRoll = () => {
    console.log({
      name: customRollName,
      rollList: customRollList,
    });
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
        {#each customRollList as customRoll, i}
          <tr class="w-full">
            <td class="w-[20%]">
              <Input
                min="1"
                class="w-full text-center"
                placeholder="1"
                type="number"
                value={customRoll.numOfDice}
                onChange={(e) => onInputChange({ event: e, key: 'numOfDice', index: i })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-full text-center"
                options={Object.keys(DICE_LIST)}
                values={Object.keys(DICE_LIST).map((k) => DICE_LIST[k])}
                selectedValue={customRoll.diceType}
                onChange={(e) => onInputChange({ event: e, key: 'diceType', index: i })}
              />
            </td>
            <td class="w-[20%]">
              <Dropdown
                class="w-ful text-center"
                options={Object.keys(MODIFIER_OPERATION).map((k) => MODIFIER_OPERATION[k])}
                values={Object.keys(MODIFIER_OPERATION)}
                selectedValue={customRoll.modifierOperation}
                onChange={(e) => onInputChange({ event: e, key: 'modifierOperation', index: i })}
              />
            </td>
            <td class="w-[20%]">
              <Input
                class="w-full text-center"
                placeholder="0"
                type="number"
                value={customRoll.modifier}
                onChange={(e) => onInputChange({ event: e, key: 'modifier', index: i })}
                disabled={customRoll.modifierOperation === MODIFIER_OPERATION.NONE}
              />
            </td>
          </tr>
        {/each}
      </table>

      <Button class="w-full my-2" primaryAction onClickHandler={createCustomRoll}>Save</Button>

      {#if customRollList.length < MAX_CUSTOM_ROLL_LENGTH}
        <Button class="w-full my-2" onClickHandler={addDice}>+ Add Dice</Button>
      {/if}

      {#if customRollList.length > 1}
        <Button class="w-full my-2" onClickHandler={removeDice}>- Remove Dice</Button>
      {/if}
    {/if}
  </Button>
</Container>
