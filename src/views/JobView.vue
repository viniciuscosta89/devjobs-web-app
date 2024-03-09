<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { useJobsStore } from '@/stores/jobs';
  import { ref } from 'vue';
  import type { JobType } from '@/types/job.types';

  const jobsStore = useJobsStore();
  const { jobsState, data, isLoading } = storeToRefs(jobsStore);

  const route = useRoute();

  const job = ref({} as JobType | undefined);

  const storeJobs = (): JobType | undefined => {
    return jobsState.value?.find((job) => {
      const companyName = String(job.company).toLowerCase().replace(/\s/g, '-');
      const positionName = String(job.position)
        .toLowerCase()
        .replace(/\s/g, '-');
      const id = `${companyName}-${positionName}`;

      return id.includes(route.params.id[0]);
    });
  };

  job.value = storeJobs();

  jobsStore.$subscribe((_, state) => {
    state.jobsState = data.value;
    console.log('subscribe', state.jobsState);

    job.value = storeJobs();
  });

  document.title = `${job.value?.position} - ${job.value?.company} -- devjobs | Frontend Mentor Challenge`;
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="job">
      <div
        class="flex flex-col gap-6 md:gap-8 -mt-4 md:-mt-10 mx-auto max-w-3xl md:px-10 xl:px-4 rounded-md px-6"
      >
        <section
          class="flex flex-col md:flex-row rounded-md md:overflow-hidden w-full"
        >
          <div class="flex relative justify-center">
            <figure
              :style="{ backgroundColor: job?.logoBackground }"
              class="w-12 h-12 md:w-36 md:h-auto p-1 md:p-8 flex items-center justify-center absolute md:relative -top-6 md:top-0 rounded-2xl md:rounded-none"
            >
              <img
                :src="`.${job?.logo}`"
                :alt="job?.company"
                class="w-full max-h-5 md:max-h-none object-contain"
              />
            </figure>
          </div>

          <div
            class="flex flex-col md:flex-row gap-7 md:justify-between items-center bg-white dark:bg-very-dark-blue p-8 pt-12 md:py-12 md:px-10 w-full transition duration-300 rounded-md md:rounded-none"
          >
            <div
              class="flex flex-col gap-3 leading-none text-center md:text-left"
            >
              <h2
                class="text-2xl text-very-dark-blue dark:text-white transition duration-300"
              >
                {{ job?.company }}
              </h2>
              <span class="text-gray-900 transition duration-300">{{
                job?.website.replace('https://', '')
              }}</span>
            </div>

            <a
              :href="job?.website"
              target="_blank"
              class="font-bold bg-violet-400/10 leading-none text-violet-400 dark:bg-white/10 dark:text-white py-4 px-5 rounded-md transition duration-300 hover:bg-violet-400/35 dark:hover:bg-white/35"
            >
              Company Site
            </a>
          </div>
        </section>

        <section
          class="bg-white dark:bg-very-dark-blue rounded-md transition duration-300"
        >
          <div class="px-6 py-10 md:p-12 flex flex-col gap-10">
            <div
              class="flex flex-col md:flex-row gap-12 md:gap-0 md:items-center justify-between"
            >
              <div class="flex flex-col gap-2">
                <div class="flex gap-3 text-gray-900 transition duration-300">
                  <span>{{ job?.postedAt }}</span>
                  •
                  <span>{{ job?.contract }}</span>
                </div>

                <h1
                  class="text-xl md:text-3xl text-very-dark-blue dark:text-white leading-none md:mb-2 transition duration-300"
                >
                  {{ job?.position }}
                </h1>
                <span class="text-violet-400 font-bold">{{
                  job?.location
                }}</span>
              </div>

              <a
                :href="job?.apply"
                target="_blank"
                class="font-bold bg-violet-400 hover:bg-violet-100 leading-none text-center text-white py-4 px-7 rounded-md transition duration-300"
              >
                Apply Now
              </a>
            </div>

            <div>
              <p class="text-gray-900">{{ job?.description }}</p>
            </div>

            <div class="flex flex-col gap-6">
              <h3 class="text-very-dark-blue dark:text-white">Requirements</h3>

              <p class="text-gray-900">{{ job?.requirements.content }}</p>

              <div class="px-4">
                <ul
                  class="flex flex-col gap-2 list-disc list-outside marker:text-violet-400"
                >
                  <li
                    class="text-gray-900 pl-8"
                    v-for="(requirement, index) in job?.requirements.items"
                    :key="index"
                  >
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col gap-6">
              <h3 class="text-very-dark-blue dark:text-white">
                What You Will Do
              </h3>

              <p class="text-gray-900">{{ job?.role.content }}</p>

              <div class="">
                <ul class="flex flex-col gap-2 list-outside">
                  <li
                    class="text-gray-900 flex gap-8"
                    v-for="(role, index) in job?.role.items"
                    :key="index"
                  >
                    <span class="text-violet-400 font-bold">
                      {{ index + 1 }}
                    </span>
                    <span> {{ role }} </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Transition
        name="slide-bottom"
        mode="out-in"
      >
        <footer
          class="bg-white dark:bg-very-dark-blue py-6 mt-20 sticky bottom-0 rounded-t-md transition-all duration-300 shadow-[0px_-8px_16px_rgba(0,0,0,0.15)]"
          v-show="job"
        >
          <div
            class="flex md:justify-between md:items-center px-6 md:px-10 xl:px-4 gap-8 mx-auto max-w-3xl rounded-md"
          >
            <div class="hidden md:flex flex-col gap-3">
              <h4
                class="font-bold text-very-dark-blue dark:text-white text-xl transition duration-300"
              >
                {{ job?.position }}
              </h4>
              <span class="text-gray-900 transition duration-300">{{
                job?.company
              }}</span>
            </div>

            <a
              :href="job?.apply"
              target="_blank"
              class="font-bold bg-violet-400 hover:bg-violet-100 leading-none text-center text-white py-4 px-7 rounded-md transition duration-300 w-full md:w-auto"
            >
              Apply Now
            </a>
          </div>
        </footer>
      </Transition>
    </div>
  </div>
</template>
