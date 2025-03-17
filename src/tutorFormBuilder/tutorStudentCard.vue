<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="name"
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
        v-model="school"
        class="flex-auto"
        autocomplete="off"
        placeholder="School"
        disabled
      />
      <Select v-model="recieved_name" :options="recieved_person" optionLabel="name" :placeholder="recieved_by" class="flex-auto"/>
      
      <InputText
        v-model="student_class"
        class="flex-auto"
        autocomplete="off"
        placeholder="Class"
        disabled
      />
      <InputText
        v-model="subject"
        class="flex-auto"
        autocomplete="off"
        placeholder="Subject"
        disabled
      />
      <InputText
        v-model="amountRecieved"
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
        <Button label="Save" :class="{ 'p-button-danger': isActive }" @click="emitChangeInRecievedAmount" />
      </div>
    </template>
  </Dialog>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "tutorStudentCard",
  props: {
    studentInfo: {
      type: Object,
      required: true,
    },
  },
  emit:["changeRecievedAmount"],
  setup(props,{emit}) {
    console.log(props.studentInfo);
    const visible = ref(true);
    const recieved_person = [{
      "name": "Akhtar Sir"
    },{
      "name": "Mukesh Sir"
    }]
    const isActive = ref(false);
    const {
      name,
      student_id,
      parent_contact,
      student_class,
      enrolled_subjects,
      school,
      amount_quoted,
      recieved_by,
      amount_recieved,
    } = props.studentInfo;
    const subject = enrolled_subjects.reduce((acc, curr) => {
      acc += " " + curr.name;
      return acc;
    }, "");
    const recieved_name = ref(recieved_by)
    const emitChangeInRecievedAmount = () =>{
      emit("changeRecievedAmount",{
        id: student_id,
        amount_recieved: amountRecieved.value,
        recieved_by: recieved_name.value.name?recieved_name.value.name:recieved_by,
        date: new Intl.DateTimeFormat("en-GB").format(new Date())
 });
      visible.value = false;
    }
    const amountRecieved = ref(amount_recieved);
    watch(amountRecieved, () => {
      console.log(recieved_name.value,recieved_by)
      if (amountRecieved.value !== amount_recieved) {
        isActive.value = true;
      }
    });
    return {
      name,
      parent_contact,
      student_class,
      school,
      amount_quoted,
      amount_recieved,
      visible,
      amountRecieved,
      subject,
      isActive,
      recieved_person,
      recieved_by,
      recieved_name,
      emitChangeInRecievedAmount
    };
  },
};
</script>

