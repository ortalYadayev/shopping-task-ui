<template>
  <div class="flex justify-center items-center flex-col md:flex-row px-5 lg:px-0">
    <form
        class="w-full sm:w-1/2 lg:w-1/3 rounded-xl shadow-md bg-white py-6 sm:py-8 px-5 lg:px-12"
        @submit.prevent="onSubmit"
    >
      <h1 class="text-center text-secondary-color text-2xl sm:text-4xl lg:text-5xl mb-6">
       Item
      </h1>

      <div class="flex flex-col mb-2">
        <input
            @input="$emit('update:title', $event.target.value); resetErrors('title')"
            name="title"
            :placeholder="title ? title : 'Title'"
            type="text"
            :value="title ? title : ''"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class=" v$.title.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="v$.title.$error "
              class="italic text-xs text-red-500"
          >
            {{ v$.title.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            @input="$emit('update:price', $event.target.value); resetErrors('price')"
            name="price"
            :placeholder="price ? price : 'Price'"
            :value="price ? price : ''"
            type="number"
            min="0"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="v$.price.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="v$.price.$error "
              class="italic text-xs text-red-500"
          >
            {{ v$.price.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            @input="$emit('update:description', $event.target.value); resetErrors('description')"
            name="description"
            :placeholder="description ? description : 'Description'"
            :value="description ? description : ''"
            type="text"
            class="duration-150 border-2 text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="v$.description.$error ? 'border-red-400' : 'border-secondary-color hover:border-primary-color focus:border-primary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="v$.description.$error"
              class="italic text-xs text-red-500"
          >
            {{v$.description.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <label
            class="duration-200 text-center text-secondary-color text-lg tracking-wide font-bold cursor-pointer rounded-xl bg-gray hover:text-gray hover:bg-primary-color py-2 px-4"
            for="image"
        >
         choose image
        </label>
        <input
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            @input="$emit('update:image', $event.target.value)"
            @change="handleImageUrl(item)"
        >
        <transition name="slide-fade">
          <span
              v-if="v$.image.$error"
              class="italic text-xs text-red-500 mt-2"
          >
            {{ v$.image.$errors[0].$message }}
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
           send
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import Compressor from "compressorjs";

const props = defineProps({
  id: {
    required: true,
    type: [Number, null],
  },
  title: {
    required: true,
    type: [String, null],
  },
  price: {
    required: true,
    type: [String, null],
  },
  description: {
    required: true,
    type: [String, null],
  },
  image: {
    required: true,
  },
  image_url: {
    required: false,
    type: [String, null],
  },
  isForm: {
    required: false,
    type: [String, null],
  },
  errors: {
    required: true,
  },
});

let emits = defineEmits([
  'onSubmit',
  'update:id',
  'update:title',
  'update:price',
  'update:description',
  'update:image',
  'update:image_url',
]);

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
const v$ = useVuelidate(rules, props);

async function onSubmit() {
  if(props.isForm !== 'Updating') {
    v$.value.$touch();

    if (v$.value.$invalid) {
      return;
    }
  }

  emits('update:id', props.id);
  emits('onSubmit');
}

async function handleImageUrl(event) {
  await new Promise((resolve, reject) => {
    new Compressor(event.target.files[0], {
      quality: 0.6,
      width: 800,
      height: 800,
      success(file) {
        emits('update:image_url', URL.createObjectURL(file));
        emits('update:image', file);
        resolve();
      },
      error: reject,
    });
  });
}

function resetErrors(key, message) {
  v$.value[key].$reset();
  delete props.errors[message];
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