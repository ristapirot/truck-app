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
                    <td @click.stop="selectInvoice(props.item)">{{ props.item.number }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.cmr }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.price }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.date }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.fleet.start }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.fleet.end }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.fleet.truck }}</td>
                    <td class="text-xs-right" @click.stop="selectInvoice(props.item)">{{ props.item.fleet.company }}</td>
                </template>
            </v-data-table>
            <v-dialog v-model="dialog" width="800px">
                <v-card>
                    <v-card-title
                    class="grey lighten-4 py-4 title"
                    >
                    Update invoice
                    </v-card-title>
                    <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                            placeholder="Invoice No"
                            v-model="invoice.number"
                            :disabled="true"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field
                            prepend-icon="assignment"
                            placeholder="CMR No"
                            v-model="invoice.cmr"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field
                            prepend-icon="euro_symbol"
                            placeholder="Price"
                            v-model="invoice.price"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-menu
                            ref="date1"
                            :close-on-content-click="false"
                            v-model="date1"
                            :nudge-right="40"
                            :return-value.sync="invoice.date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="invoice.date"
                            label="Date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="invoice.date" @input="$refs.date1.save(invoice.date)"></v-date-picker>

                        </v-menu>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="printInvoice">Print</v-btn>
                    <v-btn flat color="error" @click="deleteInvoice">Delete</v-btn>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat @click="updateInvoice">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            <div class="invoiceTools">
                <AddNewInvoice />
                <v-card class="w-40">
                    <v-card-title><h2>Invoice Infos</h2></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                        <v-list-tile-content class="text-medium">Total income:</v-list-tile-content>
                        <v-list-tile-content class="align-end text-medium">
                            <div class="text-xs-center">
                            <v-chip color="lime" class="text-medium">{{ totalIncome }}</v-chip>
                            </div></v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                        <v-list-tile-content class="text-medium">Total invoices:</v-list-tile-content>
                        <v-list-tile-content class="align-end text-medium">
                            <div class="text-xs-center">
                            <v-chip class="text-medium">{{ totalInvoices }}</v-chip>
                            </div>
                        </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>
        </div>
        <ButtonAdd />
    </div>
    
</template>

<script>
    import AddNewInvoice from './AddNewInvoice.vue'
    import Header from '../Header.vue'
    import ButtonAdd from '../ButtonAdd.vue'

    export default {
        data() {
            return {
                dialog: false,
                date1: false,
                invoiceId: '',
                invoice: {
                    number: '',
                    cmr: '',
                    price: '',
                    date: null,
                    fleet: {}
                },
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
        mounted() {
            if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
                this.$router.push({name: 'Login'})
            }
        },
        methods: {
            selectInvoice(invoice) {
                this.invoice.number = invoice.number
                this.invoice.cmr = invoice.cmr
                this.invoice.price = invoice.price
                this.invoice.date = invoice.date
                this.invoice.fleet = invoice.fleet
                this.dialog = !this.dialog              
            },
            deleteInvoice() {
                this.$store.dispatch('deleteInvoices', this.invoice)
                this.dialog = false
            },
            updateInvoice() {
                this.$store.dispatch('updateInvoices', this.invoice)
                this.dialog = false
            },
            printInvoice() {
                alert('Not available yet!')
            }
        },
        computed: {
            invoices() {
                return this.$store.getters.invoices
            },
            totalIncome() {
                let sum = 0
                this.invoices.forEach(el => sum += el.price)
                return sum
            },
            totalInvoices() {
                let sum = 0
                this.invoices.forEach(el => sum++)
                return sum
            }
        },
        components: {
            AddNewInvoice,
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
        margin: 0 auto;
    }

    .invoiceTools {
        padding: 2%;
        display: flex;
        justify-content: space-around
    }

    .elevation-1 {
        width: 100%;
    }

    .w-40 {
        width: 40%;
        height: 100%;
    }

    .text-medium {
        font-size: 20px;
    }
</style>




