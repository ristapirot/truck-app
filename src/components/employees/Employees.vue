<template>
    <div>
        <Header />
        <v-data-table
            :headers="headers"
            :items="employees"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td @click.stop="selectEmployee(props.item)">{{ props.item.name }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.surname }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.personId }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.telephone }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.workplace }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.card ? 'Yes' : 'No' }}</td>
            <td class="text-xs-left" @click.stop="selectEmployee(props.item)">{{ props.item.active ? 'Yes' : 'No' }}</td>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title
                class="grey lighten-4 py-4 title"
                >
                Edit employee
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    
                    <v-flex xs12>
                    <v-text-field
                        prepend-icon="business"
                        placeholder="Name"
                        v-model="employee.name"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_on"
                        placeholder="Surname"
                        v-model="employee.surname"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="Person ID"
                        v-model="employee.personId"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="Telephone"
                        v-model="employee.telephone"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-text-field
                        prepend-icon="location_off"
                        placeholder="Workplace"
                        v-model="employee.workplace"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                    <v-switch
                        :label="`Driver Card: ${employee.card ? 'Yes' : 'No'}`"
                        v-model="employee.card"
                    ></v-switch>
                    </v-flex>
                    <v-flex xs6>
                    <v-switch
                        :label="`Active: ${employee.active ? 'Yes' : 'No'}`"
                        v-model="employee.active"
                    ></v-switch>
                    </v-flex>
                </v-layout>
                </v-container>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="deleteEmployee">Delete</v-btn>
                <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                <v-btn flat @click="addEmployee">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <AddNewEmployee />
        <ButtonAdd />
    </div>
</template>

<script>
    import AddNewEmployee from './AddNewEmployee.vue'
    import AuthenticationService from '../../services/AuthenticationService'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                dialog: false,
                landscape: false,
                employee: {
                    name: '',
                    surname: '',
                    personId: '',
                    telephone: '',
                    workplace: '',
                    card: false,
                    active: true,
                },
                employees: [],
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
        methods: {
            selectEmployee(employee) {
                this.employee.name = employee.name
                this.employee.surname = employee.surname
                this.employee.personId = employee.personId
                this.employee.telephone = employee.telephone
                this.employee.workplace = employee.workplace
                this.employee.card = employee.card,
                this.employee.active = employee.active
                this.dialog = !this.dialog                
            },
            addEmployee() {
                this.$store.dispatch('addEmployee', this.employee)
                this.dialog = false;
            },
            deleteEmployee() {
                this.$store.dispatch('deleteEmployee', this.employee)
                this.dialog = false;
            },
            getEmployeeToLocal(emp) {
                this.employees.push(emp)
            },
            getEmployees() {
                AuthenticationService.getEmployees()
                    .then(response => {
                        response.data.forEach(el => this.getEmployeeToLocal(el))
                    })
            }
        },
        components: {
            AddNewEmployee,
            Header,
            ButtonAdd
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
            this.getEmployees()
        },
        computed: {
            employeesLocal() {
                return this.$store.getters.employees
            }
        }
    }
</script>

