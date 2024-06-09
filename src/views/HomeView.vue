<template>
  <main>
    <div class="login">
      <div class="titulo text-default">Login</div>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="text-default">Email</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput2" class="text-default">Senha</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput2"
          placeholder="Senha"
          v-model="password"
        />
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-outline-warning btn-sm" @click="login">Login</button>
      </div>
      <div class="mb-3">
        <a href="/esqueceu-senha">Esqueceu a senha?</a>
        <span> | </span>
        <a href="/criar-conta">Criar conta</a>
      </div>
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
              <h1 class="modal-title fs-5" id="exampleModalLabel">Seleção de Filial</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Selecione a filial
              <div class="dynamic-box">
                <div v-for="company in companies" :key="company.id" :value="company.id">
                  <button class="dynamic-element" @click="selectCompany(company.id)">
                    {{ company.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
main {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo {
  display: flex;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 50px;
  margin-top: 50px;
}
</style>

<script lang="ts">
import AuthenticationService from '@/services/AuthenticationService'
import type { IUserData } from '../interfaces/user-data.ts'
import CompanyService from '@/services/CompanyService.js'
import { Modal } from 'bootstrap'
import type { ICompany } from '@/interfaces/company.js'
//import { encryptTokenSimple } from '@/services/TokenService'

export default {
  data() {
    return {
      user: '',
      password: '',
      email: '',
      companies: [] as ICompany[],
      modalCompany: null as any
    }
  },
  mounted() {
    var modalElement = document.getElementById('saveModal') as HTMLElement
      var modal = new Modal(modalElement)
      this.modalCompany = modal;
  },
  methods: {
    selectCompany(id: number) {
      this.modalCompany.hide()
      localStorage.setItem('company', id.toString())
      this.$router.push('/scheulersview')      
    },
    async login() {
      try {
        const usuario: IUserData = await AuthenticationService.login(this.email, this.password)
        // localStorage.setItem('logs-data', encryptTokenSimple(usuario.token));
        localStorage.setItem('logs-data', usuario.token)
        localStorage.setItem('user-data', usuario.user.id)
        
        const currentCompany = localStorage.getItem('company')
        if (!currentCompany) {
          this.companies = await CompanyService.getCompanies()
          if (this.companies.length === 1) {
            const company = this.companies[0].id
            localStorage.setItem('company', company.toString())
            this.$router.push('/scheulersview')
          } else {
            this.modalCompany.show()
          }
        } else {
          this.$router.push('/scheulersview')
        }

        localStorage.setItem('company', '1')

        console.log('company-oasis', usuario)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>
