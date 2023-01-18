<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DICE_LIST, DiceList, Roll } from '../types/Roll';
  import { rollResults, customRolls } from '../store';

  import Button from './Button.svelte';
  import Container from './Container.svelte';

  const onBasicClickHandler = (diceType: DiceList) => {
    const rollResult = rollDice({ diceType });

    rollResults.update((currentRolls) => [...currentRolls, rollResult]);
  };

  const onCustomClickHandler = (customRoll: Roll) => {
    const rollResult =  rollDice({
        numberOfDice: customRoll.numOfDice,
        diceType: customRoll.diceType,
        modifierOperation: customRoll.modifierOperation,
        modifier: customRoll.modifier,
      });


      rollResults.update((currentRolls) => [...currentRolls, rollResult]);
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
