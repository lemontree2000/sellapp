<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="tab">
      <ul>
        <li class="tab-item">
          <router-link to="/goods">商品</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/goods">评价</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/goods">店铺</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" rel="stylesheet/less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .tab {
    & ul {
      padding: 0;
      margin: 0;
      display: flex;
      & .tab-item {
        list-style: none;
        flex: 1;
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
