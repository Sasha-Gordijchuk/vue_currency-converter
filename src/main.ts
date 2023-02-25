import { createApp } from "vue";
import App from "./App.vue";
import UIComponents from "@/components/UI";
import "./assets/main.scss";

const app = createApp(App);

UIComponents.forEach((UIComponent) => {
  app.component(UIComponent.name, UIComponent);
});

app.mount("#app");
