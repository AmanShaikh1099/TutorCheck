
<template>
     <Dialog v-model:visible="visible" modal header="Create an Inquiry " :style="{ width: '30rem' }">
        <div class="flex flex-col gap-4 mb-4">
      <InputText
        v-model="userNameValue"
        class="flex-auto"
        autocomplete="off"
        placeholder="Student Name"
      />
      <InputText
        v-model="standardValue"
         class="flex-auto"
         autocomplete="off"
        placeholder="Standard"
      />
      <InputText
        v-model="schoolValue"
         class="flex-auto"
        autocomplete="off"
        placeholder="School"
      />
      <InputText
        v-model="emailValue"
         class="flex-auto"
         autocomplete="off"
        placeholder="Parent Contact"
      />
    </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" text severity="secondary" @click="visible = false" />
                <Button label="Save" outlined severity="primary" @click="sendNewStudentQuery" />
            </div>
        </template>
    </Dialog>
</template>

<script>
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
    setup(props, { emit }) {
        const visible = ref(true);
        const userNameValue = ref('');
        const emailValue = ref('');
        const standardValue = ref('');
        const schoolValue = ref('');
       
        const sendNewStudentQuery = () => {
            console.log(userNameValue.value, emailValue.value, standardValue.value,emailValue.value);    
            emit('sendQuery', {
                name: userNameValue.value,
                parent_contact: emailValue.value,
                student_class: standardValue.value,
            });
            visible.value = false;
        }

        
        return {
            visible,
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