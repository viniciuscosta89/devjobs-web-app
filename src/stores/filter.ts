import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';

export interface FilterType {
  text?: string;
  location?: string;
  isFullTime?: boolean;
}

export const useFilterStore = defineStore('filter', () => {
  const filter = ref<FilterType>({
    text: (router.currentRoute.value.query.job as string) || '',
    location: (router.currentRoute.value.query.location as string) || '',
    isFullTime:
      (router.currentRoute.value.query['full-time'] as string) === 'true'
        ? true
        : false
  });

  return { filter };
});
