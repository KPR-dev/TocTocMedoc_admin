/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from './store'
import local from './storage/local'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Chart from 'primevue/chart';

const app = createApp(App)
app.component('ChartJS', Chart);
app.use(store)
app.use(local)
registerPlugins(app)

app.mount('#app')