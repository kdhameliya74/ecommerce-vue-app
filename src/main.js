import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./stores";

const app = createApp(App);
router.beforeEach((to, _, next) => {
  const isCartRoute = to.path === "/cart";
  const hasCartItems = !!store.getters["cart/cartItems"]?.length;
  if (isCartRoute && !hasCartItems) {
    return next("/");
  }
  next();
});

app.use(router);
app.use(store);
app.mount("#app");
