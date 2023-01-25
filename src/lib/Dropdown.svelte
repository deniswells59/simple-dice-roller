<script lang="ts">
  export let options = [];
  export let values = [];
  export let selectedValue = null;
  export let onChange = null;
</script>

<select
  {...$$restProps}
  class="border-2 p-3 rounded {$$props.class}"
  value={selectedValue}
  on:change={onChange}
>
  {#each options as option, i}
    <option value={values[i]}>{option}</option>
  {/each}
</select>
