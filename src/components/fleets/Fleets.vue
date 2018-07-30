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
                <td>{{ props.item.start }}</td>
                <td class="text-xs-right">{{ props.item.end }}</td>
                <td class="text-xs-right">{{ props.item.truck.plate }}</td>
                <td class="text-xs-right">{{ props.item.driver.name }} {{ props.item.driver.surname }}</td>
                <td class="text-xs-right">{{ props.item.startDate }}</td>
                <td class="text-xs-right">{{ props.item.endDate }}</td>
                <td class="text-xs-right">{{ props.item.company }}</td>
                </template>
            </v-data-table>
            <div class="fleet-btn">
                <h2>Sorting</h2>
                <v-btn color="info" v-model="byTruck" @click="byTruck = !byTruck">By Truck</v-btn>
                <v-select
                    :items="trucks"
                    label="Select truck"
                    v-show="byTruck"
                ></v-select>
                <v-btn color="info">Ongoing</v-btn>
                <v-btn color="info" @click="getFleets">This month</v-btn>
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
    import AuthenticationService from '../../services/AuthenticationService'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                byTruck: false,
                info: false,
                fleets: [],
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
            getFleetToLocal(fleet) {
                this.fleets.unshift(fleet)
                this.convertDate()
            },
            getFleets() {
                AuthenticationService.getFleets()
                    .then(response => {
                        response.data.forEach(el => this.getFleetToLocal(el))
                    })
            },
            convertDate() {
                this.fleets.forEach(el => {
                    el.startDate = el.startDate.substr(0, 10)
                    el.endDate = el.endDate.substr(0, 10)    
                })
            }
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
            this.getFleets()
        },
        computed: {
            fleetsLocal() {
                return this.$store.getters.fleets
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
        width: 75%;
        height: 100%;
    }
</style>
