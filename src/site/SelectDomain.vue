<template>
    <v-container fill-height fluid class="indigo lighten-5">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Select Subdomain</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text v-if="joinButtonShow">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                prepend-icon="email"
                                name="subdomain"
                                label="Subdomain"
                                type="text"
                                v-model="subdomain"
                                :rules="subdomainRules"
                                data-cy="joinSubdomainField"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-flag"
                                name="title"
                                label="Site Title"
                                type="text"
                                required
                                v-model="title"
                                :rules="titleRules"
                                data-cy="joinTitleField"
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-flag"
                                name="name"
                                label="Business Name"
                                type="text"
                                required
                                v-model="name"
                                :rules="nameRules"
                                data-cy="joinNameField"
                            >
                            </v-text-field>
           
                        </v-form>
                    </v-card-text>
                    <v-card-text v-if="!joinButtonShow">
                        <span>You have successfully registered with us.  We have sent you an email to verify
                            your email address.  Please click the link in the email to confirm your email.
                            Once you confirm, your account will be ative.  Only when it is active, you can login.
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-toolbar-title v-show="joinLabelShow">
                            <span>{{ joinLabelText }}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-if="joinButtonShow"
                            color="primary"
                            :disabled="!valid || !joinButtonEnabled"
                            @click="submit"
                            data-cy="joinSubmitBtn"
                            >Join</v-btn
                        >
                        <v-btn
                            v-if="!joinButtonShow"
                            color="primary"
                            @click="goLogin"
                            data-cy="joinLoginBtn"
                            >Login</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
module.exports = {
    name: 'Join',
    data() {
        return {
            valid: false,
            subdomain: '',
            title: '',
            name: '',
            subdomainRules: [
                v => !!v || 'Subdomain is required',
                v => (!v.startsWith("-") && !v.endsWith("-")) || 'Subdomain cannot start with or end with a dash',
                v => (v.length >= 3 && v.length <= 30) || 'Subdomain should have at least 3, no more than 30 characters',
               v => /^[a-zA-Z0-9\-]*$/.test(v) || 'Only letters, digits, and dash are allowed only'
            ],
            titleRules: [
                v => !!v || 'Title is required',
                v => v.length <= 10 || 'Title should not be longer than 255 characters',
                v => /^[a-zA-Z0-9 \\-]*$/.test(v) || 'Title must be letters, digits, dash and space only'
            ],
            nameRules: [
                v => !!v || 'Business Name is required',
                v => v.length <= 10 || 'Business Name should not be longer than 255 characters',
                v => /^[a-zA-Z0-9 ]*$/.test(v) || 'Business must be letters, digits, dash and space only'
            ]
        };
    },
    methods: {
        submit() {
            alert("here submit ...");
            if (this.$refs.form.validate()) {
                var joinState = {
                        joinButtonEnabled: false,
                        joinButtonShow: true,
                        joinLabelShow: true,
                        joinLabelText: 'Going to register ... '
                       };
                this.$store.dispatch('setJoinState', joinState);
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password,
                    cellphone: this.cellphone,
                    fname: this.fname,
                    mname: this.mname,
                    lname: this.lname
                });
            } 
        },
        goLogin() {
            // this.$store.dispatch('userLogin', false);
            router.push('/sign-in');
        }
    },
    computed: { 
        joinButtonEnabled : function() {
            return this.$store.getters.getJoinState.joinButtonEnabled;
        },
        joinButtonShow : function() {
            return this.$store.getters.getJoinState.joinButtonShow;
        },
        joinLabelShow : function() {
            return this.$store.getters.getJoinState.joinLabelShow;
        },
        joinLabelText : function() {
            return this.$store.getters.getJoinState.joinLabelText;
        }
    }
};
</script>

<style scoped>
    .back {
        background: url('../../img/snow2.jpg') no-repeat center center fixed
            !important;
        background-size: cover;
    }
</style>