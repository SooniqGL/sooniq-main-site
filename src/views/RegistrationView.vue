<template>
    <v-card
    height="auto"
  >
  <v-toolbar color="third">
    <v-toolbar-title>User Registration</v-toolbar-title>
  </v-toolbar>
    <v-form ref="form" v-model="valid">
      <v-row dense no-gutters><v-col cols="12" md="5">
      <v-text-field
        v-model="email"
        color="primary"
        label="* Email"
        variant="underlined"
        placeholder="johndoe@gmail.com"
        :rules="emailRules"
        maxlength="100"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="5">
      <v-text-field
        v-model="password"
        color="primary"
        label="* Password"
        placeholder="Enter your password"
        variant="underlined"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        maxlength="100"
        @click:appendInner="show1 = !show1"
      ></v-text-field>
    </v-col>
    </v-row>

      <v-row dense no-gutters><v-col cols="12" md="5">
      <v-text-field
        v-model="fname"
        label="* First Name"
        variant="underlined"
        color="primary"
        :rules="fnameRules"
        maxlength="100"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="5">
    <v-text-field
        v-model="lname"
        label="* Last Name"
        variant="underlined"
        color="primary"
        :rules="lnameRules"
        maxlength="100"
      ></v-text-field>
    </v-col>
    </v-row>
     
    <v-row dense no-gutters>
      <v-col cols="12" md="5">
    <v-text-field
        v-model="mname"
        label="Middle Name"
        variant="underlined"
        color="primary"
        maxlength="100"
      ></v-text-field>
    </v-col>

      <v-col cols="12" md="5">
      <v-text-field
        v-model="cellphone"
        color="primary"
        label="* Cell Phone"
        variant="underlined"
        :rules="cellphoneRules"
      ></v-text-field>
    </v-col>
    </v-row>

    <v-row dense no-gutters>
      <v-col cols="12" md="5">
      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
        :rules="termRules"
      ></v-checkbox>
      </v-col>
      </v-row>
   </v-form>

    <v-card-actions>
      <v-btn color="success"
      :disabled="!valid"    
      @click="formSubmit"
      block
      variant="elevated">
        Complete Registration
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <br />
    <span class="error_css">{{ errorMsg }}</span>

  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
import axios from "axios";
import router from '../router';

const email = ref('');
const password = ref('');
const cellphone = ref('');
const fname = ref('');
const lname = ref('');
const mname = ref('');

const valid = ref(false);
const show1 = ref(false);
const terms = ref(false);

const emailRules = [
  (v: any) => !!v || "E-mail is required",
  (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v: any) => !!v || "Password is required",
  (v: string | any[]) =>
    v.length >= 6 || "Password must be at least 6 characters",
];

const termRules = [
  (v: any) => !!v || "You need to agree the terms",
];

const fnameRules = [
  (v: any) => !!v || "First name is required",
  (v: any) => /^[a-zA-Z]*$/.test(v) || 'First Name must be letters only'
];

const lnameRules = [
  (v: any) => !!v || "Last name is requried",
  (v: any) => /^[a-zA-Z]*$/.test(v) || 'Last Name must be letters only'
];

/*  - TODO: This option field does not trigger the valiation 
    - We will fix this later
const mnameRules = [
  (v: any) => /^[a-zA-Z]*$/.test(v) || 'Middle Name must be letters only'
]; */

const cellphoneRules = [
  (v: any) => !!v || "Cellphone is requried",
  (v: any) => v.length == 10 || 'Cellphone must be 10 characters',
  (v: any) => /^[0-9]*$/.test(v) || 'Cellphone must be digits only'
];

var errorMsg = ref('');
// const securityStore = useSecurityStore();

/* reactive works for object, ref() just one field
let state = reactive({
        msg: "",
        Products: ["Product 1"]
    });
    let addProduct = () => {
        state.Products.push(state.msg);
        state.msg = "";
    }; */


function formSubmit(e: any) {
  e.preventDefault();

  console.log("submit is called");
  axios
  .post(import.meta.env.VITE_API_URL + '/s1/main/registration', {
    email: email.value,
    password: password.value,
    cellphone: cellphone.value,
    fname: fname.value,
    lname: lname.value,
    mname: mname.value,
  })
  .then((response) => {
    console.log(response);
    // get response code
    if (response.data.statusCode == '200') {
      router.push("/regist-done");
    } else {
      if (response.data.statusCode == 10001) {
        errorMsg.value = "Email exists.  Please try a different email";
      } else {
        // http OK, but server rejects the call
        errorMsg.value = "Error registration, #code: " + response.data.statusCode;
      }
    }

  })
  .catch((error) => {
    // handle http exception
    console.log(error);
    errorMsg.value = "Technical error.  Please try again later";
  })      
}
  
  
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

  .error_css {
  color: red;
  font-family: "Times New Roman", serif;
  font-size: 20px;
  font-style: italic;
}

  /* lang="scss", then define: $text-field-padding: 8px 0 8px !default; */
  </style>
  