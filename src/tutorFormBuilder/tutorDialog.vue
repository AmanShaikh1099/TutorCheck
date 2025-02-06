
<template>
     <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '30rem' }">
        <span class="text-gray-500 dark:text-gray-400 block mb-6">
            Update your information.
        </span>

        <div class="space-y-4">
            <!-- Username -->
            <div class="flex items-center gap-4">
                <label for="username" class="font-semibold w-32 text-gray-700">Username</label>
                <InputText id="username" class="flex-auto" autocomplete="off" placeholder="Student Name" required />
            </div>

            <!-- Parent Contact -->
            <div class="flex items-center gap-4">
                <label for="email" class="font-semibold w-32 text-gray-700">Parent Contact</label>
                <InputText id="email" class="flex-auto" autocomplete="off" placeholder="Parent Contact" required />
            </div>

            <!-- Standard -->
            <div class="flex items-center gap-4">
                <label for="Standard" class="font-semibold w-32 text-gray-700">Standard</label>
                <InputText id="Standard" class="flex-auto" autocomplete="off" placeholder="Standard" required />
            </div>

            <!-- Inquiry/Enrollment -->
            <div class="flex items-center gap-4">
                <label for="Inquiry" class="font-semibold w-32 text-gray-700">Inquiry</label>
                <InputText id="Inquiry" class="flex-auto" autocomplete="off" placeholder="Inquiry/Enrollment" required />
            </div>

            <!-- School -->
            <div class="flex items-center gap-4">
                <label for="School" class="font-semibold w-32 text-gray-700">School</label>
                <InputText id="School" class="flex-auto" autocomplete="off" placeholder="School" required />
            </div>

            <!-- Description -->
            <div class="flex flex-col gap-2">
                <label for="description" class="font-semibold text-gray-700">Description</label>
                <Textarea id="description" v-model="value" rows="5" class="w-full input-field" placeholder="Enter details..." />
            </div>
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