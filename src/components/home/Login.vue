<script setup>
import Signup from "@/components/home/Signup.vue";
import ErrsMsg from "@/components/ErrsMsg.vue";
import {getCurrentInstance, ref} from "vue";
import Home from "@/components/home/Home.vue";


const emits = defineEmits(['switch-component'])
const instance = getCurrentInstance()
const {user, csrfmiddlewaretoken} = defineProps(['user', 'csrfmiddlewaretoken'])
const errs = ref({})

function clickLogin() {
  const form = document.getElementById("login-form")
  const form_data = new FormData(form)

  instance.proxy.$axios.post(form.getAttribute("action"), form_data).then(response => {
    const u = response.data.user;
    const strUser = JSON.stringify(u);

    user.value = u;
    localStorage.setItem('user', strUser);
    emits('switch-component', Home);
  }).catch(e => {
    errs.value = {}
    try {
      const errors = e.response.data.errors

      for (let key in errors) {
        errs.value[key] = errors[key][0]
      }
    } catch {
      console.error(e)
    }
  })
}
</script>

<template>
  <h3>Login</h3>

  <ErrsMsg v-for="(err, index) in errs">{{index}}: {{err}}</ErrsMsg>

  <form id="login-form" action="user/login/" method="POST" class="w-25">
    <input type="hidden" name="csrfmiddlewaretoken" :value="csrfmiddlewaretoken">

    <input type="text" name="username" class="mb-2 form-control" placeholder="ID">

    <input type="password" name="password" class="mb-2 form-control" placeholder="Password"></input>

    <input type="button" @click="clickLogin" value="Login" class="mb-3 btn btn-dark">
  </form>

  <span>If you do not have a account, please <a href="#" @click="emits('switch-component', Signup)">Sign up</a> here.</span>
</template>