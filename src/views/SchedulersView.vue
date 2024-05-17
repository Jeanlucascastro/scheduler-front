<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Agendamentos</h1>
    <div class="botoes">
      <button type="button" class="btn btn-primary">
        <RouterLink to="/schedulecreate" class="router-link">Agendar</RouterLink>
      </button>
      <button type="button" class="btn btn-primary">
        <RouterLink to="/animalcreate" class="router-link">Cadastrar animal</RouterLink>
      </button>
    </div>
  </div>
  <div class="global-box detalhes">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Nome</th>
          <th scope="col">Serviço</th>
          <th scope="col">Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in schedules"
          :key="schedule.id"
          @click="navigateToSchedule(schedule.id)"
        >
          <td>{{ formatar(schedule?.initialTime) }}</td>
          <td>{{ schedule?.animalName }}</td>
          <td>{{ schedule?.type?.name }}</td>
          <td>{{ schedule?.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.schedule-link {
  display: table-cell;
  cursor: pointer;
}
.table {
  width: 80%;
}
.botoes {
  display: flex;
  flex-direction: row;
  gap: 9px;
}
</style>

<script lang="ts">
import SchedulerService from '@/services/SchedulerService'
import type { ISchedule } from '../interfaces/schedule.ts'
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { storeToRefs } from 'pinia'
import { formatarDataEHora } from '@/utils/data.js'

const scheduleNovo: ISchedule = {
  id: '',
  deleted: false,
  dateCreate: null,
  dateUpdate: null,
  initialTime: null,
  finalTime: null,
  type: null,
  company: null,
  executor: null,
  animalName: 'fiLO',
  user: null,
  animal: null,
  note: ''
}

export default {
  name: 'SchedulersView',
  data() {
    return {
      company_id: 'kwpGBT-cQ-M',
      schedules: [] as ISchedule[]
    }
  },
  setup() {
    const scheduleStore = useScheduleStore()

    const { schedule } = storeToRefs(scheduleStore)

    console.log('schedule ', schedule.value)
  },
  props: {
    companyId: Number
  },

  watch: {
    companyId() {
      this.getSchedules()
    }
  },

  mounted() {
    this.getSchedules()
  },

  methods: {
    saveTemporarySchedyle() {
      const scheduleStore = useScheduleStore()
      scheduleStore.increment(scheduleNovo)
    },

    async getSchedules() {
      try {
        this.schedules = await SchedulerService.getSchedules()
        console.log('this.schedules', this.schedules)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    navigateToSchedule(id: string | null) {
      this.$router.push('/schedule/' + id)
    },
    
    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    }
  }
}
</script>
