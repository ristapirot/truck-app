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
    getTrailers() {
        return Api().get(`http://localhost:3000/trailers`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    getEmployees() {
        return Api().get(`http://localhost:3000/employees`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    getFleets() {
        return Api().get(`http://localhost:3000/fleets`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    },
    getInvoices() {
        return Api().get(`http://localhost:3000/invoices`,
            {
              headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")}
            }
          )
    }
}
