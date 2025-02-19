
<template>
    <div class="flex flex-col w-full max-w-sm mx-auto p-6 bg-white rounded-lg gap-6">
      <InputText
        v-model="userName"
        placeholder="Username"
        
      />
      <InputText
        v-model="password"
        placeholder="Password"
        type="password"
       
      />
      <tutorButton 
        text="Login" 
        type="primary" 
        :clickFunction="onSubmit"
        
      />
    </div>
  </template>
  


<script>
import { useStudentStore } from "@/stores/useStudentStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "tutorLogin",
  setup() {
    const userName = ref("");
    const password = ref("");
    const store = useStudentStore()
    const router = useRouter()
    const onSubmit = ()=>{
       store.userLogin(userName.value,password.value)
       router.push('/tutorCheckForm')
    }
    
    return {
        userName,
        password,
        onSubmit
    };
  },
};
</script>
