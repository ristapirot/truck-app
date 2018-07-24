import Home from './components/Home.vue'
import Vehicles from './components/vehicles/Vehicles.vue'
import Trucks from './components/vehicles/Trucks.vue'
import Employees from './components/employees/Employees.vue'
import Fleets from './components/fleets/Fleets.vue'
import Invoices from './components/invoices/Invoices.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/vehicles', component: Vehicles, children: [
        { path: '/trucks', component: Trucks }
    ] },
    { path: '/employees', component: Employees },
    { path: '/fleets', component: Fleets },
    { path: '/invoices', component: Invoices }
]