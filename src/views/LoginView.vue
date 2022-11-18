<template>
  <v-container fill-height fluid class="backx">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card>
          <v-toolbar color="third">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  class="hidden-sm-and-down mr-1"
                  v-bind="props"
                  color="surface"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="router.push(item.url)"
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>

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
                data-cy="signinEmailField"
                color="primary"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                name="password"
                label="Password"
                data-cy="signinPasswordField"
                v-model="password"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                placeholder="Enter Password"
                variant="underlined"
                maxlength="100"
                @keydown.enter="formSubmit"
                @click:appendInner="show1 = !show1"
                color="primary"
              >
              </v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              :disabled="!valid"
              @click="formSubmit"
              data-cy="signinSubmitBtn"
              color="button"
              type="submit"
              variant="elevated"
              block
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <span class="error_css">{{ errorMsg }}</span>
    <v-row>
      <v-col cols="12" sm="9" md="6">
        <div style="background-color: #white;"><br /><br />
          You need an active account to login.  If your account email is not activated yet, please use the link 
          [ <router-link to="/activate">Activate</router-link> ]. You may reset the password if you need 
          to [<router-link to="/reset-password">Reset Password</router-link>]. <br /><br />Welcome to Sooniq!

          <br /><br />
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useSecurityStore } from "@/stores/security";
import jwt_decode from "jwt-decode";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const valid = ref(false);
const show1 = ref(false);
const useSecurity = useSecurityStore();

const emailRules = [
  (v: any) => !!v || "E-mail is required",
  (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v: any) => !!v || "Password is required",
  (v: string | any[]) =>
    v.length >= 3 || "Password must be at least 3 characters",
];
const items = [
  { icon: "mdi-message-text", title: "Reset Password", url: "/reset-pass" },
  { icon: "mdi-flag", title: "Activate", url: "/activate" },
];

/* reactive works for object, ref() just one field
let state = reactive({
        msg: "",
        Products: ["Product 1"]
    });
    let addProduct = () => {
        state.Products.push(state.msg);
        state.msg = "";
    }; */

  // To assign default value this way, the validation is triggered
  //onMounted(() => {
  //      email.value = 'sss1234@gmail.com';
  //})

function formSubmit(e: any) {
  e.preventDefault();

  console.log("submit is called");
  axios
    .post(import.meta.env.VITE_API_URL + "/s1/main/login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log(response);
      // get response code, and token
      useSecurity.setToken("", "");
      if (response.data.statusCode == "200" && response.data.object != null) {
        const obj = response.data.object;
        console.log("Token: " + obj.token);
        useSecurity.setToken(obj.firstName + " " + obj.lastName, obj.token);

        var decodedJwt: any = jwt_decode(obj.token);

        console.log("jwt xxx: " + decodedJwt.exp + ", " + decodedJwt.sub);

        // set default jwt token
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + obj.token;
        router.push("/home");
      } else {
        if (response.data.statusCode == 10052) {
          errorMsg.value = "Email or password not match.  Please try again";
        } else if (response.data.statusCode == 10053) {
          errorMsg.value = "Your account is not active yet.  Please activate it";
        } else {
          // http OK, but server rejects the call
          errorMsg.value = "Error login, #code: " + response.data.statusCode;
        }
      }
    })
    .catch((error) => {
      // handle http exception
      console.log(error);
      errorMsg.value = "Technical error. Please try again later. ";
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

</style>
