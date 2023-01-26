<script lang="ts">
  import { customRolls } from '../store';
  import type { Roll } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import DiceForm from './DiceForm.svelte';
  import Modal from './Modal.svelte';

  let showModal = false;

  const openModal = () => (showModal = true);
  const closeModal = () => (showModal = false);

  const createCustomRoll = (customRollFormValues: Roll) => {
    customRolls.update((currentCustomRolls) => [
      ...currentCustomRolls,
      customRollFormValues,
    ]);
  };
</script>

<Container>
  <Button
    class="my-8 mx-2 min-h-[10%] w-full bg-white animate-appear"
    onClickHandler={openModal}>+ Create</Button
  >
</Container>

<Modal {showModal} {closeModal}>
  <DiceForm closeForm={closeModal} onSubmit={createCustomRoll} />
</Modal>
