<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DICE_LIST, DiceList } from '../types/Roll';
  import { rollResults } from '../store';

  import Button from './Button.svelte';
  import Container from './Container.svelte';

  const onClickHandler = (diceType: DiceList) => {
    const roll = rollDice({ diceType });

    rollResults.update((currentRolls) => [...currentRolls, roll]);
  };
</script>

<Container>
  {#each Object.keys(DICE_LIST) as diceType}
    <Button
      class="sm:-m-[1px] h-20 -my-[1px] w-full bg-white"
      onClickHandler={() => onClickHandler(DICE_LIST[diceType])}>{diceType}</Button
    >
  {/each}
</Container>
