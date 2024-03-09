<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import LogoIcon from '@/components/Icons/LogoIcon.vue';
  import TheToggle from '@/components/TheToggle/TheToggle.vue';
  import Icons from '@/components/Icons';
  import { useThemeStore } from '@/stores/theme';

  const store = useThemeStore();
  const { userTheme } = storeToRefs(store);
  const { toggleTheme, setTheme } = store;

  onMounted(() => setTheme(userTheme.value));
</script>

<template>
  <header class="header bg-no-repeat bg-cover bg-bottom">
    <div
      class="flex justify-between items-center pt-8 pb-18 px-6 md:pt-11 md:px-10 md:pb-20 xl:pt-11 xl:pb-20 mx-auto max-w-screen-xl xl:px-20"
    >
      <router-link
        to="/"
        class="hover:scale-110 transition duration-300"
        id="logo"
      >
        <LogoIcon class="text-white h-8" />
      </router-link>

      <section>
        <div class="flex gap-4 items-center text-white">
          <Icons.Sun class="w-5" />
          <TheToggle
            @change="toggleTheme()"
            :isChecked="userTheme === 'dark' ? true : false"
          />
          <Icons.Moon class="w-4" />
        </div>
      </section>
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    background-image: url('@/assets/images/mobile/bg-pattern-header.svg');

    @media (screen(md)) {
      background-image: url('@/assets/images/tablet/bg-pattern-header.svg');
    }

    @media (screen(xl)) {
      background-image: url('@/assets/images/desktop/bg-pattern-header.svg');
    }
  }
</style>
