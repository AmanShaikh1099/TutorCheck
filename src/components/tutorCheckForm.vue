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
      :labelsArray="dialogLabels"
      @sendQuery="updateStudentList"
    ></tutorDialog>
    <tutorDialogEnrollStudent v-if = "visibleEnrollDialog" :studentId = "studentId" :labels = "dialogLabels" @sendEnrollQuery = "enrollStudentInList"></tutorDialogEnrollStudent>
    <tutorStudentCard v-if = "visibleStudentDialog" :studentInfo = "studentData" @changeRecievedAmount = "sendChangeInRecievedAmount"></tutorStudentCard>
   <!-- Data Table -->
    <div v-if="data.length > 0" class="mt-6">
      <tutorDataTable
        :dataEntries="data"
        @rowData = "addLabels"
        @studentData = "getStudentDetails"
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
import { useRouter } from "vue-router";
export default {
  components: { tutorDataTable, TutorButton },
  name: "TutorCheckForm",
  setup() {
    const student = useStudentStore();
    const dropdownOptions = ref(["Enrolled", "Inquiry"]);
    const data = ref([]);
    const dialogLabels = ref([])
    const visible = ref(false);
    const router = useRouter();
    const visibleStudentDialog = ref(false);
    const studentData = ref({});
    const visibleEnrollDialog = ref(false);
    const columnComponent = ref(markRaw(TutorButton));
    const studentId = ref(0);
    const createNewEntry = () =>{
      visible.value = !visible.value;
    }
    const getStudentDetails = (data) => {
    student.getStudentWithId(data.student_id).then((response) => {
      studentData.value = response;
      visibleStudentDialog.value = !visibleStudentDialog.value;
    }).catch((error) => {
      console.log(error);
    })
      
    }
    const enrollStudent = () =>{
      visibleEnrollDialog.value = !visibleEnrollDialog.value;
    }
    const addLabels = (data) => {
      dialogLabels.value = [];
      studentId.value = data.student_id;
      let i = 0;
      console.log(data);
      if(data){
      Object.values(data).forEach((element) => {
          dialogLabels.value.push({
            "key": i,
            "placeholder": element,
            "disabled": true
          });
          i++;
        });
      }
    }
    const columnComponentProps = ref({
      text: "Enroll",
      type: "info",
      clickFunction: enrollStudent,
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
    const enrollStudentInList = (students) =>{
      console.log(students);
      student.enrollStudent(students);
    }
  const sendChangeInRecievedAmount = (amount) =>{
    student.enrollStudent(amount);
  }
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
      addLabels,
      enrollStudentInList,
      columnComponentProps,
      columnComponent,
      studentId,
      dialogLabels,
      visibleEnrollDialog,
      getStudentDetails,
      studentData,
      visibleStudentDialog,
      sendChangeInRecievedAmount
      
    };
  },
};
</script>

<style  scoped>
</style>