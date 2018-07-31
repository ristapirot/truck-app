import Api from '../../services/AuthenticationService'

const state = {
    trailers: []
}

const getters = {
    trailers: state => {
        return state.trailers
    }
}

const mutations = {
    'SET_TRAILERS' (state, trailers) {
        state.trailers = trailers
    },
    'ADD_TRAILERS' (state, { plate, make, model, vin, date }) {
        Api.addTrailers({ plate, make, model, vin, date }).then(response => {
        })
        state.trailers.push({
            plate: plate,
            make: make,
            model: model,
            vin: vin,
            date: date
        })
    },
    'UPDATE_TRAILERS' (state, { plate, make, model, vin, date }) {
        const trailerId = state.trailers.find(element => element.plate == plate)._id
        Api.updateTrailers({ plate, make, model, vin, date }, trailerId).then(response => {

        })
    },
    'DELETE_TRAILERS' (state, { plate, make, model, vin, date }) {
        const trailerId = state.trailers.find(element => element.plate == plate)._id
        Api.deleteTrailers(trailerId).then(response => {

        })
    }
}

const actions = {
    initTrailers: ({commit}) => {
        let trailers = []
        Api.getTrailers().then(response => {
            response.data.forEach(el => {
                el.date = el.date.substr(0, 10)
                trailers.push(el)
            })
        })
        commit('SET_TRAILERS', trailers)
    },
    addTrailer: ({commit}, { plate, make, model, vin, date }) => {
        commit('ADD_TRAILERS', { plate, make, model, vin, date })
    },
    updateTrailer: ({commit}, { plate, make, model, vin, date }) => {
        const record = state.trailers.find(element => element.plate == plate)
        if (record) {
            record.make = make
            record.model = model
            record.vin = vin
            record.date = date
            commit('UPDATE_TRAILERS', { plate, make, model, vin, date })
        }
    },
    deleteTrailer: ({ commit }, trailer) => {
        commit('DELETE_TRAILERS', trailer)
        state.trailers.splice(state.trailers.indexOf(state.trailers.find(element => element.plate == trailer.plate)), 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}