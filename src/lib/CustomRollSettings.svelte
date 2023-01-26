<script lang="ts">
  import Modal from './Modal.svelte';

  import { customRolls } from '../store';

  export let settingsModalOpen = false;
  export let closeSettingsModal = () => {};
</script>

<Modal showModal={settingsModalOpen} closeModal={closeSettingsModal}>
  {#each $customRolls as customRoll}
    <div>{customRoll.name}</div>
  {/each}
</Modal>
