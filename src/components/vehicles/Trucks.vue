<template>
    <v-data-table
    :headers="headers"
    :items="desserts"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'Number Plate',
                        align: 'left',
                        sortable: false,
                        value: 'plate'
                    },
                    { text: 'Make', value: 'make' },
                    { text: 'Model', value: 'model' },
                    { text: 'VIN', value: 'vin' },
                    { text: 'Registration Date', value: 'date' }
                ],
            }
        }
    }
</script>

