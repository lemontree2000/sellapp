<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="image-header">
        <img :src="food.image" alt="..">
      </div> 
    </div>  
  </transition>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      };
    },
    methods: {
      show () {
        this.showFlag = true;
      }
    }
  };
</script>

<style lang="less">
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30 ;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0,0,0);    
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%,0,0);
    }
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear;
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }  
</style>
