<template>
    <div>
        <Header />
        <v-data-table
            :headers="headers"
            :items="trucks"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props" >
                <td @click.stop="selectTruck(props.item)">{{ props.item.plate }}</td>
                <td class="text-xs-left" @click.stop="selectTruck(props.item)">{{ props.item.make }}</td>
                <td class="text-xs-left" @click.stop="selectTruck(props.item)">{{ props.item.model }}</td>
                <td class="text-xs-left" @click.stop="selectTruck(props.item)">{{ props.item.vin }}</td>
                <td class="text-xs-left" @click.stop="selectTruck(props.item)">{{ props.item.date }}</td>
                <td class="text-xs-left" @click.stop="selectTruck(props.item)">{{ props.item.iron }}</td>
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
                        v-model="truck.plate"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_on"
                        placeholder="Make"
                        v-model="truck.make"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="Model"
                        v-model="truck.model"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="VIN"
                        v-model="truck.vin"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-date-picker v-model="truck.date" full-width :landscape="landscape" label="Registration date"></v-date-picker>
                    </v-flex>
                </v-layout>
                </v-container>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="deleteTruck">Delete</v-btn>
                <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                <v-btn flat @click="addTruck">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <AddNewVehicle />
        <ButtonAdd />
    </div>
</template>

<script>
    import AddNewVehicle from './AddNewTruck.vue'
    import AuthenticationService from '../../services/AuthenticationService'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                dialog: false,
                landscape: false,
                truck: {
                    plate: '',
                    make: '',
                    model: '',
                    vin: '',
                    date: null
                },
                truckList: [],
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
            selectTruck(truck) {
                this.truck.plate = truck.plate
                this.truck.make = truck.make
                this.truck.model = truck.model
                this.truck.vin = truck.vin
                this.truck.date = truck.date
                console.log(this.truck)
                this.dialog = !this.dialog                
            },
            addTruck() {
                this.$store.dispatch('addTruck', this.truck)
                this.dialog = false;
            },
            deleteTruck() {
                this.$store.dispatch('deleteTruck', this.truck)
                this.dialog = false;
            },
            getTruckToLocal(truck) {
                this.truckList.push(truck)
                this.convertDate()
            },
            getTrucks() {
                AuthenticationService.getTrucks()
                    .then(response => {
                        response.data.forEach(el => this.getTruckToLocal(el))
                    })
                    .catch(err => {
                        this.$router.push({name: 'Login'})
                    })
            },
            convertDate() {
                this.truckList.forEach(el => el.date = el.date.substr(0, 10))
            }
        },
        components: {
            AddNewVehicle,
            Header,
            ButtonAdd
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
            this.getTrucks()
        },
        computed: {
            trucks() {
                return this.$store.getters.trucks
            }
        }
    }
</script>

