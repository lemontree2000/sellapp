<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
      <div class="content-right">

      </div>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="less" rel="stylesheet/less">
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    height: 48px;
    width: 100%;
    .content {
      display: flex;
      height: 100%;
      background: #141d27;
      font-size: 0;
      .content-left {
        flex: 1;
        position: relative;
        .logo-wrapper {
          display: inline-block;
          box-sizing: border-box;
          position: absolute;
          top: -10px;
          margin: 0 12px;
          width: 56px;
          height: 56px;
          padding: 6px;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            text-align: center;
            .icon-shopping_cart {
              font-size: 24px;
              color: #80858a;
              line-height: 44px;
            }
          }
        }
        .price {
          display: inline-block;
          font-size: 16px;
          font-weight: 700px;
          box-sizing: border-box;
          padding-right: 12px;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .desc {
          display: inline-block;
        }
      }
      .content-right {
        flex: 0 0 105px;
      }
    }
  }
</style>
