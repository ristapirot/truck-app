import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Trucks from './components/vehicles/Trucks.vue'
import Trailers from './components/vehicles/Trailers.vue'
import Employees from './components/employees/Employees.vue'
import Fleets from './components/fleets/Fleets.vue'
import Invoices from './components/invoices/Invoices.vue'

export const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login },
    { path: '/trucks', component: Trucks},
    { path: '/trailers', component: Trailers },
    { path: '/employees', component: Employees },
    { path: '/fleets', component: Fleets },
    { path: '/invoices', component: Invoices }
]