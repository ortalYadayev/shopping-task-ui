<template>
  <div class="bg-gray">
    <div class="flex items-center fixed w-full px-10 md:px-20 shadow-lg h-14 bg-white z-10">
      <button
          @click="openCart"
          class="cart-hover border-2 border-primary-color hover:bg-primary-color duration-200 rounded-full p-2"
      >
        <BIconCartX v-if="open" class="text-2xl text-primary-color" />
        <BIconCart v-else class="text-2xl text-primary-color" />
      </button>

      <div
          v-if="$store.state.cart"
           class="ml-3 text-sm text-primary-color"
      >
        {{ countItems }} item{{ countItems > 1 ? 's' : '' }}
      </div>
    </div>

    <div
        v-if="open"
        class="fixed mt-14 bg-white w-full sm:w-1/2 md:w-1/3 xl:w-1/6 p-8 z-20"
    >
      <div v-if="$store.state.cart">
        <div
            v-for="(item, index) in items"
           :key="index"
            class="flex justify-between"
        >
        <div>
          {{ item.title }}
        </div>
        <div>
          {{ item.price }} $
        </div>
        </div>

        <div class="text-center uppercase font-bold my-8">
          total {{ total }} $
        </div>

        <div class="duration-200 text-center bg-primary-color text-gray hover:bg-secondary-color hover:text-primary-color rounded-lg tracking-wider font-bold shadow-lg uppercase text-lg px-5 py-1">
          pay
        </div>
      </div>
      <div v-else class="text-center">
        Your cart is empty
      </div>
    </div>

    <div
        class="container m-auto duration-200 min-h-screen flex flex-wrap items-center justify-center"
        :class="open ? 'opacity-30' : ''"
    >
      <div
          v-for="(item, index) in $store.state.items"
           :key="index"
           class="item-card flex flex-col justify-around items-center bg-white shadow-md rounded-lg m-5"
      >
        <div class="text-secondary-color m-3">
          <img
              :src="item.image"
              :alt="item.title"
              class="w-32 h-32 hover:scale-110 duration-200"
          >
        </div>

        <div class="w-full flex justify-between items-center">
          <div class="mr23">
            <div class="text-secondary-color font-bold text-lg md:text-xl mb-1">
              {{ item.title }}
            </div>

            <div class="text-secondary-color text-xs md:text-sm">
              {{ item.description }}
            </div>
          </div>

          <div class="whitespace-nowrap text-secondary-color text-sm">
            {{ item.price }} $
          </div>
        </div>

        <div
            @click="addToCart(item)"
            class="flex justify-center items-center duration-200 bg-primary-color text-gray hover:bg-secondary-color hover:text-primary-color rounded-lg tracking-wider font-bold shadow-lg uppercase text-lg px-5 py-1"
        >
          Buy
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const open = ref(false);
const items = ref([]);
const countItems = ref(store.state.cart.length ? store.state.cart.split(',').length : 0);
const total = ref(0);

init();

function init() {
  if(store.state.cart.length > 2) {
    items.value = store.state.cart.split(',').map(index => {
      const itemIndex = store.state.items.findIndex(item => Number(item.id) === Number(index));
      return store.state.items[itemIndex];
    });

    total.value = items.value.reduce((a, b) => a + b.price, 0);
  } else if(store.state.cart.length) {
    const itemIndex = store.state.items.findIndex(item => Number(item.id) === Number(store.state.cart));

    items.value = [store.state.items[itemIndex]];

    total.value = items.value[0].price;
  }
}

function addToCart(item) {
  store.dispatch('addToCart', item);

  countItems.value = countItems.value + 1;

  items.value = [item, ...items.value]

  total.value = total.value + item.price;
}

function openCart() {
  open.value = !open.value;
}
</script>

<style lang="scss">
.car-card-info {
  font-size: 10px;
  width: fit-content;
  max-width: 60%;
}

.item-card {
  padding: 12px 15px;
  width: 250px;
  min-height: 350px;
}

.cart-hover:hover > svg {
  color: var(--secondary-color);
}
</style>