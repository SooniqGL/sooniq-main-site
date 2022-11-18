<template>
    <v-container fluid class="indigo lighten-5">
        <v-container grid-list-lg>
            <v-layout column>
                <v-flex
                    class="display-2 font-weight-black brown--text text-xs-center my-5"
                    >Select Features for: {{ firmId }}</v-flex
                >
                <v-flex>
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Main Features 
                    </div>
                    <p class="subheading mt-3">
                        This page should showing a loading spinner, at the beginning, using the firmId to find all the 
                        Feature to show/select!
                    </p>
                </v-flex>
                <v-flex>
                    <div class="headline mt-3 brown--text font-weight-bold">
                        Access Rules
                    </div>
                    <p class="subheading mt-3">
                        You are allowed to choose at least 3 characters for the subdomain name.  Maximum length is 30 
                        characters.  Besides the 26 letters, only dash ("-") can be used in the subdomain.  However the 
                        subdomain name should not start or end with a dash. It is not case sessentive.  In other words, 
                        letter case does not matter.  The valid example could be: "fastcuttingphotos", "mostluckypeople", "abc-def", etc. 
                        That means the web access url can be:  fastcuttingphotos.sooniq.com, mostluckypeople.sooniq.com, or abc-def.sooniq.com.
                    </p>


                </v-flex>

                <v-flex>
                    <v-btn color="primary" to="/menu">Save</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
module.exports = {
    props: ['firmId'],
    name: 'HomeDetails'
};
</script>

<style scoped></style>