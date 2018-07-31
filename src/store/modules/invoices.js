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
        const record = state.invoices.find(element => element.number == number) 
        if (record) {
            record.number = number
            record.cmr = cmr
            record.price = price
            record.date = date
            record.fleet = fleet
        } else {
            state.invoices.push({
                number: number,
                cmr: cmr,
                price: price,
                date: date,
                fleet: fleet
            })
        }
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
    addInvoice: ({commit}, invoice) => {
        commit('ADD_INVOICES', invoice)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}