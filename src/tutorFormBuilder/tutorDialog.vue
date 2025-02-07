
<template>
     <Dialog v-model:visible="visible" modal header="Create an Inquiry " :style="{ width: '30rem' }">
      

            <!-- Username -->
            <div class="flex flex-col gap-4 mb-4">
                <InputText id="username" v-model = "userNameValue" class="flex-auto" autocomplete="off" placeholder="Student Name" required />
                <InputText id="email" v-model = "emailValue" class="flex-auto" autocomplete="off" placeholder="Email or Phone Number" required />
                <InputText id="Standard" v-model = "standardValue" class="flex-auto" autocomplete="off" placeholder="Standard" required />
                <InputText id="School" v-model = "schoolValue" class="flex-auto" autocomplete="off" placeholder="School" required />
                <Textarea id="description" v-model="descriptionValue" rows="5" class="w-full input-field" placeholder="Enter details..." />
            </div>

        <!-- Footer Buttons -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" text severity="secondary" @click="visible = false" />
                <Button label="Save" outlined severity="primary" @click="sendNewStudentQuery" />
            </div>
        </template>
    </Dialog>
</template>

<script>
import { data } from "autoprefixer";
import { onMounted, ref, watchEffect ,computed} from "vue";
export default {
    name: "tutorDialog",
    props:{
        visibleDialog:
        {
            type: Boolean,
            required: false
        }
    },
    emit: ["sendQuery"],
    setup(_, { emit }) {
        const visible = ref(true);
        const descriptionValue = ref('');
        const userNameValue = ref('');
        const emailValue = ref('');
        const standardValue = ref('');
        const inquiryValue = ref('');
        const schoolValue = ref('');

        const sendNewStudentQuery = () => {
            emit('sendQuery', {
                description: descriptionValue.value,
                name: userNameValue.value,
                parent_contact: emailValue.value,
                class: standardValue.value,
                enrolled: inquiryValue.value.toLocaleLowerCase() ==='enrolled'.toLocaleLowerCase() ? true : false,
                school: schoolValue.value
            });
            visible.value = false;
        }

        
        return {
            visible,
            descriptionValue,
            userNameValue,
            emailValue,
            standardValue,
            schoolValue,

            sendNewStudentQuery
        }
    }

}
</script>

<style >


</style>