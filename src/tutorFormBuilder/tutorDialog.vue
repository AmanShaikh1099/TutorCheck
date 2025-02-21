
<template>
     <Dialog v-model:visible="visible" modal header="Create an Inquiry " :style="{ width: '30rem' }">
      

            <!-- Username -->
            <div class="flex flex-col gap-4 mb-4">
                <InputText v-for = "labels in labelsArray" :key ="labels.key" v-model = "labelValue[labels.placeholder]" class="flex-auto" autocomplete="off" :placeholder="labels.placeholder" :disabled="labels.disabled" />
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
        },
        labelsArray:{
            type: Array,
            required: true,
        }
    },
    emit: ["sendQuery"],
    setup(props, { emit }) {
        const visible = ref(true);
        const descriptionValue = ref('');
        const userNameValue = ref('');
        const emailValue = ref('');
        const standardValue = ref('');
        const inquiryValue = ref('');
        const schoolValue = ref('');
        const labelValue = ref([])
        props.labelsArray.forEach((label) => {
            labelValue.value.push({
                "key":label.key,
                "placeholder":"",
                "disabled":label.disabled
            })
        })
        const sendNewStudentQuery = () => {
            console.log(labelValue.value)
            emit('sendQuery', {
                name: userNameValue.value,
                parent_contact: emailValue.value,
                student_class: standardValue.value,
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
            labelValue,

            sendNewStudentQuery
        }
    }

}
</script>

<style >


</style>