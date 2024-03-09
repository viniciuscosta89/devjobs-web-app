<script setup lang="ts">
  defineProps<ModalProps>();

  interface ModalProps {
    isOpen: boolean;
    handleClick: () => void;
  }
</script>

<template>
  <Transition name="fade">
    <div
      class="bg-black/50 grid place-items-center p-6 fixed inset-0 z-10"
      v-if="isOpen"
      @click.self="handleClick"
    >
      <dialog
        class="bg-white dark:bg-very-dark-blue rounded-md w-full relative"
        :open="isOpen"
      >
        <slot></slot>
      </dialog>
    </div>
  </Transition>
</template>
