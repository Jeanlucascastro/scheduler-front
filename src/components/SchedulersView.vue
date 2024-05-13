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
          <td>{{ schedule?.animal?.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.schedule-link {
  display: table-cell;
  cursor: pointer;
  /* Outros estilos conforme necessário */
}
</style>

<script lang="ts">
import SchedulerService from '@/services/SchedulerService'
import type { ISchedule } from '../interfaces/schedule.ts'

export default {
  name: 'SchedulersView',
  data() {
    return {
      company_id: 'kwpGBT-cQ-M',
      schedules: [] as ISchedule[]
    }
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
    async getCourses() {
      try {
        this.schedules = await SchedulerService.getSchedules()
        console.log('this.schedules', this.schedules)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    navigateToSchedule(id) {
      this.$router.push('/schedule/' + id)
    },
    formatarDataEHora(dataString) {
      // Verifica se a string de data não é nula ou vazia
      if (!dataString) {
        return ''
      }

      // Cria um objeto Date a partir da string de data
      var data = new Date(dataString)

      // Extrai os componentes da data
      var dia = data.getDate()
      var mes = data.getMonth() + 1 // Lembrando que em JavaScript os meses começam do zero
      var ano = data.getFullYear()
      var hora = data.getHours()
      var minutos = data.getMinutes()

      // Formata os componentes em uma string no formato desejado
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
