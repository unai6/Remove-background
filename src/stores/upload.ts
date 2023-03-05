import { defineStore } from 'pinia'
import { ImageStatus } from '@/types.d'

interface State {
  image: Image,
}

export const useUploadStore = defineStore('upload', {
  state: (): State => ({
    image: {
      original: null,
      modified:  null,
      status: ImageStatus.READY,
      cloudinaryStatus: 'pending',
    },
  })
})


interface Image {
  original: String | null,
  modified: String | null,
  status: String,
  cloudinaryStatus: String | null,
}