<script setup lang="ts">
  import { ref } from 'vue';

  const searchFilterBar = ref(null);

  addEventListener('scroll', () => {
    if (searchFilterBar.value && window.scrollY >= 108) {
      (searchFilterBar.value as Element).classList.add(
        'shadow-[0_8px_16px_-8px]'
      );
      (searchFilterBar.value as Element).classList.add('shadow-violet-400/70');
    }

    if (searchFilterBar.value && window.scrollY < 108) {
      (searchFilterBar.value as Element).classList.remove(
        'shadow-[0_8px_16px_-8px]'
      );
      (searchFilterBar.value as Element).classList.remove(
        'shadow-violet-400/70'
      );
    }
  });
</script>

<template>
  <section
    class="p-4 xl:px-4 bg-white dark:bg-very-dark-blue rounded-md grid grid-flow-col xl:grid-cols-[1.5fr_1fr_1fr] items-center gap-4 transition duration-300 sticky top-2 z-20"
    ref="searchFilterBar"
  >
    <div
      class="md:flex md:items-center md:border-r-[1px] border-gray-500 border-opacity-20 md:h-full"
    >
      <slot name="text"></slot>
    </div>

    <div
      class="flex md:border-r-[1px] border-gray-500 border-opacity-20 md:h-full"
    >
      <slot name="location"></slot>
    </div>

    <div class="xl:py-4">
      <slot name="checkbox"></slot>
    </div>

    <slot name="modal"></slot>
  </section>
</template>
