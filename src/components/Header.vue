<template>
   <div>
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
            <a href="https://gps.skywatch.bg/login/start" target="_blank">
            <v-icon>location_on</v-icon>
            </a>
        </v-btn>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large @click="logout">
            <v-avatar size="32px" tile>
            <img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
            >
            </v-avatar>
        </v-btn>
        </v-toolbar>
   </div>
</template>

<script>
import Home from './Home.vue'

  export default {
    data: () => ({
      
      drawer: null,
      
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
        { icon: 'content_copy', text: 'Invoices', link: '/invoices' },
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
    methods: {
      
      logout() {
        localStorage.removeItem('isLogged')
        this.$router.push({name:'Login'})
      }
    }
  }
</script>

