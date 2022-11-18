<template>
    <v-container fill-height fluid class="back">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="third">
                        <v-toolbar-title>Reset Password Done</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <span>You have reset your password successfully.  Welcome to Sooniq.  You may login.
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="button"
                            to="/login"
                            variant="elevated"
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