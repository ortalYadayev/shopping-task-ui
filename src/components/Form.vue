<template>
  <div class="flex justify-center items-center flex-col md:flex-row px-5 lg:px-0">
    <form
        class="w-full sm:w-1/2 lg:w-1/3 rounded-xl shadow-md bg-white py-6 sm:py-8 px-5 lg:px-12"
        @submit.prevent="onSubmit"
        method="post"
    >
      <h1 class="text-center text-secondary-color text-2xl sm:text-4xl lg:text-5xl mb-6">
       New Item
      </h1>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.title"
            @keydown="resetErrors('title', 'message')"
            name="title"
            placeholder="Title"
            type="text"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.title || v$.title.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.title || v$.title.$error "
              class="italic text-xs text-red-500"
          >
            {{ errors.title || v$.title.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.price"
            @keydown="resetErrors('price', 'message')"
            name="price"
            placeholder="Price"
            type="number"
            min="0"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.price || v$.price.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.price || v$.price.$error "
              class="italic text-xs text-red-500"
          >
            {{ errors.price || v$.price.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.description"
            @keydown="resetErrors('description', 'message')"
            name="description"
            placeholder="Description"
            type="text"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.description || v$.description.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.description || v$.description.$error"
              class="italic text-xs text-red-500"
          >
            {{ errors.description || v$.description.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <label
            class="duration-200 text-center text-secondary-color text-lg tracking-wide font-bold cursor-pointer rounded-xl bg-gray hover:text-gray hover:bg-primary-color py-2 px-4"
            for="image"
        >
          בחר תמונה
        </label>
        <input
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            @keydown="resetErrors('image', 'message')"
            @change="handleImageUrl"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.image || v$.image.$error"
              class="italic text-xs text-red-500 mt-2"
          >
            {{ errors.image || v$.image.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <transition name="slide-fade">
          <span
              v-if="errors.message"
              class="italic text-xs text-red-500"
          >
            {{ errors.message }}
          </span>
        </transition>

      <div class="flex items-center justify-center mt-4">
        <button
            class="duration-300 shadow-md rounded-xl text-xl tracking-wide w-full bg-secondary-color hover:bg-primary-color text-gray font-medium py-2"
            type="submit"
            value="Submit"
        >
          הרשם
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import Compressor from "compressorjs";

const store = useStore();
const payload = reactive({
  title: '',
  price: '',
  description: '',
  image: null,
  image_url: null,
});
let emit = defineEmits(['onSubmit']);
let errors = ref({
  title: '',
  price: '',
  description: '',
  image: '',
});
const rules = {
  title: {
    required: helpers.withMessage('Required field!', required),
    minLength: helpers.withMessage(({$params}) => `At least ${$params.min} characters!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `Maximum ${$params.max} characters!`, maxLength(255)),
  },
  price: {
    required: helpers.withMessage('Required field!', required),
  },
  description: {
    required: helpers.withMessage('Required field!', required),
    minLength: helpers.withMessage(({$params}) => `At least ${$params.min} characters!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `Maximum ${$params.max} characters!`, maxLength(255)),
  },
  image: {
    required: helpers.withMessage('Image is missing', required),
  },
};
const v$ = useVuelidate(rules, payload);

async function onSubmit() {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }

  const data = new FormData();
  data.append('title', payload.title);
  data.append('price', payload.price);
  data.append('description', payload.description);
  data.append('image', payload.image);

  try {
    await store.dispatch('create', data);

    emit('onSubmit');
  } catch (error) {
    if (error.response.status === 400) {
      error.response.data.errors.map(error => {
        if(!errors.value[error.param]){
          errors.value[error.param] = error.msg;
        }
      })
    }
    if (error.response.status === 422) {
      errors.value.message = error.response.data.message;
    }
  }
}

async function handleImageUrl(event) {
  await new Promise((resolve, reject) => {
    new Compressor(event.target.files[0], {
      quality: 0.6,
      width: 800,
      height: 800,
      success(file) {
        payload.image_url = URL.createObjectURL(file);
        payload.image = file;
        console.log(payload)
        resolve();
      },
      error: reject,
    });
  });
}

function resetErrors(key, message) {
  v$.value[key].$reset();
  delete errors.value[key];
  delete errors.value[message];
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>