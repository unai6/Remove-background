<script setup lang="ts">
import StepUpload from './components/StepUpload.vue'
import StepEdit from './components/StepEdit.vue'

import { useUploadStore } from './stores/upload'

const { image } = useUploadStore()
</script>

<template>
  <div class="max-w-xl m-auto grid grid-cols-1 place-content-center w-full h-screen p-4">
    <header class="flex justify-center py-10">
      <h1 class="text-3xl text-center text-blue-900 font-bold tracking-lighter">remove<span class="text-blue-600">bg</span></h1>
    </header>
    <main class="w-full block">
      <StepUpload v-if="['READY', 'UPLOADING'].includes(image.status)" />
      <StepEdit v-else />
    </main>
  </div>
</template>

<style>
</style>
