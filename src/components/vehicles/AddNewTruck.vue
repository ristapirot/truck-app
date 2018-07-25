<template>
     <div class="formTruck">
         <h1>Add new truck</h1>
         <v-form ref="form" v-model="valid" lazy-validation class="addNew">
            <v-text-field
                v-model="truck.plate"
                label="Licence plate"
                required
            ></v-text-field>
            <v-text-field
                v-model="truck.make"
                label="Make"
                required
            ></v-text-field>
            <v-text-field
                v-model="truck.model"
                label="Model"
                required
            ></v-text-field>
            <v-text-field
                v-model="truck.vin"
                label="VIN"
                required
            ></v-text-field>
            <v-date-picker v-model="truck.date" full-width :landscape="landscape" label="Registration date"></v-date-picker>
            <br><br>
            <v-btn
                :disabled="!valid"
                @click="addTruck"
            >
                submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
     </div>
</template>

<script>
    export default {
        data() {
            return {
                landscape: true,
                truck: {
                    plate: '',
                    make: '',
                    model: '',
                    vin: '',
                    date: ''
                }
            }
        },
        methods: {
            clear() {
                this.truck.plate = ''
                this.truck.make = '' 
                this.truck.model = ''
                this.truck.vin = ''
                this.truck.date = ''
            },
            addTruck() {
                this.$store.dispatch('addTruck', this.truck)
                this.clear()
            }
        }
    }
</script>


<style>
    .formTruck {
        margin: 4% auto;
    }

    h1 {
        text-align: center;
    }

    .addNew {
        width: 40%;
        margin: 1% auto;
    }
</style>

