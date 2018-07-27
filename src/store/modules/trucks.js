import trucks from '../../data/trucks'

const state = {
    trucks: []
}

const mutations = {
    'SET_TRUCKS' (state, trucks) {
        state.trucks = trucks
    },
    'ADD_TRUCKS' (state, { plate, make, model, vin, date }) {
        const record = state.trucks.find(element => element.plate == plate)
        if (record) {
            record.make = make
            record.model = model
            record.vin = vin
            record.date = date
        } else {
            state.trucks.push({
                plate: plate,
                make: make,
                model: model,
                vin: vin,
                date: date
            })
        }
    },
    'DELETE_TRUCKS' (state, truck) {
        state.trucks.splice(state.trucks.indexOf(state.trucks.find(element => element.plate == truck.plate)), 1)
    }
}

const actions = {
    initTrucks: ({commit}) => {
        commit('SET_TRUCKS', trucks)
    },
    addTruck: ({commit}, truck) => {
        commit('ADD_TRUCKS', truck)
    },
    deleteTruck: ({ commit }, truck) => {
        commit('DELETE_TRUCKS', truck)
    }
}

const getters = {
    trucks: state => {
        return state.trucks
    },
    truckNames: state => {
        return state.trucks.plate
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}