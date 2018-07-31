import Api from '../../services/AuthenticationService'

const state = {
    trucks: []
}

const getters = {
    trucks: state => {
        return state.trucks
    },
    truckNames: state => {
        return state.trucks.plate
    }
}

const mutations = {
    'SET_TRUCKS' (state, trucks) {
        state.trucks = trucks
    },
    'ADD_TRUCKS' (state, { plate, make, model, vin, date }) {
        Api.addTrucks({ plate, make, model, vin, date }).then(response => {
        })
        state.trucks.push({
            plate: plate,
            make: make,
            model: model,
            vin: vin,
            date: date
        })
    },
    'UPDATE_TRUCKS' (state, { plate, make, model, vin, date }) {
        const truckId = state.trucks.find(element => element.plate == plate)._id
        Api.updateTrucks({ plate, make, model, vin, date }, truckId).then(response => {

        })
    },
    'DELETE_TRUCKS' (state, { plate, make, model, vin, date }) {
        const truckId = state.trucks.find(element => element.plate == plate)._id
        Api.deleteTrucks(truckId).then(response => {
            console.log(response.data)
        })
    }
}

const actions = {
    initTrucks: ({commit}) => {
        let trucks = []
        Api.getTrucks().then(response => {
            response.data.forEach(el => {
                el.date = el.date.substr(0, 10)
                trucks.push(el)
            })
        })
        commit('SET_TRUCKS', trucks)
    },
    addTruck: ({commit}, { plate, make, model, vin, date }) => {
        commit('ADD_TRUCKS', { plate, make, model, vin, date })
    },
    updateTruck: ({commit}, { plate, make, model, vin, date }) => {
        const record = state.trucks.find(element => element.plate == plate)
        if (record) {
            record.make = make
            record.model = model
            record.vin = vin
            record.date = date
            commit('UPDATE_TRUCKS', { plate, make, model, vin, date })
        }
        
    },
    deleteTruck: ({ commit }, truck) => {
        commit('DELETE_TRUCKS', truck)
        state.trucks.splice(state.trucks.indexOf(state.trucks.find(element => element.plate == truck.plate)), 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}