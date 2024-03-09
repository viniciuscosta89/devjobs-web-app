<script setup lang="ts">
  import TheHeader from '@/components/TheHeader/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <main>
    <router-view v-slot="{ Component, route }">
      <transition
        :name="(route.meta.transition as string) || 'fade'"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-all duration-500;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide {
    &-left {
      &-enter {
        &-active {
          @apply transition-all duration-500;
        }

        &-from {
          @apply opacity-0 -translate-x-full;
        }
      }

      &-leave {
        &-active {
          @apply transition-all duration-500;
        }

        &-to {
          @apply opacity-0 -translate-x-full;
        }
      }
    }

    &-right {
      &-enter {
        &-active {
          @apply transition-all duration-500;
        }

        &-from {
          @apply opacity-0 translate-x-full;
        }
      }

      &-leave {
        &-active {
          @apply transition-all duration-500;
        }

        &-to {
          @apply opacity-0 translate-x-full;
        }
      }
    }

    &-bottom {
      &-enter {
        &-active {
          @apply transition-all duration-500 delay-1000;
        }

        &-from {
          @apply opacity-0 translate-y-full;
        }
      }

      &-leave {
        &-active {
          @apply transition-all duration-500 delay-1000;
        }

        &-to {
          @apply opacity-0 translate-y-full;
        }
      }
    }
  }
</style>
