<script lang="ts">
  export let showModal;
  export let closeModal;
</script>

{#if showModal}
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-40 animate-appearModal"
    on:click={closeModal}
  />

  <div
    class="fixed top-1/3 left-0 w-screen z-50 animate-appear"
    role="dialog"
    aria-modal="true"
  >
    <slot />
  </div>
{/if}

