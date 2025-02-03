import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import tutorCheckForm from "./components/tutorCheckForm.vue";
import { Column, DataTable, AutoComplete } from "primevue";
import tutorDataTable from "./tutorFormBuilder/tutorDataTable.vue";
import tutorDropDown from "./tutorFormBuilder/tutorDropDown.vue";
import PrimeVue from "primevue/config";
import TutorButton from "./tutorFormBuilder/tutorButton.vue";
import Button from "primevue/button";
import Lara from "@primevue/themes/lara";

import "primeicons/primeicons.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.component("tutorCheckForm", tutorCheckForm);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("AutoComplete", AutoComplete);
app.component("Button", Button);

app.component("tutorDataTable", tutorDataTable);
app.component("tutorDropDown", tutorDropDown);
app.component("tutorButton", TutorButton);

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.mount("#app");
