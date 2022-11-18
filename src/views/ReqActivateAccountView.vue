<template>
    <v-container fill-height fluid class="backx">

      <v-row no-gutters justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card>
          <v-toolbar color="third">
            <v-toolbar-title>Request Email Confirmation</v-toolbar-title>
            
          </v-toolbar>
          <div>Please submit the email, so we will send you an email to activate it.  After you receive the mail,
                click the link in the mail to verify the email.  Thanks.
            </div>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                :rules="emailRules"
                variant="underlined"
                placeholder="johndoe@gmail.com"
                maxlength="100"
                color="primary"
              >
              </v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              :disabled="!valid"
              @click="formSubmit"
              color="button"
              type="submit"
              variant="elevated"
              block
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <span v-if="!isSuccess && isDone" class="error_css">{{ msg }}</span>
    <span v-if="isSuccess && isDone" class="success_css">{{ msg }}</span>
  
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router'

  const msg = ref("");
  const email = ref("");
  const isSuccess = ref(false);
  const valid = ref(false);
  const isDone = ref(false);

  const emailRules = [
    (v: any) => !!v || "E-mail is required",
    (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
    ];

  const route = useRoute();
  console.log(route.query)
  console.log(route.params)

  function formSubmit(e: any) {
    e.preventDefault();
    
    console.log("submit is called");
    isDone.value = false;
    axios
      .post(import.meta.env.VITE_API_URL + "/s1/main/resend-email-confirm", {
        email: email.value
      })
      .then((response) => {
        console.log(response);
        // get response code and generate the display
        if (response.data.statusCode == "200") {
          console.log("Email is sent ... ");
          msg.value = "We have sent your the email.  Thank you.";
          isSuccess.value = true;
          isDone.value = true;
        } else {
          if (response.data.statusCode == 10013) {
            msg.value = "Required field is missing (10013).";
          } else if (response.data.statusCode == 10014) {
            msg.value = "We have not found this email in our system.  Please try a different one.";
          } else if (response.data.statusCode == 10016) {
            msg.value = "Your account is disabled.  Please contact us.";
          } else {
            // Server side error, but 200 status code is responded
            msg.value = "Technical error, #code: " + response.data.statusCode;
          }
          isSuccess.value = false;
          isDone.value = true;
        }
      })
      .catch((error) => {
        // handle http exception
        console.log(error);
        msg.value = "Technical error. Please try again later. ";
        isSuccess.value = false;
        isDone.value = true;
      });
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
  
  .back {
   background: url("@/img/snow2.jpg") no-repeat center center fixed !important;
    background-size: cover; 
  
  }
  
  .error_css {
    color: red;
    font-family: "Times New Roman", serif;
    font-size: 20px;
    font-style: italic;
  }

  .success_css {
    color: green;
    font-family: "Times New Roman", serif;
    font-size: 20px;
    font-style: italic;
  }
  
  </style>
  