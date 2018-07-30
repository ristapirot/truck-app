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
            fleet: {
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
        this.fleet.start = '',
        this.fleet.end = '',
        this.fleet.truck = {},
        this.fleet.driver = {},
        this.fleet.startDate = null,
        this.fleet.endDate = '',
        this.fleet.company = ''
      },
      addFleet() {
        if (this.isOngoing) {
          this.fleet.endDate = 'Ongoing'
        }
        this.$store.dispatch('addFleets', this.fleet)
        this.dialog = false
        this.clearFleet()
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

