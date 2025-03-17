<template>
    <Dialog
      v-model:visible="visible"
      :modal="true"
      :closable="true"
      class="rounded-lg shadow-lg"
      style="width: 28rem; overflow: hidden"
    >
      <template #header>
        <h3 class="text-xl font-semibold text-gray-800">Payment Details for {{ studentName }}</h3>
      </template>
  
      <template #default>
        <div class="p-4 flex flex-col gap-4">
          <!-- Highlighted Amount Quoted -->
          <div class="p-3 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <p class="text-lg font-semibold text-blue-700">
              Amount Quoted: <span class="text-gray-900">{{ amountQuoted }} ₹</span>
            </p>
          </div>
  
          <!-- Payment List -->
          <div 
            v-for="payment in studentPayments" 
            :key="payment.id" 
            class="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-sm"
          >
            <p class="text-gray-700">
              <span class="font-semibold">Amount Paid:</span> {{ payment.amount_recieved }} ₹
            </p>
            <p class="text-gray-700">
              <span class="font-semibold">Date:</span> {{ payment.date }}
            </p>
            <p class="text-gray-700">
              <span class="font-semibold">Received By:</span> {{ payment.recieved_by }}
            </p>
          </div>
  
          <!-- Highlighted Balance Amount -->
          <div class="p-3 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-sm">
            <p class="text-lg font-semibold text-red-700">
              Balance Amount: <span class="text-gray-900">{{ balanceAmount }} ₹</span>
            </p>
          </div>
        </div>
      </template>
  
      <template #footer>
        <div class="flex justify-end gap-3 mt-4">
          <Button label="Close" severity="secondary" outlined class="px-5 py-2 rounded-lg" @click="visible = false" />
        </div>
      </template>
    </Dialog>
  </template>
  
  
<script>
import {ref} from 'vue'
export default {
    name: "tutorPaymentCard",
    props: {
        studentName: {
            type: String,
            required: true,
        },
        amountQuoted: {
            type: Number,
            required: true,
        },
        studentPayments: {
            type: Array,
            required: true,
        }
    },
    setup(props){
        const totalAmountRecieved = props.studentPayments.reduce((acc,item)=>{
            return acc + item.amount_recieved
        },0)
        const balanceAmount = props.amountQuoted - totalAmountRecieved
        console.log(totalAmountRecieved)
        const visible = ref(true);
        return {visible,totalAmountRecieved, balanceAmount}
    }

}
</script>

<style>

</style>