<script setup lang="ts">
  defineProps<CardProps>();

  interface CardProps {
    job: {
      contract: 'Full Time' | 'Part Time';
      id: number;
      company: string;
      location: string;
      logo: string;
      logoBackground: string;
      position: string;
      postedAt: string;
    };
  }
</script>

<template>
  <RouterLink
    class="flex flex-col bg-white dark:bg-very-dark-blue rounded-md p-8 text-gray-900 gap-11 relative transition duration-300 hover:shadow-[0_0_32px_-4px] hover:shadow-violet-400/50 dark:hover:shadow-violet-400/50 before:absolute before:bg-violet-400"
    :to="`/job/${job.company.toLowerCase().replace(/\s/g, '-')}-${job.position.toLowerCase().replace(/\s/g, '-')}`"
  >
    <figure
      :style="{ backgroundColor: job.logoBackground }"
      class="w-12 h-12 flex items-center justify-center rounded-2xl absolute -top-6"
    >
      <img
        :src="job.logo"
        alt=""
      />
    </figure>

    <div class="flex flex-col gap-4">
      <div class="flex gap-3 items-center">
        <span>{{ job.postedAt }}</span>
        •
        <span>{{ job.contract }}</span>
      </div>
      <h3 class="text-very-dark-blue dark:text-white">
        {{ job.position }}
      </h3>
      {{ job.company }}
    </div>

    <span class="text-violet-400 font-bold text-sm">{{ job.location }}</span>
  </RouterLink>
</template>
