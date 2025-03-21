import { defineStore } from "pinia";
export const useDialogStore = defineStore("Dialog",{
    state: () =>{
        return {
            isDialogOpen: false,
            isEnrollDialogOpen: false,
            isStudentDialogOpen: false,
            isPaymentDialogOpen: false,
            isConfirmationDialogOpen: false
        }
    },
    actions: {
        openDialog(){
            console.log(this.isDialogOpen)
            this.isDialogOpen = true;
            return this.isDialogOpen
        },
        closeDialog(){
            this.isDialogOpen = false;
            return this.isDialogOpen
        }

    }
});