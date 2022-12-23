<script lang="ts">
  export let id = '';
  export let type = '';
  export let placeholder = '';
  export let onChange = null;
</script>

<div>
  <input
    {...$$restProps}
    class="border-2 p-3 rounded {$$props.class}"
    {id}
    {type}
    {placeholder}
    on:change={onChange}
  />
</div>
