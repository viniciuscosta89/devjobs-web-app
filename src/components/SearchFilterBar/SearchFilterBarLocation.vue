<script setup lang="ts">
  import Icons from '@/components/Icons';

  import { useFilterStore } from '@/stores/filter';
  import { storeToRefs } from 'pinia';

  const store = useFilterStore();
  const { filter } = storeToRefs(store);

  defineProps<LocationProps>();

  interface LocationProps {
    id: string;
    showComponent?: {
      mobile?: boolean;
      tablet?: boolean;
      desktop?: boolean;
    };

    showIcon?: {
      mobile?: boolean;
      tablet?: boolean;
      desktop?: boolean;
    };
    handleKeyup?: (e?: Event) => void;
  }
</script>

<template>
  <div
    :class="`gap-4 items-center ${showComponent?.mobile ? 'flex' : 'hidden'} ${showComponent?.tablet ? 'md:flex' : 'md:hidden'} ${showComponent?.desktop ? 'xl:flex' : 'xl:hidden'} xl:w-full xl:pr-4`"
  >
    <Icons.Location
      :class="`h-6 text-violet-100 xl:text-violet-400 shrink-0 ${showIcon?.mobile ? 'flex' : 'hidden'} ${showIcon?.tablet ? 'md:flex' : 'md:hidden'} ${showIcon?.desktop ? 'xl:flex' : 'xl:hidden'}`"
    />
    <div class="relative basis-full">
      <input
        type="search"
        name="filter"
        :id="id"
        class="peer dark:text-white dark:bg-very-dark-blue transition duration-300 w-full"
        v-model.trim="filter.location"
        @keyup.enter="handleKeyup"
        required
      />
      <label
        :for="id"
        class="absolute text-very-dark-blue dark:text-white opacity-50 left-0 translate-y-0 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:opacity-75 peer-valid:-translate-y-5 peer-valid:text-xs peer-valid:opacity-50 pointer-events-none"
        >Filter by location</label
      >
    </div>
  </div>
</template>
