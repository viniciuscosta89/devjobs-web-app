<script setup lang="ts">
  import Icons from '@/components/Icons';

  import { useFilterStore } from '@/stores/filter';
  import { storeToRefs } from 'pinia';

  const store = useFilterStore();
  const { filter } = storeToRefs(store);

  defineProps<CheckboxProps>();

  interface CheckboxProps {
    id: string;
    handleFilterChange?: (e?: Event) => void;
  }
</script>

<template>
  <div class="flex items-center">
    <label
      :for="id"
      class="flex justify-center items-center gap-4 font-bold text-very-dark-blue dark:text-white before:bg-gray-500/15 before:flex before:rounded before:w-6 before:h-6 before:transition before:duration-300 hover:before:bg-violet-400/25 hover:cursor-pointer has-[:checked]:before:bg-violet-400 before:text-white peer-checked:group:has-[svg]:opacity-100 relative peer group"
    >
      <input
        type="checkbox"
        name="filter"
        :id="id"
        class="hidden"
        v-model="filter.isFullTime"
        @change="handleFilterChange"
      />
      <Icons.Check
        class="w-4 text-white absolute left-1 opacity-0 group-has-[:checked]:opacity-100 transition duration-300 delay-200"
      />
      <div class="flex gap-1">
        <span>Full Time</span>
        <span class="md:hidden xl:block">Only</span>
      </div>
    </label>
  </div>
</template>
