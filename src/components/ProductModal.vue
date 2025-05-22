<script setup>
import { X } from "lucide-vue-next";
import { toRefs } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
  show: { type: Boolean, required: true },
});
const emit = defineEmits(["close"]);
const { product, show } = toRefs(props);

const handleClose = () => emit("close");
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-2 md:mx-0 max-h-[90vh] overflow-y-auto animate-fadeIn"
      >
        <div
          class="border-b border-b-gray-200 shadow-md px-6 py-4 flex items-center justify-between"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-1">
            {{ product.title }}
          </h2>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-red-500 text-2xl z-10 cursor-pointer hover:bg-gray-200 rounded-full p-1"
          >
            <X />
          </button>
        </div>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex flex-col md:flex-row gap-6">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full md:w-56 h-56 object-contain rounded-xl bg-gray-100 border mx-auto"
            />
            <div class="flex-1 flex flex-col gap-2">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xl font-semibold text-green-700"
                  >${{ product.price.toFixed(2) }}</span
                >
                <span
                  class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                  >{{ product.category }}</span
                >
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-yellow-400">★</span>
                <span class="font-medium text-gray-700">{{
                  product.rating
                }}</span>
                <span class="text-gray-400 text-xs"
                  >({{ product.stock }} in stock)</span
                >
              </div>
              <p class="text-gray-700 text-base leading-relaxed mb-2">
                {{ product.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="tag in product.tags || []"
                  :key="tag"
                  class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                  >#{{ tag }}</span
                >
              </div>
            </div>
          </div>
          <div v-if="product.images && product.images.length > 1" class="mt-4">
            <div class="flex gap-2 overflow-x-auto">
              <img
                v-for="img in product.images"
                :key="img"
                :src="img"
                :alt="product.title"
                class="w-20 h-20 object-contain rounded-lg border bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
