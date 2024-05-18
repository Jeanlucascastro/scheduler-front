<template>
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

import type { ISchedule } from '@/interfaces/schedule.js';
import { formatarDataEHora } from '../utils/data.js'
import { defineComponent } from 'vue';



export default defineComponent ({
  name: 'SchedulersAdminView',
  data() {
    return {

    }
  },

  setup() {

  },

  props: {
    schedules: Array as () => Array<ISchedule>
  },

  watch: {
  },

  mounted() {
  },

  methods: {
    navigateToSchedule(id: string | null) {
      this.$router.push('/schedule/' + id)
    },
    
    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    }
  }
})
</script>
