import Api from '../../services/AuthenticationService'


const state = {
    employees: []
}

const getters = {
    employees: state => {
        return state.employees
    }
}

const mutations = {
    'SET_EMPLOYEES' (state, employees) {
        state.employees = employees
    },
    'ADD_EMPLOYEES' (state, { name, surname, personId, telephone, workplace, card, active }) {
        Api.addEmployees({ name, surname, personId, telephone, workplace, card, active }).then(response => {
        })
        state.employees.push({
            name: name,
            surname: surname,
            personId: personId,
            telephone: telephone,
            workplace: workplace,
            card: card,
            active: active
        })
    },
    'UPDATE_EMPLOYEES' (state, { name, surname, personId, telephone, workplace, card, active }) {
        const employeeId = state.employees.find(element => element.name == name && element.surname == surname)._id
        Api.updateEmployees({ name, surname, personId, telephone, workplace, card, active }, employeeId).then(response => {

        })
    },
    'DELETE_EMPLOYEES' (state, { name, surname, personId, telephone, workplace, card, active }) {
        const employeeId = state.employees.find(element => element.name == name && element.surname == surname)._id
        Api.deleteEmployees(employeeId).then(response => {
            console.log(response.data)
        })
    }
}

const actions = {
    initEmployees: ({commit}) => {
        let employees = []
        Api.getEmployees().then(response => {
            response.data.forEach(el => {
                employees.push(el)
            })
        })
        commit('SET_EMPLOYEES', employees)
    },
    addEmployee: ({commit}, { name, surname, personId, telephone, workplace, card, active }) => {
        commit('ADD_EMPLOYEES', { name, surname, personId, telephone, workplace, card, active })
    },
    updateEmployee: ({commit}, { name, surname, personId, telephone, workplace, card, active }) => {
        const record = state.employees.find(element => element.name == name && element.surname == surname)
        if (record) {
            record.personId = personId
            record.telephone = telephone
            record.workplace = workplace
            record.card = card
            record.active = active
            commit('UPDATE_EMPLOYEES', { name, surname, personId, telephone, workplace, card, active })
        }
        
    },
    deleteEmployee: ({commit}, employee) => {
        commit('DELETE_EMPLOYEES', employee)
        state.employees.splice(state.employees.indexOf(state.employees.find(element => element.name == employee.name && element.surname == employee.surname)), 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}