<template>
  <v-app-bar app color="secondary">
    <v-row>
      <v-col cols="6">
        <div class="title_css">&nbsp;&nbsp;&nbsp;
        <a href="/" class="a_css">
         Sooniq Global <span style="vertical-align:1.2em; font-size:0.35em; color: #0000df;">&reg;</span>
        </a>
      </div>
      </v-col>
    
    <v-spacer></v-spacer>
    <v-col cols="auto">
    <div>Welcome <span v-if="isAuthenticated" class="name_css">{{ useSecurity.name }}</span>
      <span v-else class="name_css">Guest</span>
      &nbsp;<v-btn v-if="isAuthenticated"  @click="useSecurity.logout()" color="surface">Logout</v-btn>
      &nbsp;<v-btn v-if="!isAuthenticated" to="/login" color="surface">Login</v-btn>
      &nbsp;<v-btn v-if="!isAuthenticated" to="/regist" color="surface">Join</v-btn>
    </div>
  </v-col>
  </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
  // import { SecurityService } from "@/service/SecurityService";
  import { useSecurityStore } from "@/stores/security";
  import { computed } from 'vue';

  // const securityService = new SecurityService();
  const useSecurity = useSecurityStore();
  const isAuthenticated = computed(() => useSecurity.isAuthenticated());
</script>

<style scoped>
.a_css {
  text-decoration: none;
}
.title_css {
  color: #ffffef;
  font-family: "Brush Script MT", "Apple Chancery", "Times New Roman", serif;
  font-size: 32px;
  font-style: italic;
}

.name_css {
  color: #ffffef;
  font-family:'Courier New', Courier, monospace, serif;
  font-style: italic;
  font-weight: bold;
  font-size: 22px;
}
</style>