import Api from './Api'

export default {
    login (credentials) {
        return Api().post('users/login', credentials)
    }
}



// AuthenticationService.register({
//     email: 'testing@gmail.com',
//     password: '123456'
// })