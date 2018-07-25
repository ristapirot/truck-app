import Vue from 'vue'
import Vuex from 'vuex'
import trucks from './modules/trucks'
import trailers from './modules/trailers'
import employees from './modules/employees'
import fleets from './modules/fleets'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        trucks,
        trailers,
        employees,
        fleets
    }
})