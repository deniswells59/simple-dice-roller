<script lang="ts">
  import './app.css';

  const getRandomByMinMax = (min, max) => {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
  };

  const rollDice = (diceMax) => getRandomByMinMax(1, diceMax);

  const rollD4 = () => rollDice(4);
  const rollD6 = () => rollDice(6);
  const rollD8 = () => rollDice(8);
  const rollD10 = () => rollDice(10);
  const rollD12 = () => rollDice(12);
  const rollD20 = () => rollDice(20);

  let value = rollD20();

  const onClick = () => {
    value = rollD20();
  };
</script>

<main>
  <h1 class="text-3xl font-bold underline">Hello Typescript! {value}</h1>
  <button on:click={onClick}>Roll!</button>
</main>

<style>
</style>
