<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ProductTile from "~/components/ProductTile.vue";
import { debounce } from "~/utils/helpers.js";
import { X } from "lucide-vue-next";

const store = useStore();

const products = computed(() => store.getters["products/filteredProducts"]);
const isLoading = computed(() => store.getters["products/isLoading"]);
const canLoadMore = computed(() => store.getters["products/canLoadMore"]);
const categories = computed(() => store.getters["products/categories"]);
const hasFilters = computed(() => store.getters["products/hasFilters"]);

const showLoadMore = computed(
  () =>
    canLoadMore.value &&
    !isLoading.value &&
    products.value.length &&
    !hasFilters.value
);
const filters = computed(() => store.state.products.filters);

const loadMore = () => {
  store.dispatch("products/fetchProducts");
};

const setFilters = (e) => {
  store.dispatch("products/setFilters", {
    [e.target.name]: e.target.value,
  });
};
const debouncedSearch = debounce((e) => {
  store.dispatch("products/setFilters", {
    search: e.target.value,
  });
});
const resetFilter = () => {
  store.dispatch("products/resetFilters");
};
</script>
<template>
  <div class="mb-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
    <div class="flex-1">
      <input
        @input="debouncedSearch"
        :value="filters.search"
        type="text"
        name="search"
        placeholder="Search products..."
        class="w-full border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <select
        :value="filters.selectedCategory"
        name="selectedCategory"
        @change="setFilters"
        class="border w-full md:w-auto border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <div>
      <select
        :value="filters.sortBy"
        name="sortBy"
        @change="setFilters"
        class="w-full md:w-auto border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>
    <div v-if="hasFilters">
      <button
        @click="resetFilter"
        class="flex gap-2 border shadow-md border-gray-200 py-1.5 px-3 cursor-pointer hover:bg-red-100 transition-colors duration-200 rounded-full text-sm items-center"
      >
        Reset Filters <X class="text-red-400" />
      </button>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    v-if="products.length"
  >
    <ProductTile
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
  <div
    v-if="filters.search && !isLoading && !products.length"
    class="text-3xl w-full text-center mt-10 text-gray-700 font-semibold"
  >
    No Product Found
  </div>

  <div v-if="isLoading" class="flex justify-center my-8">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
    ></div>
  </div>

  <div v-if="showLoadMore" class="flex justify-center mt-8">
    <button
      @click="loadMore"
      class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Load More
    </button>
  </div>
</template>
