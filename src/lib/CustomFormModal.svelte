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
    primaryAction
    class="my-8 mx-2 min-h-[10%] w-full animate-appear"
    onClickHandler={openModal}>+ Create</Button
  >
</Container>

<Modal {showModal} {closeModal}>
  <Container
    class="flex flex-row mx-2 p-2 border-8 border-black bg-white md:max-w-xl md:items-center"
    visibilityToggle={false}
  >
    <DiceForm
      containerStyles="pb-4 border-0 px-0"
      closeForm={closeModal}
      onSubmit={createCustomRoll}
    >
      <Button
        slot="actions"
        type="submit"
        class="w-full mt-6 mb-2"
        primaryAction>Save</Button
      >
    </DiceForm>
  </Container>
</Modal>
