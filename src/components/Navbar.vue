<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { Menu, X, ShoppingCart, User, Heart, Search } from "lucide-vue-next";
import { useStore } from "vuex";

const store = useStore();
const isMenuOpen = ref(false);

const cartItems = computed(() => store.getters["cart/cartItems"]?.length);

const navigation = computed(() => [
  { name: "Home", path: "/" },
  { name: "Cart", path: "/cart", totalProduct: cartItems.value },
]);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="flex-shrink-0 flex items-center">
          <span class="text-2xl font-bold text-gray-900">Shopping.com</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
          >
            {{ item.name }}
            <template v-if="item?.totalProduct">
              <span>({{ item.totalProduct }})</span>
            </template>
          </RouterLink>
        </div>

        <div class="flex md:hidden items-center space-x-4">
          <button
            @click="toggleMenu"
            class="text-gray-600 hover:text-gray-900 p-2"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
      :class="isMenuOpen ? 'opacity-100' : 'opacity-0'"
      @click="closeMenu"
    ></div>
    <div
      class="md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="pt-5 pb-6 px-5">
        <div class="flex items-center justify-between mb-8">
          <RouterLink to="/" class="text-2xl font-bold text-gray-900"
            >Shopping.com</RouterLink
          >
          <button
            @click="closeMenu"
            class="text-gray-600 hover:text-gray-900 p-2"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
        <div class="space-y-6">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="block text-gray-600 hover:text-gray-900 text-lg font-medium transition-colors duration-200"
            @click="closeMenu"
          >
            {{ item.name }}
            <template v-if="item?.totalProduct">
              <span>({{ item.totalProduct }})</span>
            </template>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
