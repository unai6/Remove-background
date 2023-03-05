<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

import 'two-up-element'
import { useUploadStore } from '@/stores/upload'

const { image } = useUploadStore()

const isProcessing: Ref<Boolean> = ref(true)

function handleImageError (event: any) {
  // This setTimeout is needed to avoid calling extra times to cloudinary API.
  // as the first render will alway throw 423 error.

  setTimeout(() => {
    isProcessing.value = false

    event.target.src = image.modified
  }, 10000)
}
</script>

<template>
  <p v-if="isProcessing && !image.modified">Processing image...</p>
  <two-up>
    <img :src="image.original" alt="Original image">
    <img
      :src="image.modified"
      alt="Modified image"
      @load="() => isProcessing = true"
      @error="handleImageError"
    >
  </two-up>

  <a :href="image.modified" class="block m-auto mt-10 bg-blue-500 hover:bg-blue-700 text-xl text-center rounded-full px-4 py-2 text-white font-bold">
    Download image without background
  </a>
</template>