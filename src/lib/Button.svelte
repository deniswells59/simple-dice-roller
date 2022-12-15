<script lang="ts">
  export let onClickHandler;
  export let cssClass = '';
</script>

<button class={`p-2 border-2 border-black ${cssClass}`} on:click={onClickHandler}><slot /></button>
