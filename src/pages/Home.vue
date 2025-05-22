<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ProductList from "../components/ProductList.vue";

const store = useStore();
onMounted(() => {
  store.dispatch("products/fetchProducts");
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
    <ProductList />
  </div>
</template>
