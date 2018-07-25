import fleets from '../../data/fleets'

const state = {
    fleets: []
}

const mutations = {
    'SET_FLEETS' (state, fleets) {
        state.fleets = fleets
    },
    'ADD_FLEETS' (state, { start, end, truck, driver, startDate, endDate, company }) {
        const record = state.fleets.find(element => element.startDate == startDate && element.truck == truck) 
        if (record) {
            record.start = start
            record.end = end
            record.driver = driver
            record.startDate = startDate
            record.endDate = endDate
            record.company = company
        } else {
            state.fleets.push({
                start: start,
                end: end,
                truck: truck,
                driver: driver,
                startDate: startDate,
                endDate: endDate,
                company: company
            })
        }
    }

}

const actions = {
    initFleets: ({commit}) => {
        commit('SET_FLEETS', fleets)
    },
    addFleets: ({commit}, fleet) => {
        commit('ADD_FLEETS', fleet)
    }
}

const getters = {
    fleets: state => {
        return state.fleets
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}