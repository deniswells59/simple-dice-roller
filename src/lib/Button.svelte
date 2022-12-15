<script lang="ts">
  export let onClickHandler;
  export let cssClass = '';
</script>

<button class={`p-2 m-2 border-2 rounded w-80 ${cssClass}`} on:click={onClickHandler}
  ><slot /></button
>
