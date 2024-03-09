<script setup lang="ts">
  import SearchFilterBar from '@/components/SearchFilterBar';
  import TheCard from '@/components/TheCard/TheCard.vue';
  import { useFilterStore } from '@/stores/filter';
  import { useJobsStore } from '@/stores/jobs';
  import { storeToRefs } from 'pinia';
  import { ref, toRefs } from 'vue';
  import Icons from '@/components/Icons';
  import TheButton from '@/components/TheButton/TheButton.vue';
  import type { JobType } from '@/types/job.types';
  import router from '@/router';

  document.title = 'devjobs | Frontend Mentor Challenge';

  const filterStore = useFilterStore();
  const { filter } = storeToRefs(filterStore);
  const { isFullTime, location, text } = toRefs(filter.value);

  const jobsStore = useJobsStore();
  const { jobsState, data, isLoading } = storeToRefs(jobsStore);
  const filteredJobs = ref([] as JobType[] | undefined);
  const modalIsOpen = ref(false);

  const filterJobs = (jobs?: JobType[]): JobType[] | [] => {
    return (jobs as JobType[])
      .filter((item) => {
        if (text?.value) {
          return (
            item.position.toLowerCase().includes(text?.value.toLowerCase()) ||
            item.company.toLowerCase().includes(text?.value.toLowerCase())
          );
        }

        return item;
      })
      .filter((item) =>
        location?.value
          ? item.location.toLowerCase().includes(location?.value.toLowerCase())
          : item
      )
      .filter((item) =>
        isFullTime?.value ? item.contract === 'Full Time' : item
      );
  };

  const handleSearch = (e?: Event) => {
    filteredJobs.value =
      !!isFullTime?.value || !!location?.value || !!text?.value
        ? filterJobs(jobsState.value)
        : jobsState.value;

    if (
      String(isFullTime?.value) !==
        router.currentRoute.value.query['full-time'] ||
      location?.value !== router.currentRoute.value.query.location ||
      text?.value !== router.currentRoute.value.query.job
    ) {
      router.push({
        path: '/search',
        query: {
          job: text?.value,
          location: location?.value,
          'full-time': String(isFullTime?.value)
        }
      });
    }

    if (
      (e && (e.target as HTMLButtonElement).dataset.modal) ||
      (e &&
        (e.target as HTMLInputElement).parentElement?.parentElement?.dataset
          .modal)
    ) {
      modalIsOpen.value = false;
      document.body.classList.remove('overflow-hidden');
    }
  };

  const toggleModal = () => {
    modalIsOpen.value = !modalIsOpen.value;

    modalIsOpen.value
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden');
  };

  jobsStore.$subscribe((_, state) => {
    state.jobsState = data.value;
    filteredJobs.value =
      !!isFullTime?.value || !!location?.value || !!text?.value
        ? filterJobs(state.jobsState)
        : state.jobsState;
  });
</script>

<template>
  <div class="px-6 md:px-10">
    <div class="-mt-10 mx-auto max-w-screen-xl xl:px-20 pb-36 md:pb-52">
      <SearchFilterBar.Root class="md:p-4 md:py-0 xl:py-0">
        <template v-slot:text>
          <SearchFilterBar.Text
            class="xl:w-full md:py-7 md:pr-4"
            :handle-keyup="handleSearch"
          />
        </template>

        <template v-slot:location>
          <SearchFilterBar.Location
            id="location"
            class="md:py-7 md:pr-4"
            :show-component="{ tablet: true, desktop: true }"
            :show-icon="{ tablet: true, desktop: true }"
            :handle-keyup="handleSearch"
          />
          <button
            class="md:hidden"
            @click="toggleModal"
          >
            <Icons.Filter
              class="text-gray-900 dark:text-white w-5 transition duration-300"
            />
          </button>
        </template>

        <template v-slot:checkbox>
          <div class="flex xl:items-center md:gap-7 xl:gap-6">
            <div
              class="hidden md:flex md:flex-shrink-0 xl:items-center place-content-end md:gap-7 xl:gap-6"
            >
              <SearchFilterBar.Checkbox
                id="full-time"
                :handle-filter-change="handleSearch"
              />
            </div>
            <TheButton
              variant="primary"
              class="flex items-center justify-center w-12 h-12 md:w-full md:h-auto md:p-4 xl:py-4 xl:px-9"
              @click="handleSearch"
            >
              <Icons.Magnify class="w-5 md:hidden" />
              <span class="hidden md:block">Search</span>
            </TheButton>
          </div>
        </template>

        <template v-slot:modal>
          <SearchFilterBar.Modal
            :is-open="modalIsOpen"
            :handle-click="toggleModal"
          >
            <div class="grid gap-6 py-6">
              <div class="px-6">
                <SearchFilterBar.Location
                  id="modal-location"
                  :show-component="{ mobile: true }"
                  :show-icon="{ mobile: true }"
                  :handle-keyup="handleSearch"
                  data-modal="true"
                />
              </div>

              <div class="w-full bg-gray-500/20 h-[1px]"></div>

              <div class="px-6">
                <SearchFilterBar.Checkbox
                  id="modal-full-time"
                  :handle-filter-change="handleSearch"
                />
              </div>

              <TheButton
                variant="primary"
                class="flex items-center justify-center p-4 mx-6"
                @click="handleSearch"
                data-modal="true"
              >
                <span class="">Search</span>
              </TheButton>
            </div>
          </SearchFilterBar.Modal>
        </template>
      </SearchFilterBar.Root>

      <Transition
        name="fade"
        mode="out-in"
      >
        <p
          class="text-5xl text-very-dark-blue dark:text-white"
          v-if="isLoading"
        >
          Loading...
        </p>

        <div v-else-if="filteredJobs?.length === 0">
          <p class="mt-16 text-xl text-very-dark-blue dark:text-white">
            No jobs found
          </p>
        </div>

        <div v-else-if="filteredJobs && filteredJobs.length > 0">
          <TransitionGroup
            class="grid gap-12 md:gap-x-3 xl:gap-x-8 md:gap-y-16 mt-16 xl:mt-20 md:grid-cols-2 xl:grid-cols-3"
            tag="div"
            name="list"
          >
            <TheCard
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
            />
          </TransitionGroup>
        </div>

        <div v-else>
          <p class="mt-16 text-xl text-very-dark-blue dark:text-white">
            No data
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .list-move,
  .list-enter-active,
  .list-leave-active {
    @apply transition duration-500;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
  }

  .list-leave-active {
    position: absolute;
  }
</style>
