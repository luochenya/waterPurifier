<template>
  <div class="to-product">
    <div class="title">
      <h1>產品詳細資料</h1>
      <span>PRODUCT DETAILS</span>
    </div>
    <el-card class="card" v-if="details">
      <div class="product-model">
        <div class="model-img">
          <img :src="details.ProdImage" alt="">
        </div>
        <div class="model">
          <h2 class="model-name">型號：{{details.ModelTypeName}}</h2>
          <span>製造號碼：{{details.MFNO}}</span>
          <span>安裝日期：{{details.InstallDate}}</span>
          <span>安裝地址：{{details.Addr}}</span>
        </div>
        <!-- <div class="btn">
          居家環境水質分析
        </div> -->
      </div>
    </el-card>
    <!-- <el-row :gutter="15" v-if='!details.IsOldWaterProduct'> -->
    <el-row :gutter="15">
      <el-col :xs="12" :sm="12" :md="8" v-for="(item,index) in details.Detail" :key="index">
        <div @click="clickFilterState(item,details)">
          <filter-state :list="item" :isHeight="'30rem'" @timeClick="timeClick(item,details)" @redClick="redClick(item,details)"></filter-state>
        </div>
      </el-col>
    </el-row>
     <guide-two :isDialogShow="isShowGuideTwo" :noShowClick="noShowClick" :noClick="noClick" :filter="true"></guide-two>
    <guide-two :isDialogShow="isShowGuideTwos"  :filter_="true"></guide-two>
    <Loading :show="isShowLoadging"></Loading>
  </div>
</template>

<script>
import FilterState from '@/components/FilterState'
import GuideTwo from '@/components/PopUp/Guide_2'
import { getByProductId } from '../api/api'
import storage from './../storage'
export default {
  components: {
    FilterState,
    GuideTwo
  },
  data () {
    return {
      isShowGuideTwo: false,
      isShowGuideTwos: false,
      isShowLoadging: true,
      CustProdId: '',
      details: {}
    }
  },
  mounted () {
    this.CustProdId = this.$route.params && this.$route.params.id
    storage.setItem('CustProdId', this.CustProdId)
    this._getByProductId()
  },
  methods: {
    _getByProductId () {
      const { CustProdId } = this
      getByProductId({
        CustProdId
      }).then((res) => {
        this.details = res.data.Data[0]
        this.$store.dispatch('getMeProduct', res.data.Data[0])
        this.isShowLoadging = false
        // console.log('r', this.details)
      })
    },
    clickFilterState (item, id) {
      this.$router.push({ path: `/toView/${id.CustProdId}`, query: { Sequence: item.Sequence } })
    },
    // 點擊匹配
    theHorseClick () {
      this.isShowGuideTwo = true
    },
    // 下一步
    noShowClick () {
      this.isShowGuideTwo = false
      this.$router.push({ name: 'YourDealer' })
    },
    // 略過
    noClick () {
      this.isShowGuideTwo = false
      this.$router.push({ name: 'YourDealer2' })
    },
    // 建議更換濾芯
    timeClick (item, id) {
      // this.$router.push({ name: 'FilterToView' })
      // this.clickFilterState()
      this.$router.push({ path: `/toView/${id.CustProdId}`, query: { Sequence: item.Sequence } })
    },
    redClick (item, id) {
      this.$router.push({ path: `/toView/${id.CustProdId}`, query: { Sequence: item.Sequence } })
    }
  }
}
</script>

<style scoped lang="scss">
.to-product {
  .title {
    margin-bottom: 3rem;
    text-align: center;
    color: #fff;
    h1 {
      line-height: 4.4rem;
      font-size: 3.1rem;
      font-weight: lighter;
    }
    span {
      line-height: 1.7rem;
      font-size: 1.2rem;
      font-weight: lighter;
    }
  }
  .card {
    border-radius: 1rem;
    padding: 2rem 3rem;
    margin-bottom: 2rem;
    .product-model {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .model-img {
        flex: 0 0 10.3rem;
        width: 10.3rem;
        margin-right: 1.5rem;
        img {
          width: 10.3rem;
        }
      }
      .model {
        display: flex;
        flex-direction: column;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
        .model-name {
          line-height: 2.8rem;
          margin-bottom: .6rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1FB6ED;
        }
        span {
          line-height: 2.1rem;
          font-size: 1.3rem;
          color: #868686;
        }

      }
      .btn {
        width: 16.8rem;
        height: 4.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        background: #1FB6ED;
        border-radius: .6rem;
        color: #fff;
        }
    }
  }
  @media screen and (max-width:1199px) {
    .card  {
      padding: 1rem;
    }
  }
  @media screen and (max-width:991px) {
    .card {
      .product-model {
        flex-wrap: wrap!important;
        .btn {
          margin-top: 2rem;
          margin-left: 2rem;
        }
      }
    }
  }
  @media screen and (max-width:767px) {
    .card {
      .product-model {
        justify-content: flex-start;
        .model-img {
          margin-right: 1.8rem;
        }
      }
    }
  }
  @media screen and (max-width:500px) {
    .card {
      /deep/ .el-card__body {
        padding: 1rem;
      }
      .product-model {

        .model-img {
            flex: 0 0 7.4rem;
            width: 7.4rem;
            margin-right: 1.5rem;
            img {
              width: 7.4rem;
            }
        }
        .model {
          margin-right: 0;
        }
        .btn {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
