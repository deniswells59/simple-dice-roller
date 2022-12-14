<script lang="ts">
  import Input from './Input.svelte';
  import { rollDice, DiceType, ModifierOperation } from '../utils/rollDice';

  let value: number = 0;

  const onClick = () => {
    value = rollDice({
      diceType: DiceType.D4,
      modifierOperation: ModifierOperation.SUBTRACT,
      modifier: 1,
    });
  };
</script>

<div class="container mx-auto flex content-center">
  <Input id="numOfDice" type="number" placeholder="0" />
  <button on:click={onClick}>Roll!</button>
  <p>{value}</p>
</div>
