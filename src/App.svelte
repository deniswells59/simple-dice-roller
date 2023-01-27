<script lang="ts">
  import './app.css';

  import Page from './lib/Page.svelte';
  import SiteHeader from './lib/SiteHeader.svelte';
  import QuickRollForm from './lib/QuickRollForm.svelte';
  import BaseDiceButtons from './lib/BaseDiceButtons.svelte';
  import CustomDiceButtons from './lib/CustomDiceButtons.svelte';
  import RollResultList from './lib/RollResultList.svelte';
  import CustomFormModal from './lib/CustomFormModal.svelte';
</script>

<Page>
  <SiteHeader />
  <QuickRollForm />
  <BaseDiceButtons />
  <CustomDiceButtons />

  <RollResultList />

  <CustomFormModal />
</Page>
