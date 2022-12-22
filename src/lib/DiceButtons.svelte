<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DICE_LIST, DiceList } from '../types/Roll';
  import { rolls } from '../store';

  import Button from './Button.svelte';
  import Container from './Container.svelte';

  const onClickHandler = (diceType: DiceList) => {
    const roll = rollDice({ diceType });

    rolls.update((currentRolls) => [...currentRolls, roll]);
  };
</script>

<Container>
  {#each Object.keys(DICE_LIST) as diceType}
    <Button
      cssClass="sm:w-64 sm:-m-[1px] h-20 mx-[10px] -my-[1px] w-full bg-white"
      onClickHandler={() => onClickHandler(DICE_LIST[diceType])}>{diceType}</Button
    >
  {/each}
</Container>
