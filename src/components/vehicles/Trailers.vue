<template>
    <div>
        <Header />
        <v-data-table
            :headers="headers"
            :items="trailerList"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td @click.stop="selectTrailer(props.item)">{{ props.item.plate }}</td>
            <td class="text-xs-left" @click.stop="selectTrailer(props.item)">{{ props.item.make }}</td>
            <td class="text-xs-left" @click.stop="selectTrailer(props.item)">{{ props.item.model }}</td>
            <td class="text-xs-left" @click.stop="selectTrailer(props.item)">{{ props.item.vin }}</td>
            <td class="text-xs-left" @click.stop="selectTrailer(props.item)">{{ props.item.date }}</td>
            <td class="text-xs-left" @click.stop="selectTrailer(props.item)">{{ props.item.iron }}</td>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title
                class="grey lighten-4 py-4 title"
                >
                Edit your truck
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    
                    <v-flex xs12>
                    <v-text-field
                        prepend-icon="business"
                        placeholder="Licence plate"
                        v-model="trailer.plate"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_on"
                        placeholder="Make"
                        v-model="trailer.make"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="Model"
                        v-model="trailer.model"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="VIN"
                        v-model="trailer.vin"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-date-picker v-model="trailer.date" full-width :landscape="landscape" label="Registration date"></v-date-picker>
                    </v-flex>
                </v-layout>
                </v-container>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="deleteTrailer">Delete</v-btn>
                <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                <v-btn flat @click="addTrailer">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <AddNewVehicle />
        <ButtonAdd />
    </div>
</template>

<script>
    import AddNewVehicle from './AddNewTrailer.vue'
    import AuthenticationService from '../../services/AuthenticationService'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                dialog: false,
                landscape: false,
                trailerList: [],
                trailer: {
                    plate: '',
                    make: '',
                    model: '',
                    vin: '',
                    date: null
                },
                headers: [
                    {
                        text: 'Number Plate',
                        align: 'left',
                        sortable: true,
                        value: 'plate'
                    },
                    { text: 'Make', value: 'make' },
                    { text: 'Model', value: 'model' },
                    { text: 'VIN', value: 'vin' },
                    { text: 'Registration Date', value: 'date' }
                ]
            }
        },
        methods: {
            selectTrailer(trailer) {
                this.trailer.plate = trailer.plate
                this.trailer.make = trailer.make
                this.trailer.model = trailer.model
                this.trailer.vin = trailer.vin
                this.trailer.date = trailer.date
                console.log(this.trailer)
                this.dialog = !this.dialog                
            },
            addTrailer() {
                this.$store.dispatch('addTrailer', this.trailer)
                this.dialog = false;
            },
            deleteTrailer() {
                this.$store.dispatch('deleteTrailer', this.trailer)
                this.dialog = false;
            },
            getTrailerToLocal(truck) {
                this.trailerList.push(truck)
                this.convertDate()
            },
            getTrailers() {
                AuthenticationService.getTrailers()
                    .then(response => {
                        response.data.forEach(el => this.getTrailerToLocal(el))
                    })
                    .catch(err => {
                        this.$router.push({name: 'Login'})
                    })
            },
            convertDate() {
                this.trailerList.forEach(el => el.date = el.date.substr(0, 10))
            }
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
            this.getTrailers()
        },
        components: {
            AddNewVehicle,
            Header,
            ButtonAdd
        },
        computed: {
            trailers() {
                return this.$store.getters.trailers
            }
        }
    }
</script>

