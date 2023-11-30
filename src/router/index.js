// Composables
import { createRouter, createWebHistory } from 'vue-router'
import local from '@/storage/local'

const routes = [{
        path: '/',
        name: 'dashboard',
        component: () =>
            import ('@/views/DashboardView.vue'),
        children: [{
                path: '/home',
                name: 'Home',
                component: () =>
                    import ('@/views/Home.vue'),
            },

            {
                path: 'utilisateur',
                name: 'Utilisateur',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '@/views/gestion_utilisateur/UtilisateurView.vue'),
            },
            {
                path: 'administrateur',
                name: 'Administrateur',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '@/views/gestion_utilisateur/AdministrateurView.vue'),
            },
            {
                path: 'facture', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Facture',
                component: () =>
                    import ('@/views/Facture.vue'),
            },
            {
                path: 'tarifaire', // Modifier le chemin vers '/accueil1' ou tout autre chemin unique
                name: 'Tarifaire',
                component: () =>
                    import ('@/views/Tarifaire.vue'),
            },
            {
                path: 'historique',
                name: 'Historique',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '@/views/HistoriqueView.vue'),
            },
            {
                path: 'grille',
                name: 'grille',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '@/views/grille.vue'),
            },

        ]
    },

    {
        path: '/connexion',
        name: 'Login',
        component: () =>
            import ('@/views/LoginView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const user = local.getSharedData()
    if (to.name !== 'Login' && (!user || !user.token || !user.token.access_token)) {
        next({ name: 'Login' });
    } else {
        next();
    }
})

export default router