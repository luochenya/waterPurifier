<template>
   <div class="home-w h-animation" :class="scrollTo ? 'nav-h' : 'nav-m'">
        <div class="home-nav container h-animation" :class="scrollTo ? 'nav-h' : 'nav-m'">
          <div class="logo">
            <img src="../assets/img/logo.png" alt="" @click="gotoHome">
          </div>
          <div class="nav-item">
            <ul>
              <!-- $router.push('/searchProducts') -->
              <li @click="gotoHome" :class="{on: '/searchProducts' === $route.path}">我的產品</li>
              <li @click="$router.push({ name: 'memberService' })" :class="{on: 'memberService' === $route.name}">會員服務</li>
            </ul>
            <div v-if="false" class="nav-solid" @click="$router.push({name: 'alerts'})">
              <i class="el-icon-message-solid"></i>
              <span> 消息通知</span>
            </div>
          </div>
          <div class="unfokds h-md-and-up">
            <i class="mcicon-2" @click="isShow=!isShow" style=" font-size: 2.8rem;color: rgba(255, 255, 255,.8)"></i>
          </div>
          <transition
             enter-active-class="fadeInRightBig"
             leave-active-class="slideOutRight">
              <!-- fast   slideOutRight normal-->
            <div class="unfold" v-show="isShow" style="animation-duration: 0.3s">
              <mobile-app tex-color="#fff" :gotoMyProduct="goMyProduct" :gotolink="golink" :isMessageSolid="goAlerts"></mobile-app>
            </div>
            </transition>
        </div>
      </div>
</template>

<script>
import MobileApp from '@/components/MobileApp'
import storage from './../storage'
// import { mapState } from 'vuex'
export default {
  name: 'nav-head',
  components: {
    MobileApp
  },
  props: {
    scrollTo: { type: Boolean, default: false },
    mt: { type: String, default: '' }
  },
  data () {
    return {
      offsetTop: 0,
      isShow: false,
      fullWidth: document.documentElement.clientWidth
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  mounted () {
    // console.log(window.location.href)
    window.addEventListener('scroll', this.scrollHandle)
  },
  methods: {
    scrollHandle (e) {
      const top = e.srcElement.scrollingElement.scrollTop
      if (top >= 30 && this.fullWidth >= 992) {
        this.scrollTo = true
        this.mt = `${130}px`
        // console.log(this.scrollTo)
      } else {
        this.scrollTo = false
        this.mt = `${60}px`
        // console.log(this.scrollTo)
      }
    },
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      // console.log(this.fullWidth)
    },
    gotoHome () {
      const EncodeProductId = storage.getItem('EncodeProductId')
      const LINEMid = storage.getItem('LINEMid')
      // const EncodeProductId = this.userId.EncodeProductId
      // const LINEMid = this.userId.LINEMid
      // console.log(EncodeProductId)
      // console.log(LINEMid)

      if (EncodeProductId) {
        this.$router.push({ path: '/searchProducts', query: { productid: EncodeProductId } })
      } else if (LINEMid) {
        this.$router.push({ path: '/searchProducts', query: { mid: LINEMid } })
      }
    },
    goMyProduct () {
      this.isShow = false
      // this.$router.push({ path: '/searchProducts' })
      this.gotoHome()
    },
    golink () {
      this.isShow = false
      this.$router.push({ name: 'memberService' })
    },
    goAlerts () {
      this.isShow = false
      this.$router.push({ name: 'alerts' })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandle)
    // w
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped lang="scss">
.nav-m {
  height: 9rem !important;
      }
.nav-h {
  height: 6rem !important;
  background:linear-gradient(180deg,rgba(31,182,237,1) 0,rgba(1,138,240,1) 100%);
}
.home-w {
  width: 100%!important;
  margin: 0 auto;
  /*  display: flex;
  justify-content: center;
  align-items: center; */
  position: fixed;
  top: 0;
  z-index: 998;
}
@media screen and (min-width: 993px) {
  .h-md-and-up {
    visibility: hidden;
  }
}
@media screen and (max-width:992px) {
  .home-w,.home-nav {
    height: 60px!important;
     background:linear-gradient(180deg,rgba(31,182,237,1) 0,rgba(1,138,240,1) 100%);
  }

}
.home-nav {
  /* background-color: pink; */
  display: flex;
  z-index: 996;
  margin: 0 auto;
  align-items: center;
  font-size: 1.8rem;
  .logo {
    flex: 0 0 23.4rem;
    img{
      cursor: pointer;
    }

  }
  .nav-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      padding-left: 6rem;
      li {
        padding: 0 3rem;
        font-weight: lighter;
        color: rgba(255, 255, 255, .7);
        cursor: pointer;
        &.on {
          color: #fff;
          font-weight: 700;
        }
      }
    }
    .nav-solid {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 3.8rem;
      background: #FECF03;
      border-radius: .2rem;
      font-size: 1.3rem;
      cursor: pointer;
    }

  }
  .unfold {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow:scroll;
    left: 0;
    top: 6rem;
    background:linear-gradient(180deg,rgba(31,182,237,1) 0,rgba(1,138,240,1) 100%);
  }
  @media screen and (max-width: 600px){
    .logo {
      img {
        width: 11.9rem;
        height: 1.2rem;
        margin: 2rem 0;
      }
    }
    .mcicon-2 {
      font-size: 2rem !important;
    }
  }
}
</style>
