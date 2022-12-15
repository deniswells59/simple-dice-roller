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

<div class="container mx-auto flex content-center justify-center">
  <Button {onClickHandler} diceType={DiceType.D20}>D20</Button>
  <Button {onClickHandler} diceType={DiceType.D2}>D2</Button>
  <Button {onClickHandler} diceType={DiceType.D4}>D4</Button>
  <Button {onClickHandler} diceType={DiceType.D6}>D6</Button>
  <Button {onClickHandler} diceType={DiceType.D8}>D8</Button>
  <Button {onClickHandler} diceType={DiceType.D10}>D10</Button>
  <Button {onClickHandler} diceType={DiceType.D12}>D12</Button>
  <Button {onClickHandler} diceType={DiceType.D100}>D100</Button>
</div>
