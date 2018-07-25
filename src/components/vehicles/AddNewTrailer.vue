<template>
     <div class="formTrailer">
         <h1>Add new trailer</h1>
         <v-form ref="form" v-model="valid" lazy-validation class="addNew">
            <v-text-field
                v-model="trailer.plate"
                label="Licence plate"
                required
            ></v-text-field>
            <v-text-field
                v-model="trailer.make"
                label="Make"
                required
            ></v-text-field>
            <v-text-field
                v-model="trailer.model"
                label="Model"
                required
            ></v-text-field>
            <v-text-field
                v-model="trailer.vin"
                label="VIN"
                required
            ></v-text-field>
            <v-date-picker v-model="trailer.date" full-width :landscape="landscape" label="Registration date"></v-date-picker>
            <br><br>
            <v-btn
                :disabled="!valid"
                @click="addTrailer"
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
                trailer: {
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
                this.trailer.plate = ''
                this.trailer.make = '' 
                this.trailer.model = ''
                this.trailer.vin = ''
                this.trailer.date = ''
            },
            addTrailer() {
                this.$store.dispatch('addTrailer', this.trailer)
                this.clear()
            }
        }
    }
</script>


<style> 
    .formTrailer {
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

