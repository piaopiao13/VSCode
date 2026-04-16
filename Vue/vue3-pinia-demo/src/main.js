import { createApp } from "vue";
import { createPinia } from "pinia";
// pinia持久化插件
import persist from "pinia-plugin-persistedstate";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia().use(persist));

app.mount("#app");
