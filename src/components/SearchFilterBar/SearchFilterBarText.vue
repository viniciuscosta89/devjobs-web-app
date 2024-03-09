<script setup lang="ts">
  import Icons from '@/components/Icons';

  import { useFilterStore } from '@/stores/filter';
  import { storeToRefs } from 'pinia';

  const store = useFilterStore();
  const { filter } = storeToRefs(store);

  defineProps<TextProps>();

  interface TextProps {
    handleKeyup?: (e?: Event) => void;
  }
</script>

<template>
  <div class="flex gap-4">
    <Icons.Magnify
      class="hidden md:block w-6 text-violet-100 xl:text-violet-400"
    />
    <div class="relative flex-1">
      <input
        type="search"
        name="filter"
        id="filter"
        class="peer dark:text-white dark:bg-very-dark-blue transition duration-300 w-full"
        v-model.trim="filter.text"
        @keyup.enter="handleKeyup"
        required
      />
      <label
        for="filter"
        class="absolute text-very-dark-blue dark:text-white opacity-50 left-0 translate-y-0 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:opacity-75 peer-valid:-translate-y-5 peer-valid:text-xs peer-valid:opacity-50 pointer-events-none"
      >
        <span class="xl:hidden">Filter by title...</span>
        <span class="hidden xl:block">Filter by title, companies...</span>
      </label>
    </div>
  </div>
</template>
