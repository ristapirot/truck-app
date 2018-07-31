<template>
     <div class="formEmployee">
         <h1>Add new employee</h1>
         <v-form ref="form" v-model="valid" lazy-validation class="addNewEmployee">
            <v-text-field
                v-model="employee.name"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="employee.surname"
                label="Surname"
                required
            ></v-text-field>
            <v-text-field
                v-model="employee.personId"
                label="Person ID"
                required
            ></v-text-field>
            <v-text-field
                v-model="employee.telephone"
                label="Telephone"
                required
            ></v-text-field>
            <v-text-field
                v-model="employee.workplace"
                label="Workplace"
                required
            ></v-text-field>
            <v-switch
                :label="`Driver Card: ${employee.card ? 'Yes' : 'No'}`"
                v-model="employee.card"
            ></v-switch>
            <v-switch
                :label="`Active: ${employee.active ? 'Yes' : 'No'}`"
                v-model="employee.active"
            ></v-switch>
            <br><br>
            <v-btn
                :disabled="!valid"
                @click="addEmployee"
            >
                submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
     </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: true,
                employee: {
                    name: '',
                    surname: '',
                    personId: '',
                    telephone: '',
                    workplace: '',
                    card: false,
                    active: true
                }
            }
        },
        methods: {
            clear() {
                this.employee.name = ''
                this.employee.surname = ''
                this.employee.personId = ''
                this.employee.telephone = ''
                this.employee.workplace = ''
                this.employee.card = false
                this.employee.active = true
            },
            addEmployee() {
                this.$store.dispatch('addEmployee', this.employee)
                this.clear()
            }
        }
    }
</script>


<style>
    .formEmployee {
        margin: 4% auto;
    }

    .addNewEmployee {
        width: 40%;
        margin: 1% auto;
    }

    h1 {
        text-align: center;
    }
</style>

