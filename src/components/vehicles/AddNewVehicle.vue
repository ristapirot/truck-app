<template>
     <v-form ref="form" v-model="valid" lazy-validation class="addNew">
        <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Licence plate"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Make"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Model"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="VIN"
            required
        ></v-text-field>
        <v-date-picker v-model="picker" label="Registration date" :landscape="landscape" :reactive="reactive"></v-date-picker>
        <br><br>
        <v-btn
            :disabled="!valid"
            @click="submit"
        >
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<style>
    .addNew {
        width: 60%;
        margin: 5% auto;
    }
</style>

