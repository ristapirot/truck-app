<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="trucks"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td>{{ props.item.plate }}</td>
            <td class="text-xs-right">{{ props.item.make }}</td>
            <td class="text-xs-right">{{ props.item.model }}</td>
            <td class="text-xs-right">{{ props.item.vin }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
        </v-data-table>
        <AddNewVehicle />
    </div>
</template>

<script>
    import AddNewVehicle from './AddNewVehicle.vue'

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
                ],
                trucks: [
                    {
                        plate: 'AA-151 PI',
                        make: 'Schmitz',
                        model: 'S 02',
                        vin: 'XLER2X4000',
                        date: '18.07.2016'
                    } 
                ]
            }
        },
        components: {
            AddNewVehicle
        }
    }
</script>

