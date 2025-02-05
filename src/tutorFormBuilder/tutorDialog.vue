
<template>
    <div class="card flex justify-center">
        <Dialog :visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Username</label>
                <InputText id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-2">
                <label for="email" class="font-semibold w-24">Email</label>
                <InputText id="email" class="flex-auto" autocomplete="off" />
            </div>
            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus />
            </template>
        </Dialog>
    </div>
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
    setup(props){
        const visible = ref(false);
        const visibilty = computed(()=>{
            console.log(props.visibleDialog);
            return props.visibleDialog;
        })
        watchEffect(()=>{
           console.log(visibilty.value);
           visible.value = visibilty.value;
           console.log(visible.value);
       })
        return {
            visible,
            visibilty
        }
    }

}
</script>

<style>

</style>