<script lang="ts">
  export let onClickHandler = () => {};
  export let primaryAction = false;
</script>

<button
  class={`p-2 border-2 border-black ${primaryAction && 'bg-black text-white'} ${$$props.class}`}
  on:click={onClickHandler}><slot /></button
>
