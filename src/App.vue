<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <ul>
        <li class="tab-item">
          <router-link to="/goods">商品</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </li>
        <li class="tab-item">
          <router-link  to="/seller">店铺</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header';
export default {
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="less" rel="stylesheet/less">
#app {
  .tab {
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
          text-decoration: none;
          color: #333;
        }
      }
    }
  }
}
</style>
