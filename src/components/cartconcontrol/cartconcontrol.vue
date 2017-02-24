<template>
  <div class="cartconcontrol">
    <div class="cart-decrrease" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0"></div>
    <div class="cart-add"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  
</style>
