import { createStore } from 'vuex'
import axiosInstance from "../_helpers/axios";

const store = createStore({
    state: {
        items: [
            {
                id: 1,
                'title': 'shirt',
                'price': 230,
                'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3fRltdKQnageXoz1oxJE_Y30-EkhzYsnaQ&usqp=CAU',
                'image_url': '',
            },
            {
                id: 2,
                'title': 'jeans',
                'price': 90,
                'description': '21221fdd',
                'image': 'https://moodle.com/wp-content/uploads/2021/06/22087-11.jpg',
                'image_url': '',
            },
            {
                id: 3,
                'title': 'short',
                'price': 150,
                'description': '21221fdd',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQNKKgJ1oJkUWkMrN9CgAe04gU1FDrVwa3A&usqp=CAU',
                'image_url': '',
            },
            {
                id: 4,
                'title': 'shirt',
                'price': 290,
                'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSSRLHw2vAhBXKctz0QJeEkQgioB0RlNWQg&usqp=CAU',
                'image_url': '',
            },
            {
                id: 5,
                'title': 'jeans',
                'price': 500,
                'description': '21221fdd',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAanNoV1g3gN1ibC6WcGJEOdlHOjglaecwNZC7Dld18qLnivzuCTXyEeOgjw52f2uKe2g&usqp=CAU',
                'image_url': '',
            },
            {
                id: 6,
                'title': 'short',
                'price': 420,
                'description': '21221fdd',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf28Rr2bngjf6WnNoztRU-LoA1JV5ojCjC6Q&usqp=CAU',
                'image_url': '',
            },
            {
                id: 7,
                'title': 'jeans',
                'price': 500,
                'description': 'jdkocjeiov jnolkmknklcneoickdldwekc pijohuiygfuyhij bgyuigbh ',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8IFNGGu_cByKLu2UkTW3C1v6lqSlUUmou8-fwbC6hPWJFYWwSucamhIR9zLUOA_BZP7k&usqp=CAU',
                'image_url': '',
            },
            {
                id: 8,
                'title': 'short',
                'price': 350,
                'description': '21221fdd',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtH45EtsbI8yuP88rrtE_uWPFkL8ww1yH0MA&usqp=CAU',
                'image_url': '',
            },
        ],
        cart: localStorage.getItem('myCart') || '',
    },
    getters: {},
    mutations: {
        setCart(state, item) {
            if(!state.cart)
                state.cart = item.id;
            else
                state.cart = `${item.id}, ${state.cart}`;

            localStorage.setItem('myCart', state.cart);
        },

        deleteItem(state, itemToDelete) {
            const index = store.state.cart.findIndex(item => item === itemToDelete.id);
            state.cart.splice(index, 1);

            localStorage.setItem('myCart', state.cart);
        },

        removeCart(state) {
            state.cart = null;
            localStorage.removeItem('myCart');
        },
    },
    actions: {
        addToCart({ commit }, item) {
            commit('setCart', item);
        },

        deleteFromCart({ commit }, item) {
            commit('deleteItem', item);
        },

        removeAllCart({ commit }) {
            commit('removeCart');
        },

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
