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
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Nome"
          v-model="animal.name"
        />
      </div>
      <div class="mb-3">
        <VaCounter
          v-model="animal.age"
          label="Idade"
          manual-input
        />
      </div>
      <div class="mb-3">
        <VaCounter
          v-model="animal.weight"
          label="Peso Kg"
          manual-input
        />
      </div>
      <div class="mb-3">
        <VaCounter
          v-model="animal.size"
          label="Tamanho Cm"
          manual-input
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Animal</label>
        <select class="form-select" aria-label="Default select example" v-model="animal.animalType">
          <option disabled selected>Selecione o Animal</option>
          <option value="CACHORRO">Cachorro</option>
          <option value="GATO">Gato</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Observações</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="animal.note"
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
import type { IAnimal } from '@/interfaces/animal.js'
import AnimalService from '@/services/AnimalService.js'

const { checkLogin }: LoginMixin = useLoginMixin()

export default {
  name: 'AnimalCreate',
  data() {
    return {
      animal: {} as IAnimal,
      options: [
      { label: 'Cachorro', value: 'CACHORRO' },
        { label: 'Gato', value: 'GATO' }
      ],
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
      AnimalService.getAnimals()
      this.animal.companyId = 1
      AnimalService.saveAnimal(this.animal).then((dada) => {
        console.log('SAVELD ', dada)
        this.$router.push('/scheulersview')
      })
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
