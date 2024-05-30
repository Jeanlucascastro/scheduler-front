<template>
  <div class="global-box detalhes">
    <div>Dia: {{ currentDate }}</div>
    <VaDataTable :items="schedules" :columns="columnsA" />
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
import { formatarHora } from '../utils/data.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SchedulersAdminView',
  data() {
    return {
      timeSlots: this.generateTimeSlots('08:00', '18:00', 30),
      currentDate: this.getCurrentDate(),
      columnsA: [
      { key: "animalName" },
      {key: "note"},
      { key: "animal.name", name: "Animal", label: "Animal" },
      { key: "company.name", name: "Empresa", label: "Empresa" },
    ]
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
    navigateToSchedule(id: string) {
      this.$router.push('/schedule/' + id)
    },

    formatar(data: string | number | Date | null) {
      return formatarHora(data)
    },

    getCurrentDate() {
      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      return `${day}/${month}`
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
      const schedule = this.schedules.find(
        (schedule: ISchedule) => this.formatTime(new Date(schedule.initialTime || '')) === timeSlot
      )
      return schedule || null
    }
  }
})
</script>
