<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showData" class="supports-count">
        <span class="count">{{ seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div  @click="showData" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="background">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>  
          <v-star :size="48" :score="seller.score"></v-star>
        </div>  
      </div>  
      <div class="detail-close">
        <i class="icon-close" @click="hideData"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../../components/star/star';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': Star
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showData() {
        this.detailShow = true;
      },
      hideData() {
        this.detailShow = false;
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
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin";

  .header {
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width:30px;
            height: 18px;
            background-size: 30px 18px;
            background-repeat: no-repeat;
            .bg-image('header/brand');
          }
          .name {
            vertical-align: top;
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .supports {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px;
            &.decrease {
              .bg-image('header/decrease_1');
            }
            &.descount {
              .bg-image('header/discount_1');
            }
            &.guarantee {
              .bg-image('header/guarantee_1');
            }
            &.invoice {
              .bg-image('header/invoice_1');
            }
            &.special {
              .bg-image('header/special_1');
            }

          }
          .text {
            line-height: 12px;
            font-size: 10px;
            vertical-align: top;
          }
        }
      }
      .supports-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        .count {
          vertical-align: top;
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px;
          font-size: 10px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7,17,27,0.2);
      .bulletin-title {
        display: inline-block;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        .bg-image('header/bulletin');
        background-size: 22px 12px;   
        background-repeat: no-repeat;
      }
      .bulletin-text {   
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        top: 8px;
        right: 12px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7,17,27,0.8);
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px; 
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
