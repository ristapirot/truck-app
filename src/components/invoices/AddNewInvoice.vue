<template>
     <div class="formInvoice">
         <h1>Add new invoice</h1>
         <v-form ref="form" lazy-validation class="addNewInvoice">
            <v-text-field
                v-model="invoice.number"
                label="Invoice No"
                required
            ></v-text-field>
            <v-text-field
                v-model="invoice.cmr"
                label="CMR No"
                required
            ></v-text-field>
            <v-text-field
                v-model="invoice.price"
                label="Price"
                required
                prepend-icon="euro_symbol"
            ></v-text-field>
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
            <v-flex class="fleets-select" xs12 sm12 d-flex>
                <v-select
                :items="fleets.map(fl => {
                    if (checkFleet(fl) == undefined) {
                        return {text: fl.start + ' - ' + fl.end + ' (' + fl.truck.plate + ')' + ' (' + fl.startDate + ' )' , value: fl._id}
                    }
                    
                }).filter(element =>  element != undefined)"
                box
                label="Choose fleet"
                v-model="invoice.fleet"
                ></v-select>
            </v-flex>
            <br><br>
            <v-btn
                @click="addInvoice"
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
                date1: false,
                invoice: {
                    number: '',
                    cmr: '',
                    date: '',
                    price: '',
                    fleet: null
                }
            }
        },
        methods: {
            clear() {
                this.invoice.number = ''
                this.invoice.cmr = ''
                this.invoice.price = ''
                this.invoice.date = ''
                this.invoice.fleet = {}
            },
            addInvoice() {
                this.$store.dispatch('addInvoice', this.invoice)
                this.clear()
            },
            logFleets() {
                console.log(this.invoices.map(element => element.fleet))
            },
            checkFleet(fleet) {
                //console.log(this.invoices.map(element => element.fleet).find(element => element.start == fleet.start && element.end == fleet.end && element.startDate == fleet.startDate && element.endDate == fleet.endDate))
                return this.invoices.map(el => el.fleet).find(element => element._id == fleet._id)
            }
        },
        computed: {
            fleets() {
                return this.$store.getters.fleets
            },
            invoices() {
                return this.$store.getters.invoices
            }
        }
    }
</script>


<style>
    .formInvoice {
        margin: 4%;
        width: 40%;
    }

    .addNewInvoice {
        margin: 6% auto;
    }

    .fleets-select {
        width: 100%;
    }

    h1 {
        text-align: center;
    }
</style>

