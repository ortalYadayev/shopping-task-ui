import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async create({commit}, payload) {
            return await axiosInstance.post('/create', payload);
        },
        async getItems() {
            return await axiosInstance.get('/items');
        },
        async getLasItem() {
            return await axiosInstance.get('/get-item');
        },
    },
})

export default store;
