<template>
  <div class="global-box detalhes">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Horário</th>
          <th scope="col">Nome</th>
          <th scope="col">Serviço</th>
          <th scope="col">Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot" @click="navigateToSchedule(timeSlot.id)">
          <td>{{ timeSlot }}</td>
          <td>
            <template v-if="getScheduleAtTime(timeSlot)">
              {{ getScheduleAtTime(timeSlot)?.animalName}}
            </template>
          </td>
          <td>
            <template v-if="getScheduleAtTime(timeSlot)">
              {{ getScheduleAtTime(timeSlot)?.type?.name }}
            </template>
          </td>
          <td>
            <template v-if="getScheduleAtTime(timeSlot)">
              {{ getScheduleAtTime(timeSlot)?.note }}
            </template>
          </td>
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
import type { ISchedule } from '@/interfaces/schedule.js'
import { formatarDataEHora } from '../utils/data.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SchedulersAdminView',
  data() {
    return {
      timeSlots: this.generateTimeSlots('08:00', '18:00', 30),
    }
  },

  setup() {},

  props: {
    schedules: {
      type: Array as () => ISchedule[],
      required: true
    }
  },

  watch: {},

  mounted() {},

  methods: {
    navigateToSchedule(id: string | null) {
      this.$router.push('/schedule/' + id)
    },
    
    generateTimeSlots(
      startTime: {
        split: (arg0: string) => {
          (): any
          new (): any
          map: { (arg0: NumberConstructor): [any, any]; new (): any }
        }
      },
      endTime: {
        split: (arg0: string) => {
          (): any
          new (): any
          map: { (arg0: NumberConstructor): [any, any]; new (): any }
        }
      },
      interval: number
    ) {
      let times = []
      let start = this.parseTime(startTime)
      let end = this.parseTime(endTime)
      while (start <= end) {
        times.push(this.formatTime(start))
        start.setMinutes(start.getMinutes() + interval)
      }
      return times
    },
    parseTime(timeString: {
      split: (arg0: string) => {
        (): any
        new (): any
        map: { (arg0: NumberConstructor): [any, any]; new (): any }
      }
    }) {
      let [hours, minutes] = timeString.split(':').map(Number)
      let date = new Date()
      date.setHours(hours)
      date.setMinutes(minutes)
      date.setSeconds(0)
      return date
    },
    formatTime(date: any) {
      let hours = date.getHours().toString().padStart(2, '0')
      let minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },
    getScheduleAtTime(timeSlot: string): ISchedule | null {
      const schedule = this.schedules.find((schedule: ISchedule) =>
        this.formatTime(new Date(schedule.initialTime || '')) === timeSlot
      );
      return schedule || null;
    },
  }
})
</script>
