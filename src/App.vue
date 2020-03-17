<template>
  <div>
      <div class="full-width center-content">
        <h1 class="text-3xl">This is from App.vue.</h1>
    </div>
    <div>
        <img src="./images/johnny-cash.png" alt="">
    </div>
    <div>
        <img src="./images/zappa.png" alt="">
    </div>

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

<style scoped>
    .full-width {
        width: 100%;
        background-color: pink;
    }

    .center-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>