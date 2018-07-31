import Api from '../../services/AuthenticationService'

const state = {
    fleets: []
}

const getters = {
    fleets: state => {
        return state.fleets
    }
}

const mutations = {
    'SET_FLEETS' (state, fleets) {
        state.fleets = fleets
    },
    'ADD_FLEETS' (state, { start, end, truck, driver, startDate, endDate, company }) {
        Api.addFleets({ start, end, truck, driver, startDate, endDate, company }).then(response => {
            console.log(response.data)
        })
        state.fleets.push({
            start: start,
            end: end,
            truck: truck,
            driver: driver,
            startDate: startDate,
            endDate: endDate,
            company: company
        })
    },
    'UPDATE_FLEETS' (state, { start, end, truck, driver, startDate, endDate, company }) {
        const record = state.fleets.find(element => element.start == start && element.end == end && element.truck == truck && element && element.startDate == startDate)._id
        Api.updateFleets({ start, end, truck, driver, startDate, endDate, company }, fleetId).then(response => {
            console.log(response.data)
        })
    },
    'DELETE_FLEETS' (state, { start, end, truck, driver, startDate, endDate, company }) {
        const fleetId = state.fleets.find(element => element.start == start && element.end == end && element.truck == truck && element && element.startDate == startDate)._id
        Api.deleteFleets(fleetId).then(response => {
            console.log(response.data)
        })
    }

}

const actions = {
    initFleets: ({commit}) => {
        let fleets = []
        Api.getFleets().then(response => {
            response.data.forEach(el => {
                el.startDate = el.startDate.substr(0, 10)
                el.endDate = el.endDate.substr(0, 10)
                fleets.push(el)
            })
        })
        commit('SET_FLEETS', fleets)
    },
    addFleets: ({commit}, { start, end, truck, driver, startDate, endDate, company }) => {
        commit('ADD_FLEETS', { start, end, truck, driver, startDate, endDate, company })
    },
    updateFleets: ({commit}, { start, end, truck, driver, startDate, endDate, company }) => {
        const record = state.fleets.find(element => element.start == start && element.end == end && element.truck == truck && element && element.startDate == startDate)
        if (record) {
            record.endDate = endDate
            commit('UPDATE_FLEETS', { start, end, truck, driver, startDate, endDate, company })
        }
        
    },
    deleteFleets: ({ commit }, fleet) => {
        commit('DELETE_FLEETS', fleet)
        state.fleets.splice(state.fleets.indexOf(state.fleets.find(element => element.start == fleet.start && element.end == fleet.end && element.truck == fleet.truck && element.startDate == fleet.startDate)), 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}