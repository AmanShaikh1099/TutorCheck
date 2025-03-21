<template>
  <div class="p-6 pr-12 bg-gray-50 rounded-lg shadow-md relative">
    <!-- New Entry Button -->
    <div class="relative">
      <tutorButton
        text="New"
        type="success"
        :clickFunction="() => dialog.openDialog()"
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
      v-if="dialog.isDialogOpen === true"
      :labelsArray="dialogLabels"
      @sendQuery="updateStudentList"
    ></tutorDialog>
    <tutorDialogEnrollStudent v-if = "dialog.isEnrollDialogOpen" :studentId = "studentId" :labels = "dialogLabels" @sendEnrollQuery = "enrollStudentInList"></tutorDialogEnrollStudent>
    <tutorStudentCard v-if = "dialog.isStudentDialogOpen" :studentInfo = "studentData" @changeRecievedAmount = "sendChangeInRecievedAmount"></tutorStudentCard>
    <tutorPaymentCard v-if = "dialog.isPaymentDialogOpen" :studentName = "studentName" :studentPayments= "studentPaymentsDetails" :amountQuoted = "studentAmountQuoted"></tutorPaymentCard>
    <tutorDialogConfirmation v-if = "dialog.isConfirmationDialogOpen" :message = "dialogMessage" @confirm = "deleteStudents(studentId)"></tutorDialogConfirmation>
   <!-- Data Table -->
    <div v-if="data.length > 0" class="mt-6">
      <tutorDataTable
        :dataEntries="data"
        @rowData = "addLabels"
        @studentData = "getStudentDetails"
        @deletedStudent="openDialogConfirmationDeletion"
        @paymentData = "getStudentPaymentDetails"
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
import tutorPaymentCard from "@/tutorFormBuilder/tutorPaymentCard.vue";
import TutorDialogConfirmation from "@/tutorFormBuilder/tutorDialogConfirmation.vue";
import { useDialogStore } from "@/stores/useDialogStore";
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
    const studentName = ref("");
    const studentId = ref(0)
    const dialog = useDialogStore()
    const studentPaymentsDetails = ref([]);
    const visiblePaymentDialog = ref(false);
    const visibleEnrollDialog = ref(false);
    const visibleConfirmationDialog = ref(false)
    const studentAmountQuoted = ref(0)
    const columnComponent = ref(markRaw(TutorButton));
    const dialogMessage = ref('')
    const createNewEntry = () =>{
      console.log(visible.value)
      visible.value = !visible.value;
    }
    const getStudentDetails = (data) => {
    student.getStudentWithId(data.student_id).then((response) => {
      studentData.value = response;
      dialog.isStudentDialogOpen = true
    }).catch((error) => {
      console.log(error);
    })
    
      
    }
    const enrollStudent = () =>{
      dialog.isEnrollDialogOpen = true
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
    student.addStudentPayments(amount.id,amount);
  }
  const deleteStudents = (studentId) =>{
    student.deleteStudent(studentId);
  }
  const openDialogConfirmationDeletion = (id)=>{
     student.getStudentWithId(id).then(response =>{
      studentId.value = id;
      studentName.value = response.name
      dialogMessage.value = "All Records for "+ studentName.value +" Would be deleted (including Payments)"
      dialog.isConfirmationDialogOpen = true
     })
     .catch(error =>{
      console.log(error)
     })
  }
  const getStudentPaymentDetails = (studentId) =>{
    student.getStudentPayments(studentId).then((response)=> {
      studentName.value = response.name
      studentPaymentsDetails.value = response.data
      studentAmountQuoted.value = response.amount_quoted
      dialog.isPaymentDialogOpen = true
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
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
      getStudentPaymentDetails,
      columnComponentProps,
      columnComponent,
      studentId,
      dialogLabels,
      visibleEnrollDialog,
      getStudentDetails,
      studentData,
      visibleStudentDialog,
      sendChangeInRecievedAmount,
      deleteStudents,
      studentName,
      studentPaymentsDetails,
      visiblePaymentDialog,
      studentAmountQuoted,
      openDialogConfirmationDeletion,
      dialogMessage,
      visibleConfirmationDialog,
      dialog
      
    };
  },
};
</script>

<style  scoped>
</style>