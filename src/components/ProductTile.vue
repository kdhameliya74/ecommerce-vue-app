<script setup>
import { ShoppingCart, Loader2 } from "lucide-vue-next";
import { ref } from "vue";
import { useStore } from "vuex";
import ProductModal from "./ProductModal.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const isAdding = ref(false);
const showModal = ref(false);

const addToCart = async () => {
  isAdding.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  store.dispatch("cart/addToCart", props.product);
  isAdding.value = false;
};

const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div
    class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div class="relative h-48 overflow-hidden group">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
      >
        <button
          class="bg-white/70 text-black px-4 py-1.5 cursor-pointer rounded-full hover:bg-white"
          @click="openModal"
        >
          View Details
        </button>
      </div>
    </div>

    <div class="p-5">
      <h3
        :title="product.title"
        class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2 line-clamp-1"
      >
        {{ product.title }}
      </h3>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
        {{ product.description }}
      </p>

      <div class="flex flex-col gap-2 justify-between">
        <div class="flex items-center justify-between">
          <div class="text-2xl">${{ product.price.toFixed(2) }}</div>
          <div
            class="text-gray-900 py-0.5 px-2 rounded-full border text-sm border-gray-300"
          >
            {{ product.category }}
          </div>
        </div>
        <button
          @click="addToCart"
          class="flex items-center bg-blue-500 gap-2 text-sm text-white justify-center p-2 cursor-pointer rounded-full hover:bg-blue-800"
        >
          <Loader2 class="animate-spin w-5 h-5" v-if="isAdding" />
          <ShoppingCart class="w-5 h-5" v-else />
          <span class="font-medium">{{
            isAdding ? "Adding to cart..." : "Add to Cart"
          }}</span>
        </button>
      </div>
    </div>

    <ProductModal :product="product" :show="showModal" @close="closeModal" />
  </div>
</template>
