<script lang="ts">
  import Modal from './Modal.svelte';

  import { customRolls } from '../store';
  import Container from './Container.svelte';
  import Button from './Button.svelte';

  export let settingsModalOpen = false;
  export let closeSettingsModal = () => {};
</script>

<Modal showModal={settingsModalOpen} closeModal={closeSettingsModal}>
  <Container
    class="flex flex-row mx-2 p-2 border-8 border-black bg-white"
    header="Custom Roll Settings"
  >
    <p>Select a custom roll to edit.</p>
    <div class="block w-full max-h-100 overflow-scroll">
      {#each $customRolls as customRoll}
        <Button
          class="my-2 w-full"
          onClickHandler={() => console.log('customeRoll', customRoll.name)}
          >{customRoll.name}</Button
        >
      {/each}
    </div>
  </Container>
</Modal>
