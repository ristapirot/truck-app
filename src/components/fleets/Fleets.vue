<template>
    <div>
        <Header />
        <div class="fleets">
            <v-data-table
                :headers="headers"
                :items="fleets"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td @click.stop="selectFleet(props.item)">{{ props.item.start }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.end }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.truck.plate }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.driver.name }} {{ props.item.driver.surname }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.startDate }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.endDate }}</td>
                <td class="text-xs-right" @click.stop="selectFleet(props.item)">{{ props.item.company }}</td>
                </template>
            </v-data-table>
            <v-dialog v-model="dialog1" width="800px">
                <v-card>
                    <v-card-title
                    class="grey lighten-4 py-4 title"
                    >
                    Update fleet
                    </v-card-title>
                    <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                            <img
                                src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                alt=""
                            >
                            </v-avatar>
                            <v-select
                            :items="getTrucks.map(truck => {
                                return {text: truck.plate, value: {
                                    plate: truck.plate,
                                    make: truck.make,
                                    model: truck.model,
                                    vin: truck.vin,
                                    date: truck.date
                                }}
                                })"
                            v-model="fleet.truck"
                            label="Trucks"
                            required
                            ></v-select>
                        </v-layout>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field
                            prepend-icon="business"
                            placeholder="Company"
                            v-model="fleet.company"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                        <v-text-field
                            prepend-icon="location_on"
                            placeholder="Start Location"
                            v-model="fleet.start"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                        <v-text-field
                            prepend-icon="location_off"
                            placeholder="End Location"
                            v-model="fleet.end"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                        <v-menu
                            ref="date1"
                            :close-on-content-click="false"
                            v-model="date1"
                            :nudge-right="40"
                            :return-value.sync="fleet.startDate"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="fleet.startDate"
                            label="Start Date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="fleet.startDate" @input="$refs.date1.save(fleet.startDate)"></v-date-picker>

                        </v-menu>
                        </v-flex>
                        <v-flex xs5>
                        <v-menu
                            ref="date2"
                            :close-on-content-click="false"
                            v-model="date2"
                            :nudge-right="40"
                            :return-value.sync="fleet.endDate"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                            :disabled="isOngoing"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="fleet.endDate"
                            label="End Date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="fleet.endDate" @input="$refs.date2.save(fleet.endDate)"></v-date-picker>
                            
                        </v-menu>
                        </v-flex>
                        <v-flex xs2>
                        <v-checkbox
                            :label="`Ongoing?`"
                            v-model="isOngoing"
                        ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                            <img
                                src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                alt=""
                            >
                            </v-avatar>
                            <v-select
                            :items="getDrivers.filter(driv => driv.workplace == 'Driver').map(driv => {
                                return {text: driv.name + ' ' + driv.surname, value: {
                                name: driv.name,
                                surname: driv.surname,
                                personId: driv.personId,
                                telephone: driv.telephone,
                                card: driv.card,
                                active: driv.active
                                }}  
                            })"
                            label="Select driver"
                            v-model="fleet.driver"
                            required
                            ></v-select>
                        </v-layout>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="error" @click="deleteFleet">Delete</v-btn>
                    <v-btn flat color="primary" @click="dialog1 = false">Cancel</v-btn>
                    <v-btn flat @click="updateFleet">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            <div class="fleet-btn">
                <h2>Sorting</h2>
                <v-btn color="info" v-model="byTruck" @click="byTruck = !byTruck">By Truck</v-btn>
                <v-select
                    :items="trucks"
                    label="Select truck"
                    v-show="byTruck"
                ></v-select>
                <v-btn color="info">Ongoing</v-btn>
                <v-btn color="info">This month</v-btn>
                <v-btn color="info" @click.stop="info = !info">Info</v-btn>
                <v-dialog v-model="info" width="800px">
                    <v-card>
                        <v-card-title
                        class="grey lighten-4 py-4 title"
                        >
                        Info
                        </v-card-title>
                        <v-container grid-list-sm class="pa-4">
                        <v-layout row wrap>
                            <v-flex xs6 align-center justify-space-between>
                                <v-layout align-center>
                                    <v-card-text>
                                        <h2>Number of fleets: 28</h2>
                                    </v-card-text>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6 align-center justify-space-between>
                                <v-layout align-center>
                                    <v-card-text>
                                        <h2>Number of fleets this month: 2</h2>
                                    </v-card-text>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6 align-center justify-space-between>
                                <v-layout align-center>
                                    <v-card-text>
                                        <h2>Number of previous month: 4</h2>
                                    </v-card-text>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="info = false">Cancel</v-btn>
                        <v-btn flat @click="info = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </div>
            </div>
        <ButtonAdd />
    </div>  
    
</template>

<script>
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                byTruck: false,
                info: false,
                dialog1: false,
                dialog: false,
                isOngoing: false,
                date1: false,
                date2: false,
                fleetId: '',
                fleet: {
                    start: '',
                    end: '',
                    truck: {},
                    driver: {},
                    startDate: null,
                    endDate: '',
                    company: ''
                },
                headers: [
                    {
                        text: 'Start',
                        align: 'left',
                        sortable: true,
                        value: 'start'
                    },
                    { text: 'End', align: 'left', value: 'end' },
                    { text: 'Truck', align: 'left', value: 'truck' },
                    { text: 'Driver', align: 'left', value: 'driver' },
                    { text: 'Start Date', align: 'left', value: 'startDate' },
                    { text: 'End Date', align: 'left', value: 'endDate' },
                    { text: 'Company', align: 'left', value: 'company' }
                ],
                trucks: [
                    'PI 023-RD'
                ]
            }
        },
        methods: {
             selectFleet(fleet) {
                this.fleetId = fleet._id
                this.fleet.start = fleet.start
                this.fleet.end = fleet.end
                this.fleet.truck = fleet.truck
                this.fleet.driver = fleet.driver
                this.fleet.startDate = fleet.startDate
                this.fleet.endDate = fleet.endDate
                this.fleet.company = fleet.company
                this.dialog1 = !this.dialog1              
            },
            clearFleet() {
                this.fleet.start = '',
                this.fleet.end = '',
                this.fleet.truck = {},
                this.fleet.driver = {},
                this.fleet.startDate = null,
                this.fleet.endDate = '',
                this.fleet.company = ''
            },
            updateFleet() {
                if (this.isOngoing) {
                    this.fleet.endDate = 'Ongoing'
                }
                this.$store.dispatch('updateFleets', this.fleet)
                this.dialog1 = false
                this.clearFleet()
            },
            deleteFleet() {
                this.$store.dispatch('deleteFleets', this.fleet)
                this.dialog1 = false
            }
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
        },
        computed: {
            fleets() {
                return this.$store.getters.fleets
            },
            getTrucks() {
                return this.$store.getters.trucks
            },
            getDrivers() {
                return this.$store.getters.employees
            }
        },
        components: {
            Header,
            ButtonAdd
        }
    }
</script>



<style scoped>
    .fleets {
        padding: 2%;
        display: flex;
        justify-content: space-between
    }

    h2 {
        text-align: center;
        margin: 2% auto;
    }

    .fleet-btn {
        display: flex;
        flex-direction: column;
        width: 15%;
   }

    .elevation-1 {
        width: 80%;
        height: 100%;
    }
</style>
