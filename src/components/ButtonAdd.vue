<template>
    <div>
        <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
      class="btn-newFleet"
    >
      <v-icon>add</v-icon>
    </v-btn>
        <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title
            class="grey lighten-4 py-4 title"
            >
            Create fleet
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
                        return {text: truck.plate, value: truck._id}
                        })"
                    v-model="fleetAdd.truck"
                    label="Trucks"
                    required
                    ></v-select>
                </v-layout>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    prepend-icon="business"
                    placeholder="Company"
                    v-model="fleetAdd.company"
                ></v-text-field>
                </v-flex>
                <v-flex xs6>
                <v-text-field
                    prepend-icon="location_on"
                    placeholder="Start Location"
                    v-model="fleetAdd.start"
                ></v-text-field>
                </v-flex>
                <v-flex xs6>
                <v-text-field
                    prepend-icon="location_off"
                    placeholder="End Location"
                    v-model="fleetAdd.end"
                ></v-text-field>
                </v-flex>
                <v-flex xs5>
                <v-menu
                    ref="date1"
                    :close-on-content-click="false"
                    v-model="date1"
                    :nudge-right="40"
                    :return-value.sync="fleetAdd.startDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <v-text-field
                    slot="activator"
                    v-model="fleetAdd.startDate"
                    label="Start Date"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="fleetAdd.startDate" @input="$refs.date1.save(fleetAdd.startDate)"></v-date-picker>

                </v-menu>
                </v-flex>
                <v-flex xs5>
                <v-menu
                    ref="date2"
                    :close-on-content-click="false"
                    v-model="date2"
                    :nudge-right="40"
                    :return-value.sync="fleetAdd.endDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                    :disabled="isOngoing"
                >
                    <v-text-field
                    slot="activator"
                    v-model="fleetAdd.endDate"
                    label="End Date"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="fleetAdd.endDate" @input="$refs.date2.save(fleetAdd.endDate)"></v-date-picker>
                    
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
                        return {text: driv.name + ' ' + driv.surname, value: driv._id}  
                    })"
                    label="Select driver"
                    v-model="fleetAdd.driver"
                    required
                    ></v-select>
                </v-layout>
                </v-flex>
            </v-layout>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="addFleet">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            isOngoing: false,
            date1: false,
            date2: false,
            fleetAdd: {
                start: '',
                end: '',
                truck: {},
                driver: {},
                startDate: null,
                endDate: '',
                company: ''
            },
        }
    },
    methods: {
        clearFleet() {
        this.fleetAdd.start = '',
        this.fleetAdd.end = '',
        this.fleetAdd.truck = null,
        this.fleetAdd.driver = null,
        this.fleetAdd.startDate = null,
        this.fleetAdd.endDate = '',
        this.fleetAdd.company = ''
      },
      addFleet() {
        if (this.isOngoing) {
          this.fleetAdd.endDate = 'Ongoing'
        }
        console.log(this.fleetAdd)
        this.$store.dispatch('addFleets', this.fleetAdd)
        this.dialog = false
        //this.clearFleet()
      }
    },
    computed: {
      getTrucks() {
        return this.$store.getters.trucks
      },
      getDrivers() {
        return this.$store.getters.employees
      }
    }
}
</script>

