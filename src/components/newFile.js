import moment from "moment";
import axios from "axios";

export default (await
    import ('vue')).defineComponent({
    // components: {
    //   VDataTable,
    // },
    data: () => ({
        updateDialog: false,
        dialog: false,
        search: "",
        headers: [{
                align: "start",
                key: "id",
                sortable: false,
                title: "Code",
            },
            // { key: "ticket_number", title: "Numéro de billet" },
            { key: "customer", title: "Client" },
            { key: "travel_date", title: "Date de voyage" },
            { key: "travel_sense", title: "Trajet" },
            { key: "created_at", title: "Créer le" },
            // { title: "Actions", key: "actions", sortable: false },
        ],

        tickets: [],
        vehicles: [],
        users: [],
        resultats: {},
    }),
    mounted() {
        this.get_tickets();
        this.get_vehicles();
        this.getUserall();

    },
    computed: {
        numberOfTickets() {
            // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
            return this.tickets.length;

        },
        numberusers() {
            // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
            return this.users.length;
        },
        numbervehicules() {
            // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
            return this.vehicles.length;
        },
        formattedDate() {
            return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
        },
    },
    methods: {
        async getUserall() {
            try {
                const response = await axios.get("http://localhost:8000/get_users");
                this.users = response.data.users; // Correction de l'assignation de variable
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre d'utilisateurs", error);
            }
        },
    },
});