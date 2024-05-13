import type { ISchedule } from '@/interfaces/schedule'
import { defineStore } from 'pinia'


export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedule: {
      id: '',
      deleted: false,
      dateCreate: null,
      dateUpdate: null,
      initialTime: null,
      finalTime: null,
      type: null,
      company: null,
      executor: null,
      animalName: 'Tchulipo',
      user: null,
      animal: null,
      note: ''
    }
}),
  actions: {
    saveSchedule(scheduleData: string) {
      console.log('saveeeeeeeeeeeeeeeeeeee', scheduleData)
      // Validação dos dados (opcional)
      if (!scheduleData || Object.keys(scheduleData).length === 0) {
        console.error('Dados inválidos para salvar o agendamento.')
        return
      }

      // Atualiza o estado com os novos dados
      Object.assign(this.schedule, scheduleData)
      console.log('Salvando schedule:', scheduleData)
    },
    increment(novo: any) {
      console.log('ao e PORSSSSSSSSSSSSSSSSSSSSSS', novo)
    }
  }
})
