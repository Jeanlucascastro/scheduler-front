<template>
  <div class="global-box">
    <h3 class="titulo-box">Cursos</h3>

    <div v-for="schedule of schedules" :key="schedule.id" class="course vstack gap-3">
      <div class="p-2">
        <RouterLink :to="'/schedule/' + schedule.id" class="router-link">{{
          schedule.id
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
/* .course {
      width: 100%;
      margin: 1px 12px;
    } */
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
    }
  }
}
</script>
