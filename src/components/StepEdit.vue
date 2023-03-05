<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

import 'two-up-element'
import { useUploadStore } from '../stores/upload';

const { image } = useUploadStore()

const isProcessing: Ref<Boolean> = ref(true)
const tries: Ref<number> = ref(0)
const intervalId: Ref<any> = ref(null)

watch(isProcessing, value => {
  if (value === true) {
    clearInterval(intervalId.value)

    intervalId.value = setInterval(() => {
      tries.value += 1
    }, 500)
  }
}, { immediate: true })
</script>

<template>
  <p v-if="isProcessing">Processing image...</p>
  <two-up>
    <img :src="image.original" alt="Original image">
    <img
      @load="() => isProcessing = true"
      @error="() => isProcessing = false"
      :key="tries"
      :src="image.modified"
      alt="Modified image"
    >
  </two-up>

  <a :href="image.modified" class="block m-auto mt-10 bg-blue-500 hover:bg-blue-700 text-xl text-center rounded-full px-4 py-2 text-white font-bold">
    Download image without background
  </a>
</template>