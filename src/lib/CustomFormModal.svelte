<script lang="ts">
  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import CustomForm from './CustomForm.svelte';
  import Modal from './Modal.svelte';

  let showModal = false;

  const openModal = () => (showModal = true);
  const closeModal = () => (showModal = false);
</script>

<Container>
  <Button
    class="my-8 mx-2 min-h-[10%] w-full bg-white animate-appear"
    onClickHandler={openModal}>+ Create</Button
  >
</Container>

<Modal {showModal} {closeModal}>
  <CustomForm closeForm={closeModal} />
</Modal>
