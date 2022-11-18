<template>
  <v-app>
    <header-bar />
    <app-navigation></app-navigation>
    <v-main transition="slide-y-transition" class="overflowhidden">
        <router-view></router-view> 
    </v-main>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue'
import AppNavigation from './AppNavigation.vue'
import FooterBar from './FooterBar.vue'
// import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';

import { useSecurityStore } from "@/stores/security";

const useSecurity = useSecurityStore();
let interval = 0;


onMounted(() => {
  useSecurity.fetchToken();
  interval = setInterval(useSecurity.renewToken, 300000)

})

onUnmounted(() => clearInterval(interval))

// const route = useRoute();
// const showAppBar = (route.path.substring(0, 4) == '/dp/') ? false : true;

// console.log(route.query)
</script>
<style>
.overflowhidden {
  overflow: hidden;
  background-color: #fffffd;
}

.back {
  background: url("@/img/snow2.jpg") no-repeat center center fixed !important;
  background-size: cover;

}
</style>
