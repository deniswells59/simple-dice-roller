<script lang="ts">
  import Button from './Button.svelte';
  import { rollDice } from '../utils/rollDice';
  import { DiceType } from '../types/Roll';
</script>

<div class="container mx-auto flex content-center justify-center">
  <Button on:click={() => rollDice({ diceType: DiceType.D20 })}>D20</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D2 })}>D2</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D4 })}>D4</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D6 })}>D6</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D8 })}>D8</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D10 })}>D10</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D12 })}>D12</Button>
  <Button on:click={() => rollDice({ diceType: DiceType.D100 })}>D100</Button>
</div>
