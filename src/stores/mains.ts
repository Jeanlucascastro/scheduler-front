import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    conter: 0
  }),
  actions: {
    increment() {
      this.conter++
    }
  }
})