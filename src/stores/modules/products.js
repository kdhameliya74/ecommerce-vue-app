const filters = {
  search: "",
  selectedCategory: "",
  sortBy: "",
};
export default {
  namespaced: true,
  state: {
    products: [],
    loading: false,
    error: null,
    skip: 0,
    limit: 12,
    hasMore: true,
    filters,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = [...state.products, ...products];
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_SKIP(state) {
      state.skip += state.limit;
    },
    SET_HAS_MORE(state, hasMore) {
      state.hasMore = hasMore;
    },
    SET_FILTERS(state, filters) {
      state.filters = {
        ...state.filters,
        ...filters,
      };
    },
    RESET_FILTERS(state) {
      state.filters = filters;
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      try {
        commit("SET_LOADING", true);
        const response = await fetch(
          `https://dummyjson.com/products?skip=${state.skip}&limit=${state.limit}`
        );
        const data = await response.json();

        commit("SET_PRODUCTS", data.products);
        commit("UPDATE_SKIP");
        commit("SET_HAS_MORE", data.products.length === state.limit);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setFilters({ commit }, filters) {
      commit("SET_FILTERS", filters);
    },
    resetFilters({ commit }) {
      commit("RESET_FILTERS", filters);
    },
  },
  getters: {
    allProducts: (state) => state.products,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    canLoadMore: (state) => state.hasMore,
    categories: (state) => {
      const cats = new Set();
      state.products.forEach((p) => {
        if (p.category) cats.add(p.category);
      });
      return Array.from(cats);
    },
    hasFilters: (state) => Object.values(state.filters).some(Boolean),
    filteredProducts: (state) => {
      let filtered = [...state.products];

      if (state.filters.search) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }

      if (state.filters.selectedCategory) {
        filtered = filtered.filter(
          (p) => p.category === state.filters.selectedCategory
        );
      }

      switch (state.filters.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      return filtered;
    },
  },
};
