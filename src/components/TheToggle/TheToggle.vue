<script setup lang="ts">
  defineProps<ToggleProps>();

  interface ToggleProps {
    isChecked: boolean;
  }
</script>

<template>
  <label class="switch">
    <input
      type="checkbox"
      class="hidden peer"
      id="toggle"
      :checked="isChecked"
    />
    <span
      class="slider block w-12 h-6 rounded-full bg-white relative after:flex after:items-center after:w-4 after:h-4 after:rounded-full after:transition after:duration-500 after:absolute after:bg-violet-400 after:top-1 after:translate-x-1 peer-checked:after:translate-x-7 hover:cursor-pointer hover:after:bg-violet-100"
    ></span>
  </label>
</template>
