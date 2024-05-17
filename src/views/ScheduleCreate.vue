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
        <VueDatePicker v-model="selectedDate" time-picker-inline />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Serviço</label>
        <select class="form-select" aria-label="Default select example" @change="handleSelectionType($event)">
          <option disabled selected>Selecione o Serviço</option>
          <option v-for="tipo in types" :key="tipo.id" :value="tipo.id">
            {{ tipo.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Animal</label>
        <select class="form-select" aria-label="Default select example" @change="handleSelectionChange($event)">
          <option disabled selected>Selecione o Animal</option>
          <option v-for="animal in animails" :key="animal.id" :value="animal.name">
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
          v-model="schedule.animalName"
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
            <div class="modal-body">...</div>
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
            <div class="modal-body">...</div>
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

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'ScheduleCreate',
  data() {
    return {
      schedule: {} as ISchedule,
      selectedDate: null,
      types: [] as IType[],
      animails: [] as IAnimal[]
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
      this.animails = await AnimalService.getAnimals()
      console.log('Animais da pessoa ', this.animails)
    },

    saveSchedule() {
      this.schedule.initialTime = this.selectedDate;
      this.schedule.companyId = parseInt(localStorage.getItem('company') || '');
      SchedulerService.saveSchedule(this.schedule).then((dada) => {
        console.log('SAVELD ', dada)
        this.$router.push('/scheulersview')
      })
      console.log('@@@@@@@@@@@@@', this.schedule)
    },

    handleSelectionChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.schedule.animalName = target.value;
    },
    
    handleSelectionType(event: Event) {
      const target = event.target as HTMLSelectElement
      this.schedule.typeId = parseInt(target.value);
    }
  },

  created() {
    checkLogin()
    this.getTypes()
    this.getAnimals()
  }
}
</script>
