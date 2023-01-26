<script lang="ts">
  import Modal from './Modal.svelte';

  import { customRolls } from '../store';
  import Container from './Container.svelte';
  import Button from './Button.svelte';
  import DiceForm from './DiceForm.svelte';
  import type { Roll } from '../types/Roll';

  export let settingsModalOpen = false;
  export let closeSettingsModal = () => {};

  let settingsFormOpen = false;
  let rollToEdit: Roll;

  const closeModal = () => {
    closeSettingsModal();
    closeSettingsForm();
  };

  const openSettingsForm = (id: string) => {
    rollToEdit = $customRolls.filter((roll) => {
      return roll.id === id;
    })[0];

    settingsFormOpen = true;
  };

  const closeSettingsForm = () => {
    rollToEdit = null;
    settingsFormOpen = false;
  };

  const submitEditForm = (editFormValues) => {
    customRolls.update((currentCustomRolls) => {
      const safeToEditList = [...currentCustomRolls];

      const newCustomRolls = safeToEditList.map((customRoll) => {
        if (customRoll.id === editFormValues.id) {
          return editFormValues;
        } else {
          return customRoll;
        }
      });

      return newCustomRolls;
    });
  };
</script>

<Modal showModal={settingsModalOpen} {closeModal}>
  <Container
    class="flex flex-row mx-2 p-2 border-8 border-black bg-white"
    header="Custom Roll Settings"
    visibilityToggle={false}
  >
    {#if settingsFormOpen}
      <DiceForm
        containerStyles="border-0 py-0"
        defaultValues={rollToEdit}
        closeForm={closeSettingsForm}
        onSubmit={submitEditForm}
      >
        <Button slot="actions" class="w-full my-2" type="submit" primaryAction
          >Save</Button
        >
      </DiceForm>
    {:else}
      <p>Select a custom roll to edit.</p>
      <div class="block w-full max-h-100 overflow-scroll">
        {#each $customRolls as customRoll}
          <Button
            class="my-2 w-full"
            onClickHandler={() => openSettingsForm(customRoll.id)}
            >{customRoll.name}</Button
          >
        {/each}
      </div>
    {/if}
  </Container>
</Modal>
