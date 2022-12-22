<script lang="ts">
  export let onClickHandler;
</script>

<button class={`p-2 border-2 border-black ${$$props.class}`} on:click={onClickHandler}
  ><slot /></button
>
