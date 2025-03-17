import './assets/main.css'
import '../src/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import tutorCheckForm from './components/tutorCheckForm.vue'
import { Column, DataTable, AutoComplete} from 'primevue'
import tutorDataTable from './tutorFormBuilder/tutorDataTable.vue'
import tutorDropDown from './tutorFormBuilder/tutorDropDown.vue'
import tutorDialog from './tutorFormBuilder/tutorDialogNewInquiry.vue'
import tutorLogin from './login/tutorLogin.vue'
import PrimeVue from 'primevue/config'
import TutorButton from './tutorFormBuilder/tutorButton.vue'
import Button from 'primevue/button'
import Lara from '@primevue/themes/lara'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import TextArea from 'primevue/textarea'
import router from './router/router.js'
import TutorDialogEnrollStudent from './tutorFormBuilder/tutorDialogEnrollStudent.vue'
import MultiSelect from 'primevue/multiselect'
import Select from 'primevue/select'
import tutorStudentCard from './tutorFormBuilder/tutorStudentCard.vue'
import Card from 'primevue/card'
import tutorPaymentCard from './tutorFormBuilder/tutorPaymentCard.vue'
import tutorDialogConfirmation from './tutorFormBuilder/tutorDialogConfirmation.vue'

import "primeicons/primeicons.css"


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('tutorCheckForm',tutorCheckForm)
app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('AutoComplete',AutoComplete)
app.component('Button',Button)
app.component('Dialog',Dialog)
app.component('InputText',InputText)
app.component('Textarea',TextArea)
app.component('MultiSelect',MultiSelect)
app.component('Select',Select)
app.component('Card',Card)


app.component('tutorDataTable',tutorDataTable)
app.component('tutorDropDown',tutorDropDown)
app.component('tutorButton',TutorButton)
app.component("tutorDialog",tutorDialog)
app.component('tutorLogin',tutorLogin)
app.component('tutorDialogEnrollStudent',TutorDialogEnrollStudent)
app.component('tutorStudentCard',tutorStudentCard)
app.component('tutorPaymentCard',tutorPaymentCard)
app.component('tutorDialogConfirmation',tutorDialogConfirmation)


app.use(PrimeVue,{
     theme: {
        preset: Lara,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.mount('#app')
