

<template>
<!-- App.vue -->

<v-app>
    <v-system-bar
  height="10"
></v-system-bar>
    <AppNavigation/>
  
<AppBar/>
  
    <!-- Sizes your content based upon application components -->
    <v-main>
  
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
  
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>



  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import AppNavigation from './AppNavigation.vue'
  import AppBar from './AppBar.vue'
  
  export default defineComponent({
    name: 'App',

    components: {
        AppNavigation,
        AppBar
    },
  
    data () {
      return {
        //
      }
    },
  })
  </script>