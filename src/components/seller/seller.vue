<template>
    <div class="seller" ref="seller">
      <div class="seller-container">
        <div class="overview">
          <h1 class="title">
            {{seller.name}}
          </h1>
          <div class="desc border-1px">
            <v-star :size="36" :score="seller.score"></v-star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active': favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">
              {{seller.bulletin}}
            </p>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item border-1px" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">
            商家实景
          </h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" width="120" height="90" alt="">
              </li>
            </ul>
          </div>
        </div> 
        <split></split>
        <div class="info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="info-item" v-for="info in seller.infos">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': star,
      'split': split
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = [
        'decrease',
        'descount',
        'special',
        'invoice',
        'guarantee'
      ];
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPic();
        });
      }
    },
    methods: {
      _initScroll() {
        console.log(1);
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPic() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          console.log(this.$refs.picList);
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                click: true,
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initPic();
        this._initScroll();
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin.less';
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .seller-container {
      .overview {
        position: relative;
        padding: 18px 18px 0 18px;
        .title {
          font-size: 16px;
          color: rgb(7,17,27);
          line-height: 16px;
          margin-bottom: 8px;
        }
        .desc {
          font-size: 0;
          padding-bottom: 18px;
          .border-1px(rgba(7,17,27,0.1));
          .star {
            display: inline-block;
            vertical-align: top;
            margin-right: 8px;
          }  
          .text {
            display: inline-block;
            line-height: 18px;            
            font-size: 10px;
            color: rgb(77,85,93);
            margin-right: 12px;
            vertical-align: top;
          }
        }
        .remark {
          display: flex;
          padding: 18px 0;
          .block {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7,17,27,0.1);
            &:last-child {
              border: none;
            }
            h2 {
              font-size: 10px;
              line-height: 10px;
              margin-bottom: 4px;
              color: rgb(147,153,159);
            }
            .content {
              line-height: 24px;
              font-size: 10px;
              color: rgb(7,17,27);
              .stress {
                font-size: 24px;
                font-weight: 200;
              }
            }
          }
        }
        .favorite {
          position: absolute;
          width: 36px;
          right: 18px;
          top: 18px;
          text-align: center;
          .icon-favorite {
            margin-bottom: 4px;
            color: #d4d6d9;
            display: block;
            line-height: 24px;
            font-size: 24px;
            &.active {
              color: rgb(240,20,20)
            }
          }
          .text {
            line-height: 10px;
            font-size: 10px;
            color: rgb(77,85,93);
          }
        }  
      }
      .bulletin {
        padding: 18px 18px 0 18px;        
        .title {
          font-size: 16px;
          color: rgb(7,17,27);
          line-height: 16px;
          margin-bottom: 8px; 
        }
        .content-wrapper {
          padding: 0 12px 16px 12px;
          .border-1px(rgba(7,17,27,0.1));
          .content {
            line-height: 24px;
            color: rgb(240,20,20);
            font-size: 12px;
          }
        }
        .supports {
          .support-item {
            padding: 16px;
            .border-1px(rgba(7,17,27,0.1));
            font-size: 0;
            &:last-child:after {
              border: none;
            }
          }          
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: top;
            background-repeat: no-repeat;
            background-size: 16px;
            &.decrease {
              .bg-image('seller/decrease_4');
            }
            &.descount {
              .bg-image('seller/discount_4');
            }
            &.guarantee {
              .bg-image('seller/guarantee_4');
            }
            &.invoice {
              .bg-image('seller/invoice_4');
            }
            &.special {
              .bg-image('seller/special_4');
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            vertical-align: top;
          }
        }
      }
      .pics {
        padding: 18px;
        .title {
          font-size: 16px;
          color: rgb(7,17,27);
          line-height: 16px;
          margin-bottom: 8px;
        }
        .pic-wrapper {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          .pic-list {
            font-size: 0;
            .pic-item {
              display: inline-block;
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
      .info {
        color: rgb(7,17,27);
        padding: 18px 18px 0 18px;
        .title {
          font-size: 16px;
          line-height: 16px;
          padding-bottom: 12px; 
          .border-1px(rgba(7,17,27,0.1));
        }
        .info-item {
          padding: 16px 12px;
          line-height: 16px;
          .border-1px(rgba(7,17,27,0.1));
          font-size: 12px;
          &:last-child:after {
            border: none;
          }
        }
      }
    }
  }
</style>
