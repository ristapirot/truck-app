import employees from '../../data/employees'

const state = {
    employees: []
}

const mutations = {
    'SET_EMPLOYEES' (state, employees) {
        state.employees = employees
    },
    'ADD_EMPLOYEES' (state, { name, surname, personId, telephone, workplace, card, active }) {
        const record = state.employees.find(element => element.name == name && element.surname == surname) 
        if (record) {
            record.personId = personId
            record.telephone = telephone
            record.workplace = workplace
            record.card = card
            record.active = active
        } else {
            state.employees.push({
                name: name,
                surname: surname,
                personId: personId,
                telephone: telephone,
                workplace: workplace,
                card: card,
                active: active
            })
        }
    },
    'DELETE_EMPLOYEES' (state, employee) {
        state.employees.splice(state.employees.indexOf(state.employees.find(element => element.plate == employee.plate)), 1)
    }
}

const actions = {
    initEmployees: ({commit}) => {
        commit('SET_EMPLOYEES', employees)
    },
    addEmployee: ({commit}, employee) => {
        commit('ADD_EMPLOYEES', employee)
    },
    deleteEmployee: ({commit}, employee) => {
        
    }
}

const getters = {
    employees: state => {
        return state.employees
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}