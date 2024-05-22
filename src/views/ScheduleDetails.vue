<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Detalhes do agendamento</h1>
    <button type="button" class="btn btn-primary">
      <RouterLink to="/scheulersview" class="router-link">Voltar</RouterLink>
    </button>
  </div>
  <div class="global-box detalhes">
    <div class="informacao">
      <p><strong>Data:</strong> {{ formatar(scheduler?.initialTime) }}</p>
      <p><strong>Nome:</strong> {{ scheduler.animalName }}</p>
      <p><strong>Serviço:</strong> {{ scheduler?.type?.name }}</p>
      <p><strong>Observações:</strong> {{ scheduler?.note }}</p>
    </div>
    <div class="botoes">
      <button type="button" class="btn btn-primary btn-lg" @click="edit()">Editar</button>
      <button
        type="button"
        class="btn btn-danger btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#cancelScheduleModal"
      >
        Cancelar
      </button>
    </div>
  </div>

  <!-- Cancel Modal -->
  <div
    class="modal fade"
    id="cancelScheduleModal"
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cancelSchedule">
            Confirmar
          </button>
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

.informacao {
  margin-top: 10px;
  width: 80%;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js'
import type { ISchedule } from '@/interfaces/schedule.js'
import SchedulerService from '@/services/SchedulerService.js'
import { formatarDataEHora } from '@/utils/data.js'

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'ScheduleDetails',
  data() {
    return {
      scheduler: {} as ISchedule
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
    async getScheduler() {
      this.scheduler = await SchedulerService.getSchedulerById(this.loop)
    },

    formatar(data: string | number | Date | null) {
      return formatarDataEHora(data)
    },

    edit() {
      this.$router.push('/schedulecreate/' + this.loop)
    },

    async cancelSchedule() {
      const responsta = await SchedulerService.cancelSchedule(this.loop)
      console.log('responsta ', responsta)
      this.$router.push('/scheulersview')       
    }
  },

  created() {
    checkLogin()
    this.getScheduler()
  }
}
</script>
