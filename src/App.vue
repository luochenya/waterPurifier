<template>
  <div id="app">
    <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">

      </router-view>
    </keep-alive>
     <!-- 这里是不被缓存的视图组件，比如 page3 -->
      <router-view v-if="!$route.meta.keepAlive">

      </router-view>

      <!-- <router-view></router-view> -->
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    // // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }

    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  /* overflow-y:scroll;
  touch-action: pan-y;
-webkit-overflow-scrolling: touch; */
}
.el-message {
  min-width: 320px!important;
  border-radius: 1rem!important;
 }
.el-card .is-always-shadow {
   box-shadow: none!important;
}
</style>
