<script setup>
import { RouterView } from 'vue-router'
import {getCurrentInstance, onMounted, ref} from "vue";


const instance = getCurrentInstance()
const csrfmiddlewaretoken = ref('')
const user = ref(JSON.parse(localStorage.getItem('user')) || {isAuthenticated: false})

onMounted(() => {
  instance.proxy.$axios.get("").then(response => {
    csrfmiddlewaretoken.value = response.data['csrfmiddlewaretoken']
  }).catch(e => {
    console.error(e);
  })
})

function clickLockout() {
  user.value = {isAuthenticated: false};
  localStorage.removeItem('user');
}
</script>

<template>
  <div class="row">
    <div class="col-auto list-group list-group-flush">
      <RouterLink to="" class="list-group-item list-group-item-action list-group-item-dark">Home</RouterLink>
      <a
          href="#"
          class="list-group-item list-group-item-action list-group-item-dark"
          v-if="user.isAuthenticated"
          @click="clickLockout"
      >Logout</a>
    </div>

    <main class="ps-2 pt-3 col me-3">
      <RouterView
          :csrfmiddlewaretoken="csrfmiddlewaretoken"
          :user="user"
      />
    </main>
  </div>
</template>
