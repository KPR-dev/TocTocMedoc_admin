import axios from 'axios';

const axiosPlugin = {
    install(App) {
        let token = 'token';


        const axiosInstance = axios.create({
            baseURL: 'http://31.207.35.25:8000',
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
