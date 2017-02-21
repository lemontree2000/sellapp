<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type > 0"  class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1> {{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="..">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>    
</template>

<script>
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
@import '../../common/less/mixin';
  .goods {
    position: absolute;
    display: flex;
    width:100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          &.decrease {
            .bg-image('goods/decrease_3');
          }
          &.discount {
            .bg-image('goods/discount_3');
          }
          &.guarantee {
            .bg-image('goods/guarantee_3');
          }
          &.invoice {
            .bg-image('goods/invoice_3');
          }
          &.special {
            .bg-image('goods/special_3');
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;   
          .border-1px(rgba(7,17,27,0.1));
        }
      }
    }
    .foods-wrapper {
      flex: 1;
    }
  }
</style>
