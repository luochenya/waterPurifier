<template>
  <div class="matching-contet">
    <el-card class="card">
      <div class="product-model">
        <div class="model-img">
          <img src="../assets/img/icon_list3.png" alt="">
        </div>
        <div class="model">
          <h2 class="model-name">型號：A214234</h2>
          <span>帳號：XIN9123IQW22</span>
          <span>安裝地址：436台中市雅潭路236號5樓</span>
        </div>
        <div class="bar">
          <img src="../assets/img/bar_code6@3x.png" alt="">
        </div>
      </div>
    </el-card>
    <el-row :gutter="10">
      <el-col :sm="12" :md="8"  ref="refNoFilter">
         <filter-state :noFilter="true" :theHorseClick="theHorseClick"></filter-state>
      </el-col>
      <el-col :sm="12" :md="8">
        <filter-state :noFilter="true" :theHorseClick="theHorseClicks"></filter-state>
      </el-col>
      <el-col :sm="12" :md="8">
        <filter-state :noFilter="true"></filter-state>
      </el-col>
    </el-row>
    <guide-two :isDialogShow="isShowGuideTwo" :noShowClick="noShowClick" :error="true"></guide-two>
    <guide-two :isDialogShow="isShowGuideTwos" :noShowClick="warningClick" :warning_="true"></guide-two>
    <guide-two :isDialogShow="isShowGuideWarning" :noShowClick="NoWarningClick" :warning="true"></guide-two>
    <guide-two :isDialogShow="isShowGuideupdate" :noShowClick="updateClick" :updateFailed="true"></guide-two>
    <matching-pop-up v-if="mPopUp" :btn="clickBtn" :pLeft="getLeft" :pBottom="getBottom"></matching-pop-up>
  </div>
</template>

<script>
import GuideTwo from '@/components/PopUp/Guide_2'
import FilterState from '@/components/FilterState'
import MatchingPopUp from '@/components/PopUp/MatchingPopUp'
export default {
  components: {
    GuideTwo,
    FilterState,
    MatchingPopUp
  },
  data () {
    return {
      isShowGuideTwo: false,
      mPopUp: true,
      isShowCard: true,
      isShowGuideTwos: false,
      isShowGuideWarning: false,
      isShowGuideupdate: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.getOffsetTop()
    })
    // this.isShowGuideTwos = this.$route.params.isDialogShow
  },
  updated () {
    this.$nextTick(() => {
      this.getOffsetTop()
    })
  },
  methods: {
    theHorseClick () {
      this.isShowGuideTwo = true
    },
    noShowClick () {
      this.isShowGuideTwo = false
      this.isShowGuideTwos = true
    },
    noClick () {
      this.isShowGuideTwo = false
    },
    clickBtn () {
      this.mPopUp = false
    },
    getOffsetTop () {
      // console.log(this.$refs.refNoFilter)
      // this.$refs.refNoFilter.getBoundingClientRect().top
      /*  const { left, bottom } = this.$refs.refNoFilter
      console.log(left, bottom) */
      // this.$refs.selectLi.getBoundingClientRect()
      // const { left, bottom } = this.$refs.refNoFilter.getBoundingClientRect()
      // console.log(left, bottom)
      // this.$nextTick(() => {

      //   // console.log(this.$refs.refNoFilter.getBoundingClientRect())

      // })
    },
    clickFilterState () {
      this.$router.push({ name: 'FilterToView' })
    },
    warningClick () {
      this.$router.push({ name: 'MatchingFailure' })
    },
    theHorseClicks () {
      this.isShowGuideWarning = true
    },
    NoWarningClick () {
      this.isShowGuideWarning = false
      this.isShowGuideupdate = true
    },
    updateClick () {
      this.isShowGuideupdate = false
    }
  }

}
</script>

<style scoped lang="scss">
.matching-contet {
  .card {
    border-radius: 1rem;
    padding: 2rem 3rem;
    margin-bottom: 2rem;
    cursor: pointer;
    .product-model {
      height: 100%;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .model-img {
        flex: 0 0 7rem;
        width: 7rem;
        margin-right: 1.5rem;
      }
      .model {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-right: 1.5rem;
        .model-name {
          line-height: 2.8rem;
          font-size: 2rem;
          color: #1FB6ED;
        }
        span {
          line-height: 2.2rem;
          font-size: 1.6rem;
          color: #868686;
        }

      }
      .bar {
        flex: 0 0 15.8rem;
        width: 15.8rem;
        height: 6.6rem;
        display: flex;
        img {
          width: 15.8rem;
          height: 6.6rem;
        }
        }
    }
  }
  .container-bottom {
    .card {
      width: 100%;
      height: 26rem;
      border-radius: 1rem;
      /deep/ .el-card__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin-top: 1rem;
      }
      .icon {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
        img {
          width: 1.2rem;
          height: 2.6rem;
          margin-right: .5rem;
        }
        .title {
          h1 {
            font-size: 1.5rem;
            color: #3D3D3D;
          }
          span {
            font-size: 1.2rem;
            color: #BDBDBD;
          }
        }
      }
      .filter-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: 8rem;
        overflow: hidden;
        border-radius: 50%;
        background:url('../assets/img/Fill 1.png') no-repeat;
        box-shadow: 0 1.2rem 3rem 0 rgba(1,181,240,.15);
        color: #fff;
        span {
          font-size: 1.5rem;
          font-weight: 500;
        }
        em {
          margin-top: .5rem;
          font-size: 1.2rem;
          font-weight: lighter;
        }
      }
      .fliter-txt {
        width: 100%;
        margin-top: 3rem;
        font-size: 1.4rem;
        .fliter-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.5rem;
          span {
            color: #C9C9C9;
          }
          .success {
            color: #00C922;
          }
          .span_1 {
            color: #3D3D3D;
          }
        }
      }
      .btn {
        width: 16.8rem;
        height: 3.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3.6rem;
        border-radius: .6rem;
        background: #1FB6ED;
        font-size: 1.6rem;
        color: #fff;
      }
    }
  }
}
</style>
