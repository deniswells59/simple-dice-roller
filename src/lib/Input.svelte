<script lang="ts">
  export let id = '';
  export let type = '';
  export let placeholder = '';
  export let onChange = null;
</script>

<div class="w-full">
  <input
    {...$$restProps}
    class="border-2 p-3 rounded disabled:opacity-25 {$$props.class}"
    {id}
    {type}
    {placeholder}
    on:change={onChange}
  />
</div>
