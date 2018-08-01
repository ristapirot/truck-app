import Api from '../../services/AuthenticationService'

const state = {
    invoices: []
}

const getters = {
    invoices: state => {
        return state.invoices
    }
}

const mutations = {
    'SET_INVOICES' (state, invoices) {
        state.invoices = invoices
    },
    'ADD_INVOICES' (state, { number, cmr, price, date, fleet }) {
        Api.addInvoices({ number, cmr, price, date, fleet }).then(response => {
            console.log(response.data)
        })
        state.invoices.push({
            number: number,
            cmr: cmr,
            price: price,
            date: date,
            fleet: fleet
        })
    },
    'UPDATE_INVOICES' (state, { number, cmr, price, date, fleet }) {
        const invoiceId = state.invoices.find(element => element.number == number)._id
        Api.updateInvoices({ number, cmr, price, date, fleet }, invoiceId).then(response => {
            console.log(response.data)
        })
    },
    'DELETE_INVOICES' (state, { number, cmr, price, date, fleet }) {
        const invoiceId = state.invoices.find(element => element.number == number)._id
        Api.deleteInvoices(invoiceId).then(response => {
            console.log(response.data)
        })
    }

}

const actions = {
    initInvoices: ({commit}) => {
        let invoices = []
        Api.getInvoices().then(response => {
            response.data.forEach(el => {
                el.date = el.date.substr(0, 10)
                invoices.push(el)
            })
        })
        commit('SET_INVOICES', invoices)
    },
    addInvoice: ({commit}, { number, cmr, price, date, fleet }) => {
        commit('ADD_INVOICES', { number, cmr, price, date, fleet })
    },
    updateInvoices: ({commit}, { number, cmr, price, date, fleet }) => {
        const record = state.invoices.find(element => element.number == number)
        if (record) {
            record.cmr = cmr
            record.price = price
            record.date = date
            commit('UPDATE_INVOICES', { number, cmr, price, date, fleet })
        }
        
    },
    deleteInvoices: ({ commit }, invoice) => {
        commit('DELETE_INVOICES', invoice)
        state.invoices.splice(state.invoices.indexOf(state.invoices.find(element => element.number == invoice.number)), 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}