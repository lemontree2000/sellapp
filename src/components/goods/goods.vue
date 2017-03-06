<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="selectMenu(index, $event)" class="menu-item" :class="{'current': currentIndex === index}">
          <span class="text border-1px">
            <span v-show="item.type > 0"  class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title"> {{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="..">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <v-cartcontrol :food="food" @add="addFood"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :select-foods="selectFoods" ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
  </div>
    <v-food :food="selectedFood" ref="food" @add="addFood"></v-food>    
</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartconcontrol/cartconcontrol.vue';
  import Food from '../food/food.vue';
  const ERR_OK = 0;
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': Food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._claculateHeight();
          });
        }
      });
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectFood(food, ev) {
        if (!ev._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      selectMenu(index, ev) {
        if (!ev._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _claculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 优化体验，异步执行下落
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
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
        &.current {
          background: #fff;
          position: relative;
          z-index: 10;
          margin-top: -1px;
          font-weight: 700px;
          .text {
            .border-none();
          }
        }
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
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px; 
        padding-bottom: 18px;
        .border-1px(rgba(7,17,27,0.1));
        &:last-child {
          margin-bottom: 0;
          .border-none();
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc,.extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin-bottom: 8px;
            line-height: 14px;
          }
          .extra {
            .count {
              margin-right: 6px;
            }
          }
          .price {
            font-weight: 700px;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }   
          .cart-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }       
        }
      }
    }
  }
</style>
