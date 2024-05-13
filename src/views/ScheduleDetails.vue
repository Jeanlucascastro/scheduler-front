'use strict'
<template>
  <div class="global-box detalhes">
    <h1>Detalhes do agendamento: {{ scheduler.animalName }}</h1>
    SCHEDULER
  </div>
</template>

<style>
.detalhes {
  margin-top: 10px;
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js'
import type { ISchedule } from '@/interfaces/schedule.js'
import SchedulerService from '@/services/SchedulerService.js'

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'App',
  data() {
    return {
      scheduler: {} as ISchedule
    }
  },
  setup() {
    const route = useRoute()
    const loop = ref(1)

    loop.value = Number(route.params.id)

    return { loop }
  },

  components: {},

  props: {
    courseId: Number
  },

  methods: {
    async getScheduler() {
      this.scheduler = await SchedulerService.getSchedulerById(this.loop)
    }
  },

  created() {
    checkLogin()
    this.getScheduler()
  }
}
</script>
