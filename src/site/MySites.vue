<template>
    <v-container fluid class="indigo lighten-5 container" fill-height>
        <v-container grid-list-lg>
            <v-row>
                <v-col class="display-2 font-weight-black brown--text text-xs-center my-5">Your Websites</v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="subheading mt-3 red--text" v-if="isAuthenticated && !success">
                        {{ message }}
                    </p>
                    <v-progress-circular indeterminate v-if="inload" center color="green"></v-progress-circular>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="headline mt-3 brown--text font-weight-bold"><b>The Sites You Own</b></v-col>
            </v-row>

            <!--  :to="{ name: 'select-feature', params: { firmId: site.firmId } }"  link to access entries on menu  -->
            <v-row v-for="site in ownerFirmList" :key="site.title" v-bind="counter++" :style="{ backgroundColor: chooseColor() }">
                <v-col>
                    Title: {{ site.title }}
                </v-col>

                <v-col>
                    Firm: {{ site.name }}
                </v-col>

                <v-col>
                    <v-tooltip>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary"
                                to="/"
                                v-bind="props">
                                <v-icon class="blue lighten-1" dark>
                                    mdi-folder
                                </v-icon> {{ site.domainId }}.sooniq.com
                            </v-btn>
                        </template>
                        <span>Go To Site</span>
                    </v-tooltip>
                </v-col>

                <v-col>
                    <v-tooltip>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" to="/"
                                v-bind="props">
                                <v-icon color="grey lighten-1">mdi-information</v-icon> {{ site.domainId }}.sooniq.com/mgr
                            </v-btn>
                        </template>
                        <span>Manage Site</span>
                    </v-tooltip>

                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-divider inset></v-divider>

                    <v-subheader inset>The Sites You Admin</v-subheader>
                    <div>Admin List is not available now.</div>

                </v-col>
            </v-row>

        </v-container>
    </v-container>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import axios from "axios";
import { useSecurityStore } from "@/stores/security";


interface FirmObj {
    domainId: string,
    title: string,
    firmId: string,
    name: string,
    status: string,

}
const securityStore = useSecurityStore();
const isAuthenticated = securityStore.isAuthenticated();

const inload = ref(false);
const success = ref(false);
const ownerFirmList = ref<FirmObj[]>([]);
const adminFirmList = ref<FirmObj[]>([]);
const message = ref("");
const counter = ref(0);


onMounted(() => {
    if (isAuthenticated) {
        inload.value = true;

        const headers = {
            "Authorization": "Bearer " + securityStore.jwt,
            "FID": "J10",
            withCredentials: true
        };

        axios.get(import.meta.env.VITE_API_URL + "/s1/site/my-domain-list", { headers })
            .then(result => {
                // alert("Good: " + JSON.stringify(result));
                success.value = false;
                if (result != null && result.data != null) {
                    if (result.data.statusCode == 200) {
                        ownerFirmList.value = result.data.object.ownerFirmList;
                        adminFirmList.value = result.data.object.adminFirmList;
                        success.value = true;
                    } else {
                        message.value = "Error: " + result.data.statusCode + ". Try later";
                    }
                } else {
                    message.value = "Technical error. Try later";
                }
                inload.value = false;
            })
            .catch(err => {
                if (err) {
                    alert("Error: " + JSON.stringify(err));
                    message.value = "Technical error. Try later";
                    inload.value = false;
                }
            });

    } else {
        // user is not in session, do not load.
        // This page should not show in the first place
    }

}
);

function chooseColor() {
    var color = '';
    if (counter.value % 2 !== 0 ) {
        color = '#e9e9e9'
    } else {
        color = '#f8f8ff'
    }
    return color;
}


</script>

<style scoped>
.container {
    background-color: #fffffc;
}
</style>