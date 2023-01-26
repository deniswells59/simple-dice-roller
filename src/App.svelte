<script lang="ts">
  import './app.css';

  import BaseDiceButtons from './lib/BaseDiceButtons.svelte';
  import CustomDiceButtons from './lib/CustomDiceButtons.svelte';
  import Page from './lib/Page.svelte';
  import RollResultList from './lib/RollResultList.svelte';
  import QuickRollForm from './lib/QuickRollForm.svelte';
  import CustomFormModal from './lib/CustomFormModal.svelte';
</script>

<Page>
  <QuickRollForm />
  <BaseDiceButtons />
  <CustomDiceButtons />

  <RollResultList />

  <CustomFormModal />
</Page>
