<template>
    <v-container fill-height fluid class="back">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="third">
                        <v-toolbar-title>Registration Confirmed</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <span>You have successfully registered with us.  We have sent you an email to verify
                            your email address.  Please click the link in the email to confirm your email.
                            Once you confirm, your account will be ative.  Only when it is active, you can login.
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            to="/login"
                            data-cy="joinLoginBtn"
                            >Login</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .back {
        background: url('../../img/snow2.jpg') no-repeat center center fixed
            !important;
        background-size: cover;
    }
</style>