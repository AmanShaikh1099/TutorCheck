
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
        :clickFunction="$emit('user-login', userName, password)"
        
      />
    </div>
  </template>
  


<script>
import { ref } from "vue";
export default {
  name: "tutorLogin",
  setup() {
    const userName = ref("");
    const password = ref("");
  
    return {
        userName,
        password
    };
  },
};
</script>
