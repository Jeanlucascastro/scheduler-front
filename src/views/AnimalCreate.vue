'use strict'
<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Agendar</h1>

  </div>
  <div class="global-box detalhes">
    <div class="informacao">
      <p><strong>Data:</strong> {{ formatar(scheduler?.initialTime) }} </p>
      <p><strong>Nome:</strong> {{ scheduler.animalName }}</p>
      <p><strong>Serviço:</strong> {{ scheduler?.type?.name }}</p>
      <p><strong>Observações:</strong> {{ scheduler?.note }}</p>
    </div>
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

.informacao {
  margin-top: 10px
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js'
import type { ISchedule } from '@/interfaces/schedule.js'
import SchedulerService from '@/services/SchedulerService.js'
import { formatarDataEHora } from '@/utils/data.js'

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'AnimalCreate',
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
    },
    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    }
  },

  created() {
    checkLogin()
    this.getScheduler()
  }
}
</script>
