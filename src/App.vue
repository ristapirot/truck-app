<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile :to="item.link" v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Truck App</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
        <router-view></router-view>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
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
                      return truck.plate
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
                  :items="getDrivers"
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
  </v-app>
</template>

<script>
  import Home from './components/Home.vue'

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      isOngoing: false,
      date1: false,
      date2: false,
      fleet: {
        start: '',
        end: '',
        truck: '',
        driver: '',
        startDate: null,
        endDate: null,
        company: ''
      },
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Vehicles',
          model: false,
          children: [
            { text: 'Trucks', icon: 'local_shipping', link: '/trucks'  },
            { text: 'Trailers', icon: 'commute', link: '/trailers'  }
          ]
        },
        { icon: 'contacts', text: 'Employees', link: '/employees' },
        { icon: 'add_location', text: 'Fleets', link: '/fleets' },
        { icon: 'content_copy', text: 'Invoices', link: 'Invoices' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' }
      ]
    }),
    components: {
      Home
    },
    created() {
      this.$store.dispatch('initTrucks')
      this.$store.dispatch('initTrailers')
      this.$store.dispatch('initEmployees')
      this.$store.dispatch('initFleets')
    },
    methods: {
      clearFleet() {
        this.fleet.start = '',
        this.fleet.end = '',
        this.fleet.truck = '',
        this.fleet.driver = '',
        this.fleet.startDate = '',
        this.fleet.endDate = '',
        this.fleet.company = ''
      },
      addFleet() {
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
        return this.$store.getters.employees.map(emp => {
          if (emp.workplace == 'Driver') return emp.name + ' ' + emp.surname
        })
      }
    }
  }
</script>

<style scoped>

</style>