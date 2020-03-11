<template>
  <div>
    <p>This is from MessageComponent.vue</p>   
    <h2>Hello {{name}}!</h2>
  </div>
</template>

<script>
export default {
    name: "MessageComponent",    
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>
