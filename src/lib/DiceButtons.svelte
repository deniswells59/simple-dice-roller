<script lang="ts">
  import { rollDice } from '../utils/rollDice';
  import { DiceType } from '../types/Roll';
  import { rolls } from '../store';

  import Button from './Button.svelte';

  const onClickHandler = (diceType: DiceType) => {
    const roll = rollDice({ diceType });

    rolls.update((currentRolls) => [...currentRolls, roll]);
  };
</script>

<div class="container mx-auto flex content-center justify-center flex-wrap">
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D20)}>D20</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D2)}>D2</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D4)}>D4</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D6)}>D6</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D8)}>D8</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D10)}>D10</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D12)}>D12</Button>
  <Button cssClass="w-64 h-20 m-1" onClickHandler={() => onClickHandler(DiceType.D100)}>D100</Button
  >
</div>
