<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="employees"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.surname }}</td>
            <td class="text-xs-left">{{ props.item.personId }}</td>
            <td class="text-xs-left">{{ props.item.telephone }}</td>
            <td class="text-xs-left">{{ props.item.workplace }}</td>
            <td class="text-xs-left">{{ props.item.card ? 'Yes' : 'No' }}</td>
            <td class="text-xs-left">{{ props.item.active ? 'Yes' : 'No' }}</td>
            </template>
        </v-data-table>
        <AddNewEmployee />
    </div>
</template>

<script>
    import AddNewEmployee from './AddNewEmployee.vue'

    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    { text: 'Surname', value: 'surname' },
                    { text: 'Person ID', value: 'personId' },
                    { text: 'Telephone', value: 'telephone' },
                    { text: 'Workplace', value: 'workplace' },
                    { text: 'Driver Card', value: 'card' },
                    { text: 'Active', value: 'active' }
                ]
            }
        },
        components: {
            AddNewEmployee
        },
        computed: {
            employees() {
                return this.$store.getters.employees
            }
        }
    }
</script>

