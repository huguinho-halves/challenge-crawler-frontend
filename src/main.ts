import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import Notifications from "@kyvg/vue3-notification";

const app = createApp(App);

app.use(router);
app.use(Notifications);

app.component("EasyDataTable", Vue3EasyDataTable);

app.mount("#app");
