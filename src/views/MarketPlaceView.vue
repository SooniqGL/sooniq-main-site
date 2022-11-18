<template>
    <div class="hello">
        <h1>Market Place</h1>
        <p>
        <form @submit="formSubmit">
            <input type="text" class="form-control" v-model="name">
            <button class="btn btn-success">Search Products</button>
        </form>
        For a guide and recipes on how to configure / customize this project, check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">Sooniq documentation</a>.
        </p>
        <ProductList />
        <TheWelcome />
    </div>

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
import ProductList from "../components/ShoppingList.vue";
import TheWelcome from "../components/TheWelcome.vue";

const msg = ref("Home");

const { state, addProduct } = StateHdl();

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


function StateHdl() {
    let state = reactive({
        msg: "",
        Products: ["Product 1"]
    });
    let addProduct = () => {
        state.Products.push(state.msg);
        state.msg = "";
    };

    return { state, addProduct };
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
</style>
  