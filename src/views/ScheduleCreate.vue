<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Agendar</h1>
    <button type="button" class="btn btn-primary">
      <RouterLink to="/scheulersview" class="router-link">Voltar</RouterLink>
    </button>
  </div>

  <div class="global-box detalhes">
    <div class="formulario">
      <div>
        <div class="dinamic-data-picker">
          <label for="exampleFormControlInput1" class="form-label">Dia </label>
          <SelectOption
            :datas="day"
            :destination="'days'"
            @optionSelected="handleSelectionDay"
            v-if="!selectDateInput"
          />
          <VaDateInput
            v-model="valueDate"
            v-if="selectDateInput"
            :format="formatDate"
            :locale="ptBRR"
            :monthNames="months"
            :weekdayNames="weekdays"
            @update:modelValue="handleDateChange"
          />
        </div>

        <div>
          <label for="exampleFormControlInput1" class="form-label">Horarios </label>
          <SelectOption :datas="options" :destination="'times'" @optionSelected="handleSelection" />
        </div>
      </div>

      <!-- <div class="max-w-xs"></div> -->

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Serviço</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="schedule.type"
          @change="handleSelectionType($event)"
        >
          <option disabled selected>Selecione o Serviço</option>
          <option v-for="tipo in types" :key="tipo.id" :value="tipo">
            {{ tipo.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Animal</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="schedule.animal"
          @change="handleSelectionChange($event)"
        >
          <option disabled selected>Selecione o Animal</option>
          <option v-for="animal in animais" :key="animal.id" :value="animal">
            {{ animal.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Nome do Animal</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Nome"
          v-model="animalSelected.name"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Observações</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="schedule.note"
        ></textarea>
      </div>

      <div class="botoes-confirmacao">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#cancelModal"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#saveModal"
        >
          Salvar
        </button>
      </div>

      <!-- Cancel Modal -->
      <div
        class="modal fade"
        id="cancelModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Cancelar Cadastro</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Deseja realmente cancelar o registro ?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cancel">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Modal -->
      <div
        class="modal fade"
        id="saveModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Salvar Cadastro</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Deseja realmente salvar o registro ?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="cancel"
              >
                Fechar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="saveSchedule"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
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

.formulario {
  margin-top: 10px;
  width: 80%;
}

.botoes-confirmacao {
  display: flex;
  flex-direction: row;
  gap: 9px;
  justify-content: flex-end;
}

.dinamic-data-picker {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js'
import { formatarDataEHora } from '@/utils/data.js'
import type { ISchedule } from '@/interfaces/schedule.js'
import type { IType } from '@/interfaces/type.js'
import TypeService from '@/services/TypeService.js'
import type { IAnimal } from '@/interfaces/animal.js'
import AnimalService from '@/services/AnimalService.js'
import SchedulerService from '@/services/SchedulerService.js'
import type { ICreateScheduleDTO } from '@/interfaces/create-schedule.js'
import SelectOption from '../components/SelectOption.vue'
import { ptBR } from 'date-fns/locale'
import { useTimeManagerMixin, type TimeManagerMixin } from '@/mixins/TimeManagerMixin.js'

const { checkLogin }: LoginMixin = useLoginMixin()
const { getToday, getTomorrow }: TimeManagerMixin = useTimeManagerMixin()

export default {
  name: 'ScheduleCreate',
  data() {
    return {
      schedule: {} as ISchedule,
      selectedDate: null,
      types: [] as IType[],
      animais: [] as IAnimal[],
      typeSelected: {} as IType,
      animalSelected: {} as IAnimal,
      selectedTime: '',
      day: [
        { label: 'Hoje', value: 0 },
        { label: 'Amanha', value: 1 },
        { label: 'Selecionar dia', value: 2 }
      ],
      options: [
        { label: '08:00', value: 'onfe' },
        { label: '08:01', value: 'tqwo' },
        { label: '08:02', value: 'thrweee' },
        { label: '08:03', value: 'fr' },
        { label: '08:04', value: 'thrtffee' },
        { label: '08:05', value: 'ftttf' },
        { label: '08:06', value: 'f' },
        { label: '08:60', value: 'thftttfree' },
        { label: '08:60', value: 'thrtttffee' },
        { label: '08:060', value: 'thfgggree' },
        { label: '08:06', value: 'thrffgggee' }
      ],
      selectDateInput: false,
      valueDate: new Date(),
      ptBRR: ptBR,
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      selectedDayForSchedule: '',
      selectedTimeForSchedule: ''
    }
  },
  setup() {
    const route = useRoute()
    const loop = ref(1)

    loop.value = Number(route.params.id)

    return { loop }
  },

  components: {
    SelectOption
  },

  props: {
    courseId: Number
  },

  methods: {
    getAvalibleTimes(date: string) {
      console.log('date ->>>>>>>>>>>>>>>>>>> ', date)
      SchedulerService.getAvalibleTimes(date).then((slots) => {
        this.options = slots
      })
    },

    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    },

    cancel() {
      this.$router.push('/scheulersview')
    },

    async getTypes() {
      this.types = await TypeService.getTypes()
    },

    async getAnimals() {
      this.animais = await AnimalService.getAnimals()
      console.log('Animais da pessoa ', this.animais)
    },

    saveSchedule() {
      this.schedule.initialTime = this.selectedDate
      this.schedule.companyId = parseInt(localStorage.getItem('company') || '')
      const finalDateTime = `${this.selectedDayForSchedule} ${this.selectedTimeForSchedule}`
      console.log('finalDateTime ', finalDateTime)

      const scheduleToSave: ICreateScheduleDTO = {
        initialTime: new Date(finalDateTime),
        typeId: this.schedule?.type?.id,
        companyId: this.schedule.companyId,
        animalName: this.animalSelected.name,
        note: this.schedule.note,
        animalId: this.schedule?.animal?.id
      }

      if (this.loop && this.loop != 0) {
        scheduleToSave.id = this.schedule.id
        SchedulerService.updateSchedule(scheduleToSave).then(() => {
          this.$router.push('/scheulersview')
        })
      } else {
        SchedulerService.saveSchedule(scheduleToSave).then(() => {
          this.$router.push('/scheulersview')
        })
      }
      ;(this.typeSelected = {} as IType), (this.animalSelected = {} as IAnimal)
    },

    handleSelectionChange(event: Event) {
      const target = event.target as HTMLSelectElement
      this.schedule.animalId = parseInt(target.value)
      this.schedule.animalName = target.value.toString()
      this.animalSelected = this.schedule.animal as IAnimal
      console.log('this.schedule.animalName ', this.schedule.animalName)
    },

    handleSelectionType(event: Event) {
      const target = event.target as HTMLSelectElement
      this.schedule.typeId = parseInt(target.value)
    },
    handleSelection(dados: any) {
      console.log('dados ->> ', dados)
      this.selectedTimeForSchedule = dados.label
    },
    async handleSelectionDay(dado: any) {
      if (dado.value === 2) {
        this.selectDateInput = true
        console.log('DATA SELECIONADA ',this.valueDate);
      } else if (dado.value === 1) {
        this.selectedDayForSchedule = await getTomorrow()
        this.getAvalibleTimes(this.selectedDayForSchedule)
      } else {
        this.selectedDayForSchedule = await getToday()
      }
      console.log('Day ', this.selectedDayForSchedule)
    },
    formatDate(date: any) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    handleDateChange(newDate: any) {
      console.log('get type ', typeof newDate)
      if (newDate) {
        const date = new Date(newDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        this.selectedDayForSchedule = `${year}-${month}-${day}`;
        console.log('selectedDayForSchedule ', this.selectedDayForSchedule)
      } else {
        this.selectedDayForSchedule = "";
      }
    }
  },

  async created() {
    checkLogin()
    this.getTypes()
    this.getAnimals()
    this.getAvalibleTimes(await getToday())
    console.log('this. ', this.loop)
    if (this.loop && this.loop != 0) {
      this.schedule = await SchedulerService.getSchedulerById(this.loop)
      this.selectedDate = this.schedule.initialTime as any
      console.log('@@@@  ', this.selectedDate)
      this.typeSelected = this.schedule?.type as IType
      this.animalSelected = this.schedule?.animal as IAnimal
      console.log('OK', this.schedule)
    }
  }
}
</script>
