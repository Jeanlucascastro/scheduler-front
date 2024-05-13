<template>
  <div class="global-box">
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
          <td>{{ formatarDataEHora(schedule?.initialTime) }}</td>
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
</style>

<script lang="ts">
import SchedulerService from '@/services/SchedulerService'
import type { ISchedule } from '../interfaces/schedule.ts'
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { storeToRefs } from 'pinia'

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
      this.getCourses()
    }
  },

  mounted() {
    this.getCourses()
  },

  methods: {
    saveTemporarySchedyle() {
      const scheduleStore = useScheduleStore()
      scheduleStore.increment(scheduleNovo)
    },
    async getCourses() {
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
    formatarDataEHora(dataString: string | number | Date | null) {
      if (!dataString) {
        return ''
      }

      var data = new Date(dataString)

      var dia = data.getDate()
      var mes = data.getMonth() + 1
      var ano = data.getFullYear()
      var hora = data.getHours()
      var minutos = data.getMinutes()

      var dataFormatada =
        dia.toString().padStart(2, '0') +
        '/' +
        mes.toString().padStart(2, '0') +
        '/' +
        ano +
        ' ' +
        hora.toString().padStart(2, '0') +
        ':' +
        minutos.toString().padStart(2, '0')

      return dataFormatada
    }
  }
}
</script>
