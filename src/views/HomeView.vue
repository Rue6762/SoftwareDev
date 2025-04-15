<script setup>
import {shallowRef, watch} from "vue";

import Home from "@/components/home/Home.vue";
import Login from "@/components/home/Login.vue";


const {user, csrfmiddlewaretoken} = defineProps(['user', 'csrfmiddlewaretoken'])
const currentComponent = shallowRef(user.isAuthenticated ? Home : Login)

watch(() => user, (newUser) => {
  console.log(newUser)
  currentComponent.value = newUser.isAuthenticated ? Home : Login
})

function handleSwitchComponent(component) {
  currentComponent.value = component
}
</script>

<template>
  <h1 class="border-bottom">Welcome to the Order Management System</h1>

  <component
      :is="currentComponent"
      :csrfmiddlewaretoken="csrfmiddlewaretoken"
      :user="user"
      @switch-component="handleSwitchComponent"
  />
</template>
