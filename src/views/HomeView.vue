<script lang="ts">
import axios from 'axios'
import router from '@/router';

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
        await axios
          .post(
            'http://localhost:8080/auth/login',
            {
              login: this.email,
              password: this.password
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
              }
            }
          )
          .then((usuario) => {
            localStorage.setItem('token-oasis', usuario.data.token)
            localStorage.setItem('usuario-oasis', usuario.data.user.id)
            router.push('/dashboard')
            console.log('company-oasis', usuario.data)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
};


</script>

<style>
main {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login {
  width: 20vw;
  height: 20vh;
}

.titulo {
  display: flex;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 50px;
  margin-top: 50px;
}
</style>

<template>
  <main>
    <div class="login">
      <div class="titulo text-default">
        Login Oasis
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
    </div>

  </main>
</template>
