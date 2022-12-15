<script lang="ts">
  export let onClickHandler;
  export let diceType;
</script>

<button class="p-2 m-2 border-2 rounded w-80" on:click={() => onClickHandler(diceType)}><slot /></button>
