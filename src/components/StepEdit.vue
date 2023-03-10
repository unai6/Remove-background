<script lang="ts" setup>
import { ref, onBeforeUnmount, computed } from 'vue'
import type { Ref } from 'vue'

import 'two-up-element'
import { useUploadStore } from '../stores/upload'

const { image } = useUploadStore()

const isProcessing: Ref<Boolean> = ref(true)

const intervalId: Ref<any> = ref(null)
const counter: Ref<number> = ref(0)

const progress = {
  max: 10,
  min: 1,
}

intervalId.value = setInterval(() => {
  if (counter.value === progress.max) {
    counter.value = 0
  }
  counter.value += 1
}, 500)

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})

function handleImageLoad () {
  isProcessing.value = false
}

function handleImageError (event: any) {
  // This setTimeout is needed to avoid calling extra times to cloudinary API
  // as the first render will alway throw 423 error.

  setTimeout(() => {
    isProcessing.value = true

    event.target.src = image.modified
  }, 15000)
}

const availableImage = computed(() => isProcessing.value ? image.blurred : image.modified)
</script>

<template>
  <progress
    v-if="isProcessing"
    class="step-edit__progress ease-linear block m-auto mb-10"
    :value="counter"
    :max="progress.max"
    :min="progress.min"
  />

  <two-up>
    <img
      class="object-cover h-48 w-96"
      :src="image.original"
      alt="Original image"
    >
    <img
      class="object-cover h-48 w-96"
      :src="availableImage"
      alt="Modified image"
      @load="handleImageLoad"
      @error="handleImageError"
    >
  </two-up>

  <template v-if="!isProcessing">
    <a :href="image.modified" class="block m-auto mt-10 bg-blue-500 hover:bg-blue-700 text-xl text-center rounded-full px-4 py-2 text-white font-bold">
      Download image without background
    </a>
  </template>
</template>

<style>
.step-edit__progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

.step-edit__progress[value]::-webkit-progress-value {
  background-color: rgb(59 130 246);
  border-radius: 10px;
  transition: width 0.5s ease;
}
</style>