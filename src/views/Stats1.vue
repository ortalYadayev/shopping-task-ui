<template>
  <div class="bg-gray">
    <div class="container m-auto duration-200 min-h-screen flex flex-wrap items-center justify-center">
      <div>
        <h1 class="flex justify-center text-lg">
          Top 5 sel
        </h1>
        <div class="item-card flex flex-col justify-center items-center bg-white shadow-md rounded-lg m-5">
          <div class="mb-2">
            product 1
          </div>
          <div class="mb-2">
            product 2
          </div>
        </div>
      </div>
      <div>
        <h1 class="flex justify-center text-lg">
          Top 5 unique sel
        </h1>
        <div class="item-card flex flex-col justify-center items-center bg-white shadow-md rounded-lg m-5">
          <div class="mb-2">
            product 2
          </div>
          <div class="mb-2">
            product 1
          </div>
        </div>
      </div>
      <div>
        <h1 class="flex justify-center text-lg">
          Past 5 days $
        </h1>
        <div class="item-card flex flex-col justify-center items-center bg-white shadow-md rounded-lg m-5">
          <div class="mb-2">
            500 $
          </div>
          <div class="mb-2">
            100 $
          </div>
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
  min-height: 250px;
}

.cart-hover:hover > svg {
  color: var(--secondary-color);
}
</style>