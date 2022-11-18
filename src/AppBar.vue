<template>
      <v-app-bar
        absolute
        color="indigo darken-2"
        dark
        shrink-on-scroll
        prominent
        scroll-target="#scrolling-techniques"
      >
        <v-app-bar-nav-icon class="hidden-md-and-up"
                @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-app-bar-title>Title</v-app-bar-title>
  
        <v-spacer></v-spacer>
  
        <v-menu
            open-on-hover
            bottom
            offset-y
        >
            <template v-slot:activator="scopeVMenu">
            <v-btn
                class="hidden-sm-and-down mr-1" color="primary"
                v-bind="attrs"
                v-on="scopeVMenu.on" 
            >Info <v-icon>mdi-chevron-down</v-icon></v-btn>
            </template>
    
            <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>

      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="hidden-sm-and-down mr-1" color="primary"
            v-bind="attrs"
            v-on="on"  
          >Market <v-icon>mdi-chevron-down</v-icon></v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon to="/sign-in">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
  </template>

<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({
        name: 'AppBar',
        data() {
            return {
                drawer: false,
                items: [
                { title: 'Menu', url: '/menu' },
                { title: 'Profile', url: '/about' },
                { title: 'Sign In', url: '/sign-in' },
                { title: 'Join', url: '/join' }
            ],
            }
            
        }
    });
    </script>