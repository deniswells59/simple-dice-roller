<script lang="ts">
  import Input from './Input.svelte';
  import { rollDice, DiceType, ModifierOperation } from '../utils/rollDice';

  let value: number = 0;

  const onClick = () => {
    value = rollDice({
      numberOfDice: 2,
      diceType: DiceType.D6,
      modifierOperation: ModifierOperation.ADD,
      modifier: 2,
    });
  };
</script>

<div class="container mx-auto flex content-center">
  <Input id="numOfDice" type="number" placeholder="0" />
  <button on:click={onClick}>Roll!</button>
  <p>{value}</p>
</div>
