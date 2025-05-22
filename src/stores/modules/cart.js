export default {
  namespaced: true,
  state: {
    items: [],
    total: 0
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingItem = state.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({
          ...product,
          quantity: 1
        })
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    REMOVE_FROM_CART(state, productId) {
      state.items = state.items.filter(item => item.id !== productId)
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    },
    CLEAR_CART(state) {
      state.items = []
      state.total = 0
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  },
  getters: {
    cartItems: state => state.items,
    cartTotal: state => state.total,
    cartItemCount: state => state.items.reduce((count, item) => count + item.quantity, 0)
  }
} 