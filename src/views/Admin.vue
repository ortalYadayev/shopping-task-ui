<template>
    <div class="min-h-screen bg-gray py-10">
      <div class="flex justify-center mb-5">
        <div class="w-full flex justify-around">
          <button
              class="duration-300 shadow-lg border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-gray rounded-lg px-3 py-1.5"
              @click="toggleForm"
          >
            {{ !isForm ? 'Add Item' : 'Cancel Item' }}
          </button>

          <div class="duration-300 border-2 border-white bg-white text-secondary-color shadow-lg rounded-lg px-3 py-1.5">
            {{ store.state.items.length }} items
          </div>
        </div>

      </div>

      <Form
          v-if="isForm"
          :isForm="isForm"
          :id="payload.id"
          :title="payload.title"
          :price="payload.price"
          :description="payload.description"
          :image="payload.image"
          :image_url="payload.image_url"
          :errors="errors"
          @update:id="id => payload.id = id"
          @update:title="title => payload.title = title"
          @update:price="price => payload.price = price"
          @update:description="description => payload.description = description"
          @update:image="image => payload.image = image"
          @update:image_url="image_url => payload.image_url = image_url"
          @onSubmit="isForm === 'Creating' ? createItem() : updateItem()"
      />

      <Table
          :items="store.state.items"
          :payload="payload"
          :isForm="isForm"
          :id="payload.id"
          :title="payload.title"
          :price="payload.price"
          :description="payload.description"
          :image="payload.image"
          :image_url="payload.image_url"
          @update:id="id => payload.id = id"
          @update:title="title => payload.title = title"
          @update:price="price => payload.price = price"
          @update:description="description => payload.description = description"
          @update:image="image => payload.image = image"
          @update:image_url="image_url => payload.image_url = image_url"
          @update:isForm="isFormValue => isForm = isFormValue"
          @deleteItem="deleteItem(item)"
      />
    </div>
</template>

<script setup>
import Form from '../components/Form.vue';
import Table from '../components/Table.vue';
import { ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const payload = ref({
  id: null,
  title: '',
  price: '',
  description: '',
  image: '',
  image_url: '',
});
const errors = ref({});
const isForm = ref(null);
const open = ref(false);
const titleButton = ref('Add Item');

getItems();

async function getItems() {
  // const response = await store.dispatch('getItems');
  // store.state.items = response.data;
}

async function createItem() {
  const data = new FormData();
  data.append('title', payload.value.title);
  data.append('price', payload.value.price);
  data.append('description', payload.value.description);
  data.append('image', payload.value.image);

  try {
    // const response = await store.dispatch('create', data);
    // store.state.items = [response.data, ...store.state.items];

    // next line that I wrote it's because there isn't a server
    store.state.items = [
      {
        ...payload.value,
       id: store.state.items.length + 1
      },
      ...store.state.items
    ];

    isForm.value = !isForm.value ? 'Creating' : null;
  } catch (error) {
    errors.value = error.response.data.errors;
  }
}

async function updateItem() {
  const data = new FormData();
  data.append('_method', 'PUT');
  data.append('id', payload.id);
  data.append('title', payload.value.title);
  data.append('price', payload.value.price);
  data.append('description', payload.value.description);
  data.append('image', payload.value.image);

  try {
    // const response = await store.dispatch('updateItem', { id: payload.value.id, data});
    // const index = store.state.items.findIndex(item => item.id === response.data.id);
    // store.state.items[index] = response.data;

    // next line that I wrote it's because there isn't a server
    const index = store.state.items.findIndex(item => item.id === payload.value.id);
    store.state.items[index] = payload.value;

    payload.value = {
      id: null,
      title: null,
      price: null,
      description: null,
      image: null,
      image_url: null,
    }

    isForm.value = null;
  } catch (error) {
    errors.value = error.response.data.errors;
  }
}

async function deleteItem() {
  console.log(payload.value)
  try {
    // await store.dispatch('deleteCar', payload.value.id);

    // next line that I wrote it's because there isn't a server
    const index = store.state.items.findIndex(item => item.id === payload.value.id);
    store.state.items.splice(index, 1);
  } catch (err) {
    if (store.state.items.indexOf(payload.value)) {
      store.state.items.splice(store.state.items.indexOf(payload.value), 1);
    }
  }
}

function toggleForm() {
  if(isForm.value && !confirm('Are you sure?')) {
    titleButton.value = 'Add Item';

    return;
  }

  payload.value = {
    id: null,
    title: null,
    price: null,
    description: null,
    image_url: null,
    isActiveDownload: false,
  }

  isForm.value = !isForm.value ? 'Creating' : null;
}

</script>