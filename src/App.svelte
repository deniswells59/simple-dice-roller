<script lang="ts">
  import './app.css';

  import DiceButtons from './lib/DiceButtons.svelte';
  import Page from './lib/Page.svelte';
  import RollList from './lib/RollList.svelte';
</script>

<Page>
  <DiceButtons />
  <RollList />
</Page>
