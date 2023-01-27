<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DICE_LIST, DiceList } from '../types/Roll';
  import { rollResults } from '../store';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import DiceTypeIcon from '../assets/icons/components/DiceTypeIcon.svelte';

  const onBasicClickHandler = ({
    diceType,
    name,
  }: {
    diceType: DiceList;
    name: string;
  }) => {
    const rollResult = rollDice({ diceType, name });

    rollResults.update((currentRolls) => [...currentRolls, rollResult]);
  };
</script>

<Container header="Base Dice" class="my-6">
  {#each Object.keys(DICE_LIST) as diceType}
    <Button
      class="sm:-m-[1px] h-20 -my-[1px] w-full bg-white"
      onClickHandler={() =>
        onBasicClickHandler({ diceType: DICE_LIST[diceType], name: diceType })}
      ><DiceTypeIcon typeOfDice={DICE_LIST[diceType]} /> {diceType}</Button
    >
  {/each}
</Container>
