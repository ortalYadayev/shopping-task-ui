import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {
        items: [
            {
                id: 1,
                'title': 'shirt',
                'price': 230,
                'description': '21221fdd',
                'image': '',
                'image_url': '',
            },
            {
                id: 2,
                'title': 'jeans',
                'price': 550,
                'description': '21221fdd',
                'image': '',
                'image_url': '',
            },
            {
                id: 3,
                'title': 'short',
                'price': 150,
                'description': '21221fdd',
                'image': '',
                'image_url': '',
            },
        ],
    },
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
