<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Agendar</h1>
    <button type="button" class="btn btn-primary">
      <RouterLink to="/scheulersview" class="router-link">Voltar</RouterLink>
    </button>
  </div>
  <div class="global-box detalhes">
    <div class="formulario">
      <div >
        <VueDatePicker v-model="selectedDate" time-picker-inline />
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
                @click="saveAnimal"
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




const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'ScheduleCreate',
  data() {
    return {
      schedule: {} as ISchedule,
      selectedDate: null
    }
  },
  setup() {
    const route = useRoute()
    const loop = ref(1)

    loop.value = Number(route.params.id)

    return { loop }
  },

  components: {
  },

  props: {
    courseId: Number
  },

  methods: {
    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    },
    saveAnimal() {
      console.log('=>>>> 0', this.selectedDate)
    },
    cancel() {
      this.$router.push('/scheulersview')
    }
  },

  created() {
    checkLogin()
  }
}
</script>
