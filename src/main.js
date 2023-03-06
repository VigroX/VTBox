import App from '@/App.vue'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: generatedRoutes
})

app.use(router)

app.mount('#app')
