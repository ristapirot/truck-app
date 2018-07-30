<template>
    <div>
        <Header />
        <div class="invoices">
            <v-data-table
                :headers="headers"
                :items="invoices"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.number }}</td>
                    <td class="text-xs-right">{{ props.item.cmr }}</td>
                    <td class="text-xs-right">{{ props.item.price }}</td>
                    <td class="text-xs-right">{{ props.item.date }}</td>
                    <td class="text-xs-right">{{ props.item.fleet.start }}</td>
                    <td class="text-xs-right">{{ props.item.fleet.end }}</td>
                    <td class="text-xs-right">{{ props.item.fleet.truck.plate }}</td>
                    <td class="text-xs-right">{{ props.item.fleet.company }}</td>
                </template>
            </v-data-table>
            <add-new-invoice></add-new-invoice>
        </div>
        <ButtonAdd />
    </div>
    
</template>

<script>
    import AddNewInvoice from './AddNewInvoice.vue'
    import AuthenticationService from '../../services/AuthenticationService'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                invoices: [],
                headers: [
                    {
                        text: 'Invoice No',
                        align: 'left',
                        sortable: true,
                        value: 'number'
                    },
                    { text: 'CMR No', align: 'left', value: 'cmr' },
                    { text: 'Price', align: 'left', value: 'price' },
                    { text: 'Date', align: 'left', value: 'date' },
                    { text: 'Start Location', align: 'left', value: 'start' },
                    { text: 'End Location', align: 'left', value: 'end' },
                    { text: 'Truck', align: 'left', value: 'truck' },
                    { text: 'Company', align: 'left', value: 'company' }
                ],
            }
        },
        components: {
            AddNewInvoice
        },
        methods: {
            getInvoiceToLocal(invoice) {
                this.invoices.push(invoice)
                this.convertDate()
            }, 
            getInvoices() {
                AuthenticationService.getInvoices()
                    .then(response => {
                        response.data.forEach(el => this.getInvoiceToLocal(el))
                    })
            },
            convertDate() {
                this.invoices.forEach(el => {
                    el.date = el.date.substr(0, 10)
                })
            }
        },
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
            this.getInvoices()
        },
        computed: {
            invoicesLocal() {
                return this.$store.getters.invoices
            }
        },
        components: {
            Header,
            ButtonAdd
        }
    }
</script>


<style scoped>
    .invoices {
        padding: 2%;
        display: flex;
        flex-direction: column;
    }

    .elevation-1 {
            width: 100%;
        }
</style>




