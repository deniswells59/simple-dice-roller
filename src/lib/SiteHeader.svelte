<script lang="ts">
  import Container from './Container.svelte';
</script>

<Container class="flex flex-col justify-center items-center">
  <h1 class="text-3xl text-center underline underline-offset-[4px] my-4 leading-10">
    A Simple RPG Dice Roller
  </h1>
  <p class="font-light text-center">
    Use <span class="font-bold">Quick Roll</span> to roll some dice.
  </p>
  <p class="font-light text-center">
    Use <span class="font-bold">Base Dice</span> to roll one die.
  </p>
  <p class="font-light text-center">
    Or <span class="font-bold">create Custom</span> rolls to save a roll you keep
    coming back to.
  </p>
</Container>
