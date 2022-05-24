<template>
    <div class="min-h-screen bg-gray py-10">
      <div class="flex justify-center mb-5">
        <div class="w-full flex justify-around">
          <button @click="openForm" class="duration-300 border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-gray rounded-lg px-3 py-1.5" >
            {{ titleButton }}
          </button>

          <div class="duration-300 border-2 border-secondary-color bg-secondary-color text-gray rounded-lg px-3 py-1.5">
            {{ items.length }} items
          </div>
        </div>

      </div>

      <Form
          v-if="open"
          @onSubmit="onSubmit"
      />

      <Table :items="items" />
    </div>
</template>

<script setup>
import Form from '../components/Form.vue';
import Table from '../components/Table.vue';
import { ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const items = ref([])
const open = ref(false);
const titleButton = ref('Add Item');

getItems();

async function getItems() {
  const response = await store.dispatch('getItems');
  items.value = response.data;
}

function openForm() {
  if(open.value) {
    if(!confirm('Are you sure?')) {
      return;
    }

    titleButton.value = 'Add Item';
  } else {
    titleButton.value = 'Cancel Item';
  }

  open.value = !open.value;
}

async function onSubmit() {
  alert('Item successfully added');

  titleButton.value = 'Add Item';
  open.value = !open.value;

  const response = await store.dispatch('getLastItem');

  items.value.push(response.data);
  console.log(items.value)
  console.log(response.data)
}

</script>