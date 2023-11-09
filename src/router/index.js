// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'dashboard',
        component: () =>
            import ('@/views/DashboardView.vue'),
        children: [{
                path: 'home', // Modifier le chemin vers '/accueil' ou tout autre chemin unique
                name: 'Home',
                component: () =>
                    import ('@/views/Home.vue'),
            },
            {
                path: 'home1', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Home1',
                component: () =>
                    import ('@/views/Home1.vue'),
            },
            {
                path: 'utilisateur', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Utilisateur',
                component: () =>
                    import ('@/views/User.vue'),
            },
            {
                path: 'facture', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Facture',
                component: () =>
                    import ('@/views/Facture.vue'),
            },
            {
                path: 'tarif', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Tarif',
                component: () =>
                    import ('@/views/Grille.vue'),
            },
        ]
    },

    {
        path: '/connexion',
        name: 'Connexion',
        component: () =>
            import ('@/views/LoginView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router