<template>
  <div>
    <Button  :disabled="disabled" @click="clickFunction" :label="text" :severity="type" />
  </div>
    
  
</template>

<script>
export default {
    name: 'tutorButton',
    props: {
        text: {
            type: String,
            required: true},
        type: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clickFunction: {
            type: Function,
            default: () => {}
        }
    },
    setup(props){
    console.log(props.type)
    console.log(props.clickFunction)
    }

}
</script>

<style>

</style>