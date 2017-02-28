<template>
  <div class="cartconcontrol">
    <transition name="move">
      <div class="cart-decrrease" v-show="food.count>0" @click="decrreaseCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0" >{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addcart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addcart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', 'event.target');
      },
      decrreaseCount(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartconcontrol {
    font-size: 0;
    .cart-decrrease {
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      .inner {
        font-size: 24px;
        height: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.move-enter-active,&.move-leave-acitve {
        transition: all 0.4s linear;
      }
      &.move-enter,&move-leave-active {
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner {
          transform: rotate(180deg);
        }
      }      
    }
    .cart-count {
      display: inline-block;   
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    }
    .cart-add {
      display: inline-block;
      color: rgb(0,160,220);
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
    }
  }
</style>
