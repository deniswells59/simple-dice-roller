<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DICE_LIST, DiceList, CustomRoll, MODIFIER_OPERATION } from '../types/Roll';
  import { rollResults, customRolls } from '../store';

  import Button from './Button.svelte';
  import Container from './Container.svelte';

  const onBasicClickHandler = (diceType: DiceList) => {
    const roll = rollDice({ diceType });

    rollResults.update((currentRolls) => [...currentRolls, roll]);
  };

  const onCustomClickHandler = (customRoll: CustomRoll) => {
    const rollResult = customRoll.rollList.map((roll) => {
      return rollDice({
        numberOfDice: roll.numOfDice,
        diceType: roll.diceType,
        modifierOperation: roll.modifierOperation,
        modifier: roll.modifier,
      });
    });

    console.log('rollResult:', rollResult);
  };
</script>

<Container>
  {#each Object.keys(DICE_LIST) as diceType}
    <Button
      class="sm:-m-[1px] h-20 -my-[1px] w-full bg-white"
      onClickHandler={() => onBasicClickHandler(DICE_LIST[diceType])}>{diceType}</Button
    >
  {/each}
</Container>

<Container>
  {#each $customRolls as customRoll}
    <Button
      class="sm:-m-[1px] h-20 -my-[1px] w-full bg-white"
      onClickHandler={() => onCustomClickHandler(customRoll)}
    >
      {customRoll.name}
    </Button>
  {/each}
</Container>
