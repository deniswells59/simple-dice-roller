<script lang="ts">
  export let id = '';
  export let type = '';
  export let placeholder = '';
</script>

<div>
  <input class="border-2 p-3 rounded {$$props.class}" {id} {type} {placeholder} />
</div>
