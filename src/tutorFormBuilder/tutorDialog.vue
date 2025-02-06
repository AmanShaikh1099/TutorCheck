
<template>
     <Dialog v-model:visible="visible" modal header="Create/Enroll Student" :style="{ width: '30rem' }">
      

            <!-- Username -->
            <div class="flex flex-col gap-4 mb-4">
                <InputText id="username" class="flex-auto" autocomplete="off" placeholder="Student Name" required />
                <InputText id="email" class="flex-auto" autocomplete="off" placeholder="Email or Phone Number" required />
                <InputText id="Standard" class="flex-auto" autocomplete="off" placeholder="Standard" required />
                <InputText id="Inquiry" class="flex-auto" autocomplete="off" placeholder="Inquiry/Enrollment" required />
                <InputText id="School" class="flex-auto" autocomplete="off" placeholder="School" required />
                <Textarea id="description" v-model="value" rows="5" class="w-full input-field" placeholder="Enter details..." />
            </div>

          
       

        <!-- Footer Buttons -->
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" text severity="secondary" @click="visible = false" />
                <Button label="Save" outlined severity="primary" @click="visible = false" />
            </div>
        </template>
    </Dialog>
</template>

<script>
import { onMounted, ref, watchEffect ,computed} from "vue";
export default {
    name: "tutorDialog",
    props:{
        visibleDialog:
        {
            type: Boolean,
            required: false
        }
    },
    setup(){
        const visible = ref(true);
        const value = ref('');
        
        return {
            visible,
             value,
        }
    }

}
</script>

<style >


</style>