<template>
    <v-container fill-height fluid class="backx">

        <v-row no-gutters justify="center">
            <v-col cols="12" sm="9" md="6">
                <v-card>
                    <v-toolbar color="third">
                        <v-toolbar-title>Reset Password Submit</v-toolbar-title>

                    </v-toolbar>
                    <div>You need to use the link provided in the reset password mail to get to this page. Check the
                        other mail that has the PIN.
                        Enter the PIN and new password to reset.
                    </div>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field name="pin" label="PIN" type="text" v-model="pin" :rules="pinRules"
                                variant="underlined" placeholder="Please enter the PIN" maxlength="10" color="primary">
                            </v-text-field>
                            <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" name="password"
                                label="Password" v-model="password" :rules="passwordRules"
                                :type="show1 ? 'text' : 'password'" placeholder="Enter the New Password"
                                variant="underlined" maxlength="100" @keydown.enter="formSubmit"
                                @click:appendInner="show1 = !show1" color="primary">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :disabled="!valid" @click="formSubmit" color="button" type="submit" variant="elevated"
                            block>Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <br />
        <span v-if="isDone" class="error_css">{{ msg }}</span>

    </v-container>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'
import router from '../router';

const msg = ref("");
const tokenId = ref("");
const pin = ref("");
const password = ref("");
const valid = ref(false);
const isDone = ref(false);
const show1 = ref(false);

const passwordRules = [
    (v: any) => !!v || "Password is required",
    (v: string | any[]) =>
        v.length >= 6 || "Password must be at least 6 characters",
];

const pinRules = [
    (v: any) => !!v || "PIN is required",
    (v: any) => /^[0-9]*$/.test(v) || 'PIN must be numbers only'
];

const route = useRoute();
console.log(route.query)
console.log(route.params)
tokenId.value = String(route.query.tokenId);

function formSubmit(e: any) {
    e.preventDefault();

    console.log("submit is called");
    isDone.value = false;
    axios
        .post(import.meta.env.VITE_API_URL + "/s1/main/reset-password-submit", {
            pin: pin.value,
            password: password.value,
            tokenId: tokenId.value
        })
        .then((response) => {
            console.log(response);
            // get response code and generate the display
            if (response.data.statusCode == "200") {
                console.log("Password reset is done ... ");
                msg.value = "We have sent your the emails.  Please proceed with the link and PIN from the emails.  Thank you.";
                isDone.value = true;
                router.push('/reset-password-done')
            } else {
                if (response.data.statusCode == 10063) {
                    msg.value = "Required fields are missing (10063).";
                } else if (response.data.statusCode == 10101) {
                    msg.value = "The token is expired or does not exist.  Please try to request again.";
                } else if (response.data.statusCode == 10065) {
                    msg.value = "PIN is incorrect.  You have maximum of 5 tries.";
                } else if (response.data.statusCode == 10066) {
                    msg.value = "Maximum attempt is reached.  Please try to request again.";
                } else {
                    // Server side error, but 200 status code is responded
                    msg.value = "Technical error, #code: " + response.data.statusCode;
                }
                isDone.value = true;
            }
        })
        .catch((error) => {
            // handle http exception
            console.log(error);
            msg.value = "Technical error. Please try again later. ";
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
</style>
  