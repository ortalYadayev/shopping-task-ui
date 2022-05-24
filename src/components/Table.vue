<template>
  <div class="full-size-table rounded-lg sm:shadow-lg overflow-scroll mt-10 mx-4 lg:mx-10">
    <table class="unresponsive-table w-full bg-white overflow-hidden shadow-lg text-center">
      <thead class="text-white">
        <tr class="bg-primary-color table-row rounded-l-lg sm:rounded-none">
          <th class="p-3 sm:w-40">
            Title
          </th>
          <th class="p-3 sm:w-40">
            Price
          </th>
          <th class="p-3 sm:w-40">
            Description
          </th>
          <th class="p-3 sm:w-40">
            Options
          </th>
        </tr>
      </thead>

      <tbody class="flex-1 sm:flex-none">
        <tr v-for="(item, index) in items" :key="index">
          <td class="border-gray border-t border-l hover:bg-gray p-3">
            {{ item.title }}
          </td>
          <td class="border-gray border-t border-l hover:bg-gray p-3">
            {{ item.price }}
          </td>
          <td class="border-gray border-t border-l hover:bg-gray p-3">
            {{ item.description }}
          </td>
          <td class="flex justify-center items-center border-gray border-t border-l hover:bg-gray p-3">
            <button
                class="flex justify-center items-center bg-gray text-blue-500 hover:bg-blue-500 hover:text-gray duration-200 w-8 h-8 inline rounded-full mx-1"
                @click="openUpdateForm(item)"
            >
              <BIconGear class="text-lg" />
            </button>
            <button
                class="flex justify-center items-center duration-200 w-8 h-8 inline rounded-full bg-gray text-red-500 hover:bg-red-500 hover:text-white mx-1"
                @click="deleteItem(item)"
            >
              <BIconTrash class="text-lg" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    required: false,
    type: [Array, null],
  },
  payload: {
    required: false,
    type: [Array, null],
  },
  isForm: {
    required: false,
  },
});

let emits = defineEmits([
  'update:id',
  'update:title',
  'update:price',
  'update:description',
  'update:image',
  'update:image_url',
  'deleteCar',
]);

function openUpdateForm(item) {
  if (props.isForm && !window.confirm('Are you sure?')) {
    return;
  }

  emits('update:id', item.id);
  emits('update:title', item.title);
  emits('update:price', item.price);
  emits('update:description', item.description);
  emits('update:image', item.image);
  emits('update:image_url', item.image_url);

  emits('update:isForm', 'Updating');
}

</script>

<style lang="scss" scoped>
.unresponsive-table {
  display: inline-table !important;
  thead > tr:not(:first-child) {
    display: none;
  }

  td, th {
    height: 50px !important;
    white-space: nowrap;
  }

  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
}
</style>