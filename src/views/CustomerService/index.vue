<template>
  <div class="content"  ref="contents">
    <nav-head :scrollTo="scrollTo" :mt="mt"></nav-head>
    <div class="column container">
      <el-row  v-if="$route.meta.showPersonal">
        <el-col :xs="24" :sm="24">
          <!-- 這裡是會被緩存的視圖組件 -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
            <v-top />
          </keep-alive>
         <!-- 這裡是不被緩存的視圖組件 -->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-col>
      </el-row>

      <el-row v-else>
        <el-col :xs="24" :sm="8">
          <personal-center v-if="isShow"></personal-center>
          <personal-center-app  @goClick="toClink" v-else></personal-center-app>
        </el-col>
        <el-col :xs="24" :sm="16">
          <!-- <contact-customer-service></contact-customer-service>
          <filter-to-view></filter-to-view> -->
          <div class="personalcenter-content" v-if="isShowUp">
            <personal-center :imgClick="imgClick" :blue="'#1FB6ED'"></personal-center>
          </div>
          <!-- <router-view></router-view> -->
            <!-- 這裡是會被緩存的視圖組件-->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
         <!-- 這裡是不被緩存的視圖組件-->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-col>
      </el-row>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead'
import NavFooter from '@/components/NavFooter'
import PersonalCenter from '@/components/PersonalCenter'
import PersonalCenterApp from '@/components/PersonalCenterApp'
import storage from './../../storage'
// import { getCustomerByLineMid, getCustByEncodeProdcutId } from '@/api/api'
// import ContactCustomerService from './components/ContactCustomerService'
// import FilterToView from '@/components/FilterToView'
export default {
  name: 'index',
  components: {
    NavHead,
    NavFooter,
    PersonalCenter,
    PersonalCenterApp
    // ContactCustomerService,
    // FilterToView
  },
  data () {
    return {
      isShow: false,
      isShowUp: false,
      isShows: null,
      fullWidth: document.documentElement.clientWidth,
      scrollTo: false,
      mt: '',
      LINEMid: '',
      EncodeProductId: ''
    }
  },
  created () {
    this.EncodeProductId = (this.$route.query && this.$route.query.productid) || storage.getItem('EncodeProductId')
    // this.LINEMid = (this.$route.query && this.$route.query.mid) || 'U914b76c1d72ff196722f9ca38ac80c3e'
    this.LINEMid = (this.$route.query && this.$route.query.mid) || storage.getItem('LINEMid')
    // console.log('A', this.EncodeProductId, this.LINEMid)
    if (!this.EncodeProductId) {
      storage.setItem('LINEMid', this.LINEMid)
    } else {
      storage.setItem('EncodeProductId', this.EncodeProductId)
    }
  },
  mounted () {
    // 獲取荧幕寬度
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.scrollHandle, true)
    this.isShow = window.matchMedia('(min-width: 768px)').matches
  },
  methods: {
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      if (this.fullWidth <= 768) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    scrollHandle (e) {
      if (e.srcElement.className === 'content') {
        const top = e.srcElement.scrollTop
        if (top >= 30 && this.fullWidth >= 992) {
          this.scrollTo = true
          this.mt = `${90}px`
        } else {
          this.scrollTo = false
          this.mt = `${60}px`
        }
      }
    },
    // 點擊頭像
    toClink () {
      this.$router.push('/meinformation')
      // this.isShowUp = true
    },
    imgClick () {
      this.isShowUp = false
    },
    destroyed () {
    // 清除事件
      window.removeEventListener('resize', this.handleResize)
      window.removeEventListener('scroll', this.scrollHandle)
    }
  }
}
</script>

<style scoped lang="scss">
html,
body,
.content {
  height: 100%;
  overflow-y: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  background-color:#F5F2F5!important;overflow-x:hidden;background:url('./../../assets/img/body_bg.png') no-repeat top;
  .column {
    margin-top: 13rem;
    .el-row {
      .el-col:last-of-type {
        padding-left: 3rem;
      }
    }
  }
@media only screen and (max-width:992px) {
   .el-row {
      .el-col:last-of-type {
        padding-left: 3rem!important;
      }
    }
}
@media only screen and (max-width:767px) {
   .el-row {
      .el-col:last-of-type {
        padding-left: 0rem!important;
        margin-top: -3rem;
      }
    }
}
@media only screen and (max-width:600px) {
   .el-row {
      .el-col:last-of-type {
        padding-left: 0rem!important;
        margin-top: -8rem;
      }
    }
}
.personalcenter-content {
  background: #F1F3F8;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  z-index: 999;

}
/deep/ .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  box-shadow: none!important;
}
}
</style>
