<template>
  <div class="dashboard-titulo">
    <h1 class="texto-titulo">Cadastrar Animal</h1>
    <button type="button" class="btn btn-primary">
      <RouterLink to="/scheulersview" class="router-link">Voltar</RouterLink>
    </button>
  </div>
  <div class="global-box detalhes">
    <div class="formulario">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Nome</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nome" v-model="animal.name"/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Idade</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Idade"
          v-model="animal.age"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Tamanho cm</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Tamanho cm"
          v-model="animal.size"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Observações</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="animal.note"></textarea>
      </div>
      <div class="botoes-confirmacao">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#cancelModal">Cancelar</button>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#saveModal">Salvar</button>
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cancel">Confirmar</button>
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">Fechar</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveAnimal">Confirmar </button>
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
import type { IAnimal } from '@/interfaces/animal.js'

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'AnimalCreate',
  data() {
    return {
      animal: {} as IAnimal
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
    saveAnimal() {
      console.log('@@@@@@@@@@@@@', this.animal)
    },
    cancel() {
      this.$router.push('/scheulersview');
    }
  },

  created() {
    checkLogin()
  }
}
</script>
