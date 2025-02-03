<template>
  <div>
    <Button  :disabled="disabled" @click="click" :label="text" :severity="type" />
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
        click: {
            type: Function,
            default: () => {}
        }
    },
    setup(props){
    console.log(props.type)
    }

}
</script>

<style>

</style>