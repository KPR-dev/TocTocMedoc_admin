import axios from 'axios';

const axiosPlugin = {
    install(App) {
        let token = 'token';


        const axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
        });


        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        App.config.globalProperties.$axios = axiosInstance;
        App.config.globalProperties.$updateToken = (newToken) => {
            token = newToken;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        };
    }
};

export default axiosPlugin;
