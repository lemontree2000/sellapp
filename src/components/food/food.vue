<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div> 
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}%</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food" ></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">
              加入购物车
              </div>
          </transition>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings="food.ratings" 
                        :selectType="selectType" 
                        :onlyContent="onlyContent" 
                        @select="selectRating"
                        @toggle="toggleContent"
                        :desc="desc">
          </ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li  v-for="ratings in food.ratings" v-show="needShow(ratings.rateType,ratings.text)" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{ ratings.username }}</span>
                  <img :src="ratings.avatar" width="12" height="12" class="avatar" alt="...">
                </div>
                <div class="time">{{ ratings.rateTime | formatDate }}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':ratings.rateType===0,'icon-thumb_down':ratings.tateType===1}"></span>{{ratings.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>  
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartconcontrol/cartconcontrol';
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import {formatDate} from '../../common/js/date';
  const ALL = 2;
  
  export default {
    components: {
      'cartcontrol': cartcontrol,
      'v-split': split,
      'ratingselect': ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      hide() {
        this.showFlag = false;
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      }
    }
  };
</script>

<style lang="less">
@import "../../common/less/mixin.less";
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30 ;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0,0,0);  
    .food-content {
      padding-bottom: 8px;
    }  
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
      .back {
        position: absolute;
        top: 0;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      padding: 18px;
      position: relative;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count,.rating {
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240,20,20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;  
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        line-height: 24px;
        font-size: 10px;
        z-index: 10;
        background: rgb(0,160,220);
        border-radius: 12px;
        color: #fff;
        padding: 0 12px;
        height: 24px;
        box-sizing: border-box;
        opacity: 1;
        &.fade-enter-acitve,&.fade-leave-active {
          transition: all 0.2s;
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
          z-index: -1;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 16px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .text {
        color: rgb(77,85,93);
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px;
          .border-1px(rgba(7,17,27,0.1));
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              font-size: 10px;
              display: inline-block;
              vertical-align: top;
              color: rgb(147,153,159);
              margin-right: 6px;
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(147,153,159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down {
              line-height: 24px;
              margin-right: 4px;
              font-size: 12px;
            }
            .icon-thumb_up {
              color: rgb(0,160,220);
            }
            .icon-thumb_down {
              color: rgb(147,153,159);
            }
          } 
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }  
</style>
