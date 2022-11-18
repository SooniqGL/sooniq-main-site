<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="blue lighten-2"
      dark
      disable-resize-watcher
    >
      <v-list-item>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-subheader>REPORTS</v-list-subheader>
        <v-list-item v-for="item in items" :key="item.title" link>
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!--
			<v-btn
				class="hidden-md-and-up mr-3"
				elevation="1"
				fab
				small
				@click="drawer =(!drawer)"
				>
				<v-icon v-if="value">
					mdi-menu
				</v-icon>

				<v-icon v-else>
					mdi-dots-vertical
				</v-icon>
			</v-btn>
            -->

      <v-spacer class="hidden-md-and-up"></v-spacer>
      <!--
            <router-link to="/" >
                <v-app-bar-title class="router-link-size"
                data-cy="titleBtn"><v-icon>mdi-home</v-icon><i>{{
                    appTitle
                }}</i></v-app-bar-title>
            </router-link>
            -->

      <v-btn to="/" data-cy="titleBtn" class="mr-1" color="surface"
        ><v-icon>mdi-home</v-icon><i>{{ appTitle }}</i></v-btn
      >

      <!--
            <v-btn
                text
                class="hidden-sm-and-down nav-menu"
                to="/menu"
                data-cy="menuBtn"
                >Info</v-btn
            >
            -->

      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-sm-and-down mr-1" color="surface" v-bind="props"
            >Info <v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="router.push(item.link)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-sm-and-down mr-1" color="surface" v-bind="props"
            >Market <v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="router.push(item.link)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-sm-and-down mr-1" v-bind="props" color="surface">
            Hosting <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in hostingmenu"
            :key="index"
            @click="router.push(item.link)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu
        open-on-hover
        offset-y
        transition="slide-x-transition"
        bottom
        right
      >
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-sm-and-down mr-1" color="surface" v-bind="props"
            >Help <v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in services"
            :key="index"
            @click="router.push(item.link)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu
        open-on-hover
        offset-y
        transition="slide-x-transition"
        bottom
        right
      >
        <template v-slot:activator="{ props }">
          <v-btn color="surface" v-bind="props"
            >Member <v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </template>
        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-list-subheader>Business</v-list-subheader>
            <v-list-item
              v-for="(item, i) in themes"
              :key="i"
              @click="router.push(item.link)"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>

            <v-list-subheader>Account</v-list-subheader>
            <v-list-item
              v-for="(item, i) in themes"
              :key="i"
              @click="router.push(item.link)"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </span>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import router from "./router";
import HeaderBar from './HeaderBar.vue'

const appTitle = ref("Sooniq");
const drawer = ref(false);
const items = ref([
  { title: "Dashboard", icon: "mdi-view-dashboard", link: "/regist" },
  { title: "Photos", icon: "mdi-image", link: "/photos" },
  { title: "About", icon: "mdi-help-box", link: "/about" },
]);

const themes = ref([
  {
    text: "Dark",
    icon: "mdi-clock",
    link: "/login",
  },
  {
    text: "Light",
    icon: "mdi-account",
    link: "/login",
  },
]);

const hostingmenu = [
  {
    icon: "mdi-domain",
    title: "Build Site",
    link: "/build-site",
  },
  {
    icon: "mdi-message-text",
    title: "My Sites",
    link: "/my-sites",
  },
  {
    icon: "mdi-flag",
    title: "Search",
    link: "/search-site",
  },
];

const itemsx = [
  { icon: "mdi-message-text", title: "Reset Password", url: "/login" },
  { icon: "mdi-flag", title: "Activate", url: "/login" },
];

const services = ref([
  {
    icon: "mdi-domain",
    title: "Menu",
    link: "/login",
  },
  {
    icon: "mdi-message-text",
    title: "About",
    link: "/login",
  },
  {
    icon: "mdi-flag",
    title: "Integration Analysis",
    link: "/login",
  },
]);

function isAuthenticated() {
  return true; //this.$store.getters.isAuthenticated;
}

function fname() {
  //return this.$store.getters.getUser.fname;
}

function logout() {
  //store.dispatch('userSignOut');
}
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
/*
  top-color {
    background-color: black;
  }

  .router-link-size {
    display: inline-block;
    width: 140px;
  }
.back {
        background: url('@/img/snow2.jpg') no-repeat center center fixed
            !important;
        background-size: cover;
    }

    
  .custom-btn {
    color: #ffffef;
    background-color: transparent;
  } 
 
  /*
  .custom-btn {
    background-color: transparent;
  }

  /*
 
  .custom-btn:hover {
    background-color: white!important;
    color: red!important;

  }  */
</style>
