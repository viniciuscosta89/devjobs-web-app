<script lang="ts" setup>
  defineProps<ButtonProps>();

  interface ButtonProps {
    variant: 'primary' | 'secondary' | 'dark';
  }
</script>

<template>
  <button
    :class="`border-0 rounded-md font-bold
			${variant === 'primary' ? 'bg-violet-400 text-white hover:bg-violet-100' : ''} ${variant === 'secondary' ? 'bg-grey-100 text-violet-400 hover:bg-violet-100/50' : ''} ${variant === 'dark' ? 'bg-very-dark-blue/80 text-white hover:bg-very-dark-blue/50' : ''}`"
    type="button"
  >
    <slot />
  </button>
</template>
