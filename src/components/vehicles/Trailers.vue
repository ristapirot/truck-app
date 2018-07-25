<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="trailers"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td>{{ props.item.plate }}</td>
            <td class="text-xs-left">{{ props.item.make }}</td>
            <td class="text-xs-left">{{ props.item.model }}</td>
            <td class="text-xs-left">{{ props.item.vin }}</td>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.iron }}</td>
            </template>
        </v-data-table>
        <AddNewVehicle />
    </div>
</template>

<script>
    import AddNewVehicle from './AddNewTrailer.vue'

    export default {
        data() {
            return {
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
        components: {
            AddNewVehicle
        },
        computed: {
            trailers() {
                return this.$store.getters.trailers
            }
        }
    }
</script>

