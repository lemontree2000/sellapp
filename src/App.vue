<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <ul>
        <li class="tab-item">
          <router-link to="/goods">商品</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </li>
        <li class="tab-item">
          <router-link   to="/seller">店铺</router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header';
import {urlParse} from 'common/js/util';
const ERR_OK = 0; // 状态码

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  },
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import './common/less/mixin.less'; 
#app {
  .tab {
    // border-bottom : 1px solid rgba(7, 17, 27, 0.1);
    .border-1px(rgba(7, 17, 27, 0.1));
    & ul {
      padding: 0;
      margin: 0;
      display: flex;
      & .tab-item {
        flex: 1;
        height: 40px;
        line-height: 40px;
        list-style: none;
        text-align: center;
        & > a {
          display: block;
          color: rgb(77, 85, 93);
          font-size: 14px;
          &.active {
            color: rgb(240, 20, 20)
          }
        }
      }
    }
  }
}
</style>
