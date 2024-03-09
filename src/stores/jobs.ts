import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { JobType } from '@/types/job.types';
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';

export const useJobsStore = defineStore('jobsStore', () => {
  const jobsState = ref<JobType[] | undefined>([]);
  const loading = ref(false);

  const getJobs = async (): Promise<JobType[]> => {
    const response = await axios.get('/src/api/data.json');

    return response.data;
  };

  function useJobs() {
    const { isError, data, isLoading } = useQuery({
      queryKey: ['jobsStore'],
      queryFn: getJobs
    });

    return { data, isLoading, isError };
  }

  const { data, isLoading, isError } = useJobs();

  return { jobsState, data, isLoading, isError };
});
