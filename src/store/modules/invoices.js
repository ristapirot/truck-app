import invoices from '../../data/invoices'

const state = {
    invoices: []
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
        commit('SET_INVOICES', invoices)
    },
    addInvoice: ({commit}, invoice) => {
        commit('ADD_INVOICES', invoice)
    }
}

const getters = {
    invoices: state => {
        return state.invoices
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}