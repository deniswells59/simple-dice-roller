<script lang="ts">
  import {
    DICE_LIST,
    CustomRoll,
    CustomRollList,
    MAX_CUSTOM_ROLL_LENGTH,
    MODIFIER_OPERATION,
  } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';

  const unpoplulatedRoll: CustomRoll = {
    name: '',
    numOfDice: 0,
    diceType: DICE_LIST.D20,
    modifierOperation: MODIFIER_OPERATION.NONE,
    modifier: 0,
  };

  let customRollFormOpen = true;
  let customRollList: CustomRollList = [{ ...unpoplulatedRoll }];

  const addDice = () => {
    customRollList = [...customRollList, { ...unpoplulatedRoll }];
  };

  const removeDice = () => {
    const spliced = customRollList.slice(0, -1);
    customRollList = spliced;
  };

  const customButtonClickHandler = () => {
    customRollFormOpen = true;
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
      <Input class="w-full my-4" placeholder="Name" type="text" />
      <table>
        <tr>
          <th>#</th>
          <th>Dice</th>
          <th>Mod</th>
          <th>Mod Num</th>
        </tr>
        {#each customRollList as customRoll}
          <tr class="w-full">
            <td class="w-[20%]">
              <Input class="w-full text-center" placeholder="Number of Dice" type="number" />
            </td>
            <td class="w-[20%]">
              <Dropdown class="w-full text-center" options={Object.keys(DICE_LIST)} />
            </td>
            <td class="w-[20%]">
              <Dropdown class="w-ful text-center" options={['+', '-', 'None']} />
            </td>
            <td class="w-[20%]">
              <Input class="w-full text-center" placeholder="Modifier" type="number" />
            </td>
          </tr>
        {/each}
      </table>
      {#if customRollList.length < MAX_CUSTOM_ROLL_LENGTH}
        <Button class="w-full my-2" onClickHandler={addDice}>+ Add Dice</Button>
      {/if}
      {#if customRollList.length > 1}
        <Button class="w-full my-2" onClickHandler={removeDice}>- Remove Dice</Button>
      {/if}
      <Button class="w-full my-2">Save</Button>
    {/if}
  </Button>
</Container>
