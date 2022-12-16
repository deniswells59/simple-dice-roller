<script lang="ts">
  export let id = '';
  export let type = '';
  export let placeholder = '';
</script>

<div>
  <input class="w-auto border-2 p-3 rounded" {id} {type} {placeholder} />
</div>
