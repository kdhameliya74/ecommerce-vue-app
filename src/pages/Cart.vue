<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { X } from "lucide-vue-next";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.getters["cart/cartItems"]);
const cartTotal = computed(() => store.getters["cart/cartTotal"]);

const updateQuantity = (productId, quantity) => {
  if (quantity < 1) return;
  store.dispatch("cart/updateQuantity", { productId, quantity });
};

const removeFromCart = (productId) => {
  store.dispatch("cart/removeFromCart", productId);
};

const checkout = () => {
  alert("Proceeding to checkout!");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div
      class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col lg:flex-row gap-8"
    >
      <div class="flex-1">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Your Cart</h1>
          <button
            @click="() => router.push('/')"
            class="text-3xl font-light hover:text-gray-500"
          >
            &times;
          </button>
        </div>
        <div
          class="hidden md:grid grid-cols-12 gap-4 px-2 pb-2 text-gray-500 font-medium border-b"
        >
          <div class="col-span-5">PRODUCT</div>
          <div class="col-span-2 text-center">PRICE</div>
          <div class="col-span-2 text-center">QUANTITY</div>
          <div class="col-span-2 text-center">TOTAL</div>
          <div class="col-span-1"></div>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex flex-col md:grid md:grid-cols-12 gap-4 items-center border-b py-4 group bg-gray-50 md:bg-transparent rounded-xl md:rounded-none"
          >
            <div class="flex items-center gap-4 col-span-5 w-full md:w-auto">
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="w-16 h-16 rounded-lg object-cover bg-gray-100 border"
              />
              <div>
                <div class="font-semibold text-gray-800">{{ item.title }}</div>
                <div class="text-gray-500 text-sm">
                  {{ item.brand || item.category }}
                </div>
              </div>
            </div>

            <div
              class="col-span-2 w-full md:w-auto flex md:block justify-between md:justify-center items-center"
            >
              <span class="font-medium text-gray-700 block md:text-center"
                >${{ item.price }}</span
              >
              <span class="md:hidden text-gray-400 text-xs">Price</span>
            </div>

            <div
              class="col-span-2 w-full md:w-auto flex md:block justify-between md:justify-center items-center"
            >
              <div
                class="flex items-center gap-2 border rounded-full px-2 py-1 w-max bg-white mx-auto"
              >
                <button
                  @click="() => updateQuantity(item.id, item.quantity - 1)"
                  class="px-2 cursor-pointer text-lg font-bold text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span class="px-2 min-w-[2ch] text-center">{{
                  item.quantity
                }}</span>
                <button
                  @click="() => updateQuantity(item.id, item.quantity + 1)"
                  class="px-2 cursor-pointer text-lg font-bold text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
              <span class="md:hidden text-gray-400 text-xs">Qty</span>
            </div>

            <div
              class="col-span-2 w-full md:w-auto flex md:block justify-between md:justify-center items-center"
            >
              <span class="font-semibold text-gray-800 block md:text-center"
                >${{ (item.price * item.quantity).toFixed(2) }}</span
              >
              <span class="md:hidden text-gray-400 text-xs">Total</span>
            </div>

            <div class="col-span-1 flex justify-end w-full md:w-auto">
              <button
                @click="() => removeFromCart(item.id)"
                class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer hover:bg-red-600 rounded-full p-1"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            v-if="cartItems.length === 0"
            class="py-8 text-center text-gray-400"
          >
            Your cart is empty.
          </div>
        </div>
      </div>

      <div
        class="w-full lg:w-96 bg-gray-100 rounded-xl p-6 flex flex-col gap-6 h-max"
      >
        <h2 class="text-xl font-semibold mb-2">Order Summary</h2>
        <div class="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span class="font-medium text-green-600">Free</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-green-700 cursor-pointer hover:underline text-sm"
            >Add coupon code <span class="ml-1">→</span></span
          >
        </div>
        <div class="border-t pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button
          @click="checkout"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  </div>
</template>
