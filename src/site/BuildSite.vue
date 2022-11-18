<template>
    <v-container fluid class="indigo lighten-5 mb-3">
            <v-row>
                <v-col class="display-2 font-weight-black brown--text text-xs-center my-5" cols="12"><h1>Build Your Website</h1></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="2">
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Subdomain Website
                    </div>
                    <p class="subheading mt-3">
                        The sites we host are subdomains of us (sooniq.com). Your site will function as same
                        an regular domain website. The customers can do public things or private things as we
                        design. In other words, each site can have its own policy to control the access. One benefit
                        about this, all users will share the same login session cross all the subdomains. There is no
                        need
                        to relogin to anysite, but each site does control the access itself. There are choices as
                        what kinds feature a website can have. It is all configureable. The subdomain name can be
                        changed later on. However, as users may book mark the links, so it is not suggested to change it
                        if it is not necessary. A site can be easily switch to OFFLINE if the owner decides to do so.
                        For the current time, we are limit 10 subdomains per person.
                    </p>
                </v-col>
                <v-col cols="12" md="2">
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Rules to Select the Name
                    </div>
                    <p class="subheading mt-3">
                        You are allowed to choose at least 3 characters for the subdomain name. Maximum length is 30
                        characters. Besides the 26 letters, only dash ("-") can be used in the subdomain. However the
                        subdomain name should not start or end with a dash. It is not case sessentive. In other words,
                        letter case does not matter. The valid example could be: "fastcuttingphotos", "mostluckpeople",
                        "abc-def", etc.
                        That means the web access url can be: fastcuttingphotos.sooniq.com, mostluckpeople.sooniq.com,
                        or abc-def.sooniq.com.
                    </p>

                    <p class="subheading mt-3">
                        Warning - please check copyright on all businesses. The subdomain may voliate any business right
                        or offend any persons
                        or groups. We Sooniq will not guantee it legal - it is customer's reponsibility to make it
                        legal. If it is against
                        the law, we will need to comply with the law and remendy any necessary issues with our hosting
                        clients.
                    </p>

                    <p class="subheading mt-3">
                        The websites can be modified easily after they are created.
                        Our goal is to make the setup and maintenance easily and low
                        cost. In the meanstime, it will get the business done.
                        We commit the quality and services to make our customers happy.
                    </p>
                </v-col>
                <v-col cols="12" md="2">
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Join Us
                    </div>
                    <p class="subheading mt-3">
                        Take a look on our sample websites and see how you can find a fit
                        to your business. You are welcome to contact if you are interested.
                        Any of the templates can be adjusted to best fit your needs.
                    </p>

                    <p class="subheading mt-3">
                        You need to register on Sooniq first. This user name and password will be used cross all
                        subdomains. However, some
                        site may only be accessible to private group of customers. It might be possible, one needs to
                        get access permission
                        from the individual site. At the first, the login ID is your email. This email is verified at
                        the registration.
                        Only when email is verified, then the account can be active. We also ask phone number. Please
                        keep that accurate.
                        We will text you when there is a need to verify important flows. We will not send you any AD or
                        junk to your phone.
                    </p>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Get Start
                    </div>
                    <p class="subheading mt-3 red--text" v-if="!isAuthenticated">
                        *** You need to login to start the process. If you do not have login session, this button will
                        not submit.
                    </p>
                    <p class="subheading mt-3 red--text" v-if="isAuthenticated && !success">
                        {{ message }}
                    </p>
                    <p class="subheading mt-3 green--text" v-if="isAuthenticated && success">
                        {{ message }}
                    </p>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="formSubmit">
                        <v-text-field prepend-icon="mdi-flag" name="subdomain" label="Subdomain" type="text"
                            v-model="subdomain" :rules="subdomainRules" data-cy="joinSubdomainField" required
                            @focus="onChange">
                        </v-text-field>
                        <v-text-field prepend-icon="mdi-flag" name="title" label="Site Title" type="text" required
                            v-model="title" :rules="titleRules" data-cy="joinTitleField" @focus="onChange">
                        </v-text-field>
                        <v-text-field prepend-icon="mdi-flag" name="name" label="Business Name" type="text" required
                            v-model="name" :rules="nameRules" data-cy="joinNameField" @focus="onChange">
                        </v-text-field>

                    </v-form>
                    <v-btn color="primary" @click="formSubmit" :disabled="!valid || !isAuthenticated || success">Register
                        Subdomain</v-btn>
                    <!-- This is the last firmId, successfully created.  Can use to="/select-feature/xxx" if xxx is fixed -->
                    <!--v-btn color="primary" :to="{ name: 'select-feature', params: { firmId: firmId } }"
                        :disabled="firmId == ''">Build Your Site</v-btn -->

                </v-col>
            </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useSecurityStore } from "@/stores/security";

