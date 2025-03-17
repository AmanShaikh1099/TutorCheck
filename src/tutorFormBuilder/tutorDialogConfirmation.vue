<template>
    <Dialog
      v-model:visible="visible"
      :modal="true"
      :closable="false"
      class="rounded-xl shadow-xl bg-white"
      style="width: 26rem; overflow: hidden"
    >
      <template #header>
        <div class="flex justify-center items-center w-full">
          <h3 class="text-2xl font-bold text-gray-900">Are You Sure?</h3>
        </div>
      </template>
  
      <template #default>
        <div class="text-gray-700 text-center px-6 py-4 flex flex-col items-center">
          <p class="text-xl font-bold">{{ message }}</p>
        </div>
      </template>
  
      <template #footer>
        <div class="flex justify-center gap-4 pb-4">
          <Button 
            label="Cancel" 
            severity="secondary" 
            outlined 
            class="px-6 py-2 rounded-lg border-gray-300 text-gray-600 hover:bg-gray-100"
            @click="closeDialog" 
          />
          <Button 
            label="Confirm" 
            severity="primary" 
            class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            @click="confirmAction" 
          />
        </div>
      </template>
    </Dialog>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "TutorDialogConfirmation",
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {
      const visible = ref(true);
  
      const closeDialog = () => {
        visible.value = false;
        emit("close");
      };
  
      const confirmAction = () => {
        emit("confirm"); 
        visible.value = false;
      };
  
      return { visible, closeDialog, confirmAction };
    },
  };
  </script>

  