
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Enroll Student"
    :style="{ width: '30rem' }"
  >
    <div class="flex flex-col gap-4 mb-4">
      <InputText
        v-model="quotedAmount"
        class="flex-auto"
        autocomplete="off"
        placeholder="Amount Quoted"
      />
      <InputText
        v-model="amountRecieved"
        class="flex-auto"
        autocomplete="off"
        placeholder="Amount Recieved"
      />
      <InputText
        v-model="recievedBy"
        class="flex-auto"
        autocomplete="off"
        placeholder="Recieved By"
      />
      <MultiSelect
        v-model="selectedSubjects"
        showClear
        :options="subjects"
        optionLabel="name"
        filter
        placeholder="Enrolled Subjects"
        :maxSelectedLabels="3"
        class="flex-auto"
      />
      <InputText
        v-for="label in computedLabels"
        :key="label.key"
        class="flex-auto"
        autocomplete="off"
        :placeholder="label.placeholder"
        disabled
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
          @click="sendEnrolledQuery"
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
export default {
  name: "tutorDialogEnrollStudent",
  props: {
    studentId: {
      type: Number,
      required: true,
    },
    visibleDialog: {
      type: Boolean,
      required: false,
    },
    labels: {
      type: Array,
    },
  },
  emit: ["sendEnrollQuery"],
  setup(props, { emit }) {
    console.log(props.labels);
    const visible = ref(true);
    const selectedSubjects = ref();
    const subjects = ref([
      { name: "Maths", code: "MTH" },
      { name: "Physics", code: "PHY" },
      { name: "Chemistry", code: "CHM" },
      { name: "Biology", code: "BIO" },
      { name: "English", code: "ENG" },
    ]);
    const quotedAmount = ref("");
    const amountRecieved = ref("");
    const recievedBy = ref("");
    const computedLabels = computed(() => {
      return props.labels;
    });

    const sendEnrolledQuery = () => {
      console.log(quotedAmount.value, amountRecieved.value, recievedBy.value);
      emit("sendEnrollQuery", {
        id: props.studentId,
        amount_quoted: quotedAmount.value,
        amount_recieved: amountRecieved.value,
        recieved_by: recievedBy.value,
        enrolled_subjects: JSON.stringify(selectedSubjects.value),
        enrolled: true,
      });
      visible.value = false;
    };
    watchEffect(() =>{
      console.log(JSON.stringify(selectedSubjects.value));
    })
    
    return {
      visible,
      quotedAmount,
      amountRecieved,
      recievedBy,
      computedLabels,
      selectedSubjects,
      subjects,

      sendEnrolledQuery,
    };
  },
};
</script>

<style >
</style>