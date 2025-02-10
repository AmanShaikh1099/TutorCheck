<template>
  <div class="p-6 pr-12 bg-gray-50 rounded-lg shadow-md relative">
    <!-- New Entry Button -->
    <div class="relative">
      <tutorButton
        text="New"
        type="success"
        :clickFunction="createNewEntry"
        class="bg-green-500 text-white px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 absolute top-0 right-0"
      ></tutorButton>

      <tutorDropDown
        :options="dropdownOptions"
        @selectedItem="getEnrolledStudentList"
        class="mt-12 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
      ></tutorDropDown>
    </div>

    <!-- Tutor Dialog -->
    <tutorDialog
      v-if="visible === true"
      @sendQuery="updateStudentList"
    ></tutorDialog>

   <!-- Data Table -->
    <div v-if="data.length > 0" class="mt-6">
      <tutorDataTable
        :dataEntries="data"
        class="border-t border-gray-300 shadow-sm rounded-md overflow-hidden"
        :column-component="columnComponent"
        :column-component-props="columnComponentProps"
        :lazy-load="true"
      ></tutorDataTable>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "@/stores/useStudentStore";
import { onMounted, ref, computed, watchEffect,markRaw } from "vue";
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
    const columnComponent = ref(markRaw(TutorButton));
    const createNewEntry = () =>{
      visible.value = !visible.value;
    }
    const columnComponentProps = ref({
      text: "Enroll",
      type: "info",
      clickFunction: createNewEntry,
    });
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
    const updateStudentList = (newStudent) => {
      student.addStudent(newStudent);
    };
  watchEffect(() => {
      data.value = student.students;
    });
    return {
      data,
      dropdownOptions,
      visible,
      getEnrolledStudentList,
      createNewEntry,
      updateStudentList,
      columnComponentProps,
      columnComponent
    };
  },
};
</script>

<style  scoped>
</style>