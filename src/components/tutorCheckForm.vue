<template>
  <div>
    <tutorButton text="New" type="success" :clickFunction="createNewEntry"></tutorButton>
    <tutorDialog v-if ="visible===true" ></tutorDialog>
    <tutorDropDown
      :options="dropdownOptions"
      @selectedItem="getEnrolledStudentList"
    ></tutorDropDown>
    <div v-if="data.length > 0">
      <tutorDataTable :data="data"></tutorDataTable>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "@/stores/useStudentStore";
import { onMounted, ref, computed, watchEffect } from "vue";
import tutorDataTable from "../tutorFormBuilder/tutorDataTable.vue";
import TutorButton from "../tutorFormBuilder/tutorButton.vue";
export default {
  components: { tutorDataTable, TutorButton },
  name: "tutorCheckForm",
  setup() {
    const student = useStudentStore();
    const dropdownOptions = ref(["Enrolled", "Inquiry"]);
    const data = ref([]);
    const visible = ref(false);
    data.value = student.getStudent();
    const getEnrolledStudentList = (status) => {
      if (status === "Enrolled") {
        data.value = student.getEnrolledStudents();
      } else if (status === "Inquiry") {
        data.value = student.getInquiredStundents();
      } else {
        data.value = student.getStudent();
      }
    };
    const createNewEntry = () =>{
      visible.value = !visible.value;
    }
  watchEffect(() => {
      data.value = student.students;
    });
    return {
      data,
      dropdownOptions,
      visible,
      getEnrolledStudentList,
      createNewEntry
    };
  },
};
</script>

<style  scoped>
</style>