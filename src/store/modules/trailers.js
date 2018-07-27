import trailers from '../../data/trailers'

const state = {
    trailers: []
}

const mutations = {
    'SET_TRAILERS' (state, trailers) {
        state.trailers = trailers
    },
    'ADD_TRAILERS' (state, { plate, make, model, vin, date }) {
        const record = state.trailers.find(element => element.plate == plate)
        if (record) {
            record.make = make
            record.model = model
            record.vin = vin
            record.date = date
        } else {
            state.trailers.push({
                plate: plate,
                make: make,
                model: model,
                vin: vin,
                date: date
            })
        }
    },
    'DELETE_TRAILERS' (state, trailer) {
        state.trailers.splice(state.trailers.indexOf(state.trailers.find(element => element.plate == trailer.plate)), 1)
    }
}

const actions = {
    initTrailers: ({commit}) => {
        commit('SET_TRAILERS', trailers)
    },
    addTrailer: ({commit}, trailer) => {
        commit('ADD_TRAILERS', trailer)
    },
    deleteTrailer: ({ commit }, trailer) => {
        commit('DELETE_TRAILERS', trailer)
    }
}

const getters = {
    trailers: state => {
        return state.trailers
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}