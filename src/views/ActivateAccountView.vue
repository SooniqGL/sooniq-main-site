<template>
    <v-container fill-height fluid class="backx">
      
    <v-row v-if="isWorking">
        <v-col cols="12" sm="9" md="6">
            <span class="working_css">We are working on your request ...</span>
        </v-col>
      </v-row>
      <v-row v-if="!isWorking && isSuccess">
        <v-col cols="12" sm="9" md="6">
            <span class="success_css">{{ msg }}</span>
          
            <div style="background-color: #white;"><br /><br />
            You account now is active.  Please login -  
            <a href="/">Sooniq Global</a>
            Welcome!
  
          </div>
        </v-col>
      </v-row>
      <v-row v-if="!isWorking && !isSuccess">
        <v-col cols="12" sm="9" md="6">
            <span class="error_css">{{ msg }}</span>
          <div style="background-color: #white;"><br /><br />
            Sorry we had a problem to process your request.  Please you may use the Activte link to regenerate the confirmation link,
            or verify with us about the account your have registered.  Thank you.
          </div>
        </v-col>
      </v-row>
  
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router'

  const msg = ref("");
  const FID = ref("");
  const tokenId = ref("");
  const isSuccess = ref(true);
  const isWorking = ref(true);

  const route = useRoute();
  console.log(route.query)
  console.log(route.params)

    onMounted(() => {
        FID.value = String(route.query.FID);
        tokenId.value = String(route.query.tokenId);
        submitRequest();
    })
  
  function submitRequest() {
    console.log("submit is called");
    axios
      .post(import.meta.env.VITE_API_URL + "/s1/main/deep-drop", {
        fid: FID.value,
        tokenId: tokenId.value,
      })
      .then((response) => {
        console.log(response);
        // get response code and generate the display
        if (response.data.statusCode == "200") {
          console.log("Email is confirmed ... ");
          msg.value = "Congratulations!  Your email is confirmed successfully.  Thank you.";
          isSuccess.value = true;
        } else {
          if (response.data.statusCode == 10101) {
            msg.value = "The confirmation link may have been expired.  Please request another confirmation link.";
          } else if (response.data.statusCode == 10016) {
            msg.value = "Your account is disabled.  Please contact us.";
          } else {
            // Server side error, but 200 status code is responded
            msg.value = "Technical error, #code: " + response.data.statusCode;
          }
          isSuccess.value = false;
        }
        isWorking.value = false;
      })
      .catch((error) => {
        // handle http exception
        console.log(error);
        msg.value = "Technical error. Please try again later. ";
        isSuccess.value = false;
        isWorking.value = false;
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

  .working_css {
    color: blue;
    font-family: "Times New Roman", serif;
    font-size: 20px;
    font-style: italic;
  }
  
  </style>
  