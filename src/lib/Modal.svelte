<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  export let closeModal = () => {};
  export let showModal: boolean;
</script>

{#if showModal}
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-40 animate-appearModal"
    on:click={closeModal}
  />

  <div
    class="fixed left-0 w-screen z-50 animate-appear top-1/2 -translate-y-1/2"
    role="dialog"
    aria-modal="true"
  >
    <slot />
  </div>
{/if}
