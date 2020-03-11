<template>
  <div>
    <h1>This is from App.vue</h1>
    <message-component name="Vue.js"/>
  </div>
</template>

<script>

//import MessageComponent from './components/MessageComponent'
import MessageComponent from 'components/MessageComponent'

export default {
    name: 'app',
    components: {
        MessageComponent
    }        
}
</script>