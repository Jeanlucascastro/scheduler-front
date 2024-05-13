<template>
  <main>
    <div class="login">
      <div class="titulo text-default">
        Login
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="text-default">Email</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email" v-model="email">
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput2" class="text-default">Senha</label>
        <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Senha" v-model="password">
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-outline-warning btn-sm" @click="login">Login</button>
      </div>
      <div class="mb-3">
        <a href="/esqueceu-senha">Esqueceu a senha?</a>
        <span> | </span>
        <a href="/criar-conta">Criar conta</a>
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
import type { IUserData } from '../interfaces/user-data.ts';
import { encryptTokenSimple } from '@/services/TokenService'
 
export default {
  data() {
    return {
      user: '',
      password: '',
      email: '',
    };
  },
  methods: {
    async login() {
      try {
        const usuario: IUserData = await AuthenticationService.login(this.email, this.password);
        localStorage.setItem('logs-data', encryptTokenSimple(usuario.token));
        localStorage.setItem('usuario-oasis', usuario.user.id);
        this.$router.push('/dashboard');
        console.log('company-oasis', usuario);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};


</script>



