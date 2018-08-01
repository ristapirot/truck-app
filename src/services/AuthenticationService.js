import Api from './Api'

export default {
    login (credentials) {
        return Api().post('users/login', credentials)
    },
    getTrucks() {
        return Api().get(`http://localhost:3000/trucks`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    addTrucks(credentials) {
        return Api().post('http://localhost:3000/trucks', credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    updateTrucks(credentials, truckId) {
        return Api().put('http://localhost:3000/trucks/' + truckId, credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    deleteTrucks(truckId) {
        return Api().delete('http://localhost:3000/trucks/' + truckId, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },



    


    getTrailers() {
        return Api().get(`http://localhost:3000/trailers`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    addTrailers(credentials) {
      return Api().post('http://localhost:3000/trailers', credentials, {
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
      })
    },
    updateTrailers(credentials, trailerId) {
        return Api().put('http://localhost:3000/trailers/' + trailerId, credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    deleteTrailers(trailerId) {
        return Api().delete('http://localhost:3000/trailers/' + trailerId, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },






    getEmployees() {
        return Api().get(`http://localhost:3000/employees`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    addEmployees(credentials) {
      return Api().post('http://localhost:3000/employees', credentials, {
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
      })
    },
    updateEmployees(credentials, employeeId) {
        return Api().put('http://localhost:3000/employees/' + employeeId, credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    deleteEmployees(employeeId) {
        return Api().delete('http://localhost:3000/employees/' + employeeId, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },





    getFleets() {
        return Api().get(`http://localhost:3000/fleets`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    addFleets(credentials) {
      return Api().post('http://localhost:3000/fleets', credentials, {
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
      })
    },
    updateFleets(credentials, fleetId) {
        return Api().put('http://localhost:3000/fleets/' + fleetId, credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    deleteFleets(fleetId) {
        return Api().delete('http://localhost:3000/fleets/' + fleetId, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },


    getInvoices() {
        return Api().get(`http://localhost:3000/invoices`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    addInvoices(credentials) {
      return Api().post('http://localhost:3000/invoices', credentials, {
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
      })
    },
    updateInvoices(credentials, invoiceId) {
        return Api().put('http://localhost:3000/invoices/' + invoiceId, credentials, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
    deleteInvoices(invoiceId) {
        return Api().delete('http://localhost:3000/invoices/' + invoiceId, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        })
    },
}
