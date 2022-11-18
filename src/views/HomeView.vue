<template>
  <v-container fill-height fluid class="back2">
    <h1>Welcome My Friend!</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >Sooniq documentation</a
      >.
    </p>
    <h3>Market Place</h3>
    <ul>
      <li><a href="/marketplace">General</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <div v-if="securityStore.jwt != ''">
      <h3>Your websites</h3>
      <ul>
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >xxx.sooniq.com</a
          >
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >yyy.sooniq.com</a
          >
        </li>
      </ul>
    </div>

    <h3>Market Place</h3>
    <ul>
      <li><a href="/marketplace">General</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <div v-if="securityStore.jwt != ''">
      <h3>Your websites</h3>
      <ul>
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >xxx.sooniq.com</a
          >
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >yyy.sooniq.com</a
          >
        </li>
      </ul>
    </div>

    <h3>Market Place</h3>
    <ul>
      <li><a href="/marketplace">General</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <div v-if="securityStore.jwt != ''">
      <h3>Your websites</h3>
      <ul>
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >xxx.sooniq.com</a
          >
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >yyy.sooniq.com</a
          >
        </li>
      </ul>
    </div>

    <h3>Market Place</h3>
    <ul>
      <li><a href="/marketplace">General</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <div v-if="securityStore.jwt != ''">
      <h3>Your websites</h3>
      <ul>
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >xxx.sooniq.com</a
          >
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >yyy.sooniq.com</a
          >
        </li>
      </ul>
    </div>

  </v-container>

</template>

<script setup lang="ts">
// this is type-based declaration, you can do runtime declaration also

/*  can do interface way, and define default values
export interface Props { 
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
*/
/*
const props = defineProps<{
  msg: string
  bar?: number
}>()

props.msg = 'Jason' // string
props.bar // number | undefined



interface Props {
  name: string
  count?: number
} 

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
const { name, count = 100 } = defineProps<Props>()
*/

import { ref } from "vue";
import { reactive } from "vue";
import { useSecurityStore } from "@/stores/security";
import MenuNew from "../MenuNew.vue";

const msg = ref("Home");
const securityStore = useSecurityStore();

/*
function formSubmit(e) {
            e.preventDefault();
            let currentObj = this;
            this.axios.post('http://localhost:8000/yourPostApi', {
                name: this.name,
                description: this.description
            })
            .then(function (response) {
                currentObj.output = response.data;
            })
            .catch(function (error) {
                currentObj.output = error;
            });
        }
*/


let state = reactive({
  msg: "",
  Products: ["Product 1"],
});
let addProduct = () => {
  state.Products.push(state.msg);
  state.msg = "";
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.back {
  background: url("@/img/snow2.jpg") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