const securityStore = useSecurityStore();
const valid = ref(false);
const subdomain = ref('');
const title = ref('');
const name = ref('');
const message = ref('');
const success = ref(false);
const form = ref(null);

const isAuthenticated = securityStore.isAuthenticated();

const subdomainRules = [
    (v: any) => !!v || 'Subdomain is required',
    (v: any) => (!v.startsWith("-") && !v.endsWith("-")) || 'Subdomain cannot start with or end with a dash',
    (v: any) => (v.length >= 3 && v.length <= 30) || 'Subdomain should have at least 3, no more than 30 characters',
    (v: any) => /^[a-zA-Z0-9\-]*$/.test(v) || 'Only letters, digits, and dash are allowed only'
];

const titleRules = [
    (v: any) => !!v || 'Title is required',
    (v: any) => v.length <= 50 || 'Title should not be longer than 255 characters',
    (v: any) => /^[a-zA-Z0-9 \\-]*$/.test(v) || 'Title must be letters, digits, dash and space only'
];

const nameRules = [
    (v: any) => !!v || 'Business Name is required',
    (v: any) => v.length <= 50 || 'Business Name should not be longer than 255 characters',
    (v: any) => /^[a-zA-Z0-9 ]*$/.test(v) || 'Business must be letters, digits, dash and space only'
];

function formSubmit(e: any) {
    e.preventDefault();
    if ((form.value as any).validate()) {
        if (!securityStore.isAuthenticated()) {
            message.value = "Session is expired.  You need to login first."
            return;
        }

        var postData = {
            domainId: subdomain.value,
            title: title.value,
            name: name.value
        };

        const headers = {
            "Authorization": "Bearer " + securityStore.jwt,
            "FID": "J9",
            withCredentials: true
        };

        axios.post(import.meta.env.VITE_API_URL + "/s1/site/register-domain", postData, { headers })
            .then(result => {
                alert("Good: " + JSON.stringify(result));
                success.value = false;
                message.value = '';
                if (result != null && result.data != null) {
                    if (result.data.statusCode == 200) {
                        message.value = "Subdomain is registered successfully";
                        success.value = true;
                        router.push('/my-sites')
                    } else if (result.data.statusCode == 10151) {
                        message.value = "Subdomain exists.  Please choose a different one";
                    } else if (result.data.statusCode == 10200) {
                        message.value = "No session or expired";
                    } else if (result.data.statusCode == 10152) {
                        message.value = "Max # of sites is reached";
                    } else if (result.data.statusCode == 10153) {
                        message.value = "Subdomain name is not valid";
                    } else {
                        message.value = "Error: " + result.data.statusCode + ". Try later";
                    }
                } else {
                    message.value = "Technical error. Try later";
                }
            })
            .catch(err => {
                if (err) {
                    alert("Error: " + JSON.stringify(err));
                    message.value = "Technical error. Try later";
                }
            });

    }
}
function onChange() {
    success.value = false;
    message.value = '';
}



</script>

<style scoped>

</style>