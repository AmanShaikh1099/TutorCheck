<template>
    <Dialog
      v-model:visible="visible"
      modal
      header="Student Information"
      :style="{ width: '30rem' }"
    >
      <div class="flex flex-col gap-4 mb-4">
        <InputText
          v-model="name"
          class="flex-auto"
          autocomplete="off"
          placeholder="Name"
          disabled
        />
        <InputText
          v-model="parent_contact"
          class="flex-auto"
          autocomplete="off"
          placeholder="Parent Contact"
          disabled
        />
        <InputText
          v-model="amount_quoted"
          class="flex-auto"
          autocomplete="off"
          placeholder="Amount Quoted"
          disabled
          />
          <InputText
          v-model="amount_recieved"
          class="flex-auto"
          autocomplete="off"
          placeholder="Amount Recieved"
          />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            label="Cancel"
            text
            severity="secondary"
            @click="visible = false"
          />
          <Button
            label="Save"
            outlined
            severity="primary"
          />
        </div>
      </template>
    </Dialog>
  </template>

<script>
import { ref } from "vue";
export default {
    name: 'tutorStudentCard',
    props:{
        studentInfo:{
            type: Object,
            required: true
        }
    },
    setup(props){
        console.log(props.studentInfo);
        const visible = ref(true);
        const {name, parent_contact, student_class, school,amount_quoted,amount_recieved} = props.studentInfo;
        return {
            name,
            parent_contact,
            student_class,
            school,
            amount_quoted,
            amount_recieved,
            visible
        }
    }
}

</script>

