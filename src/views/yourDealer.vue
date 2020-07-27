<template>
  <div class="your-dealer">
    <el-card>
      <div class="top">
        <div class="top-left">
          <img src="../assets/img/name@2x.png" alt="">
          <h1>您的服務經銷商為：</h1>
        </div>
        <div class="top-right" @click="goToServices">
          專人到府服務<i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="text">
        <h1>{{maintenanceDistribution.Name}}店</h1>
        <!-- <span>{{maintenanceDistribution.PHPid}}</span> -->
      </div>
      <div class="bottom">
        <div class="item">
          <span>門店地址</span>
          <p>{{maintenanceDistribution.Address}}<span @click="goToMap(maintenanceDistribution.Address)"><i class="mcicon-1"></i>查看地址</span></p>
        </div>
         <div class="item_2">
          <span>聯繫電話</span>
          <p>
            <a :href="'tel:+' + maintenanceDistribution.Tel">{{maintenanceDistribution.Tel}}</a>
          </p>
          <!-- <p>{{maintenanceDistribution.Tel}}</p> -->
        </div>
         <div class="btn" @click="toShopClick" ref="refBtn">
          到店取貨服務
        </div>
      </div>
    </el-card>
    <your-dealer-pop-up  v-if="isShowUpload" :pLeft="pTot" :pBottom="pRight" :btn="Uploadbtn"></your-dealer-pop-up>
    <Loading :show="isShowLoadging"></Loading>
  </div>
</template>

<script>
import YourDealerPopUp from '@/components/PopUp/YourDealerPopUp'
import { gmapApi } from 'vue2-google-maps'
import { getMaintenanceDistribution } from '../api/api'
export default {
  name: 'your-dealer',
  components: {
    YourDealerPopUp
  },
  data () {
    return {
      isShowLoadging: true,
      isShowUpload: false,
      isShowGg: false,
      maintenanceDistribution: {},
      ProductId: '',
      type: this.$route.query && this.$route.query.type,
      fullWidth: document.documentElement.clientWidth
    }
  },
  mounted () {
    this.ProductId = this.$route.query && this.$route.query.ProductId
    this.type = this.$route.query && this.$route.query.type
    // console.log(this.ProductId, this.type)
    this.$nextTick(() => {
      // this.goToMap()
      this.getTopRight()
      this._getMaintenanceDistribution()
    })
  },
  computed: {
    google: gmapApi
  },
  methods: {
    getTopRight () {
      const { left, bottom } = this.$refs.refBtn.getBoundingClientRect()
      this.pTot = left - 200 - 50
      if (this.fullWidth >= 474 && this.fullWidth <= 767) {
        this.pRight = -(bottom + 8)
      } else if (this.fullWidth >= 406 && this.fullWidth < 474) {
        this.pRight = -(bottom - 27)
      } else if (this.fullWidth < 406) {
        this.pRight = -(bottom + 13)
      } else {
        this.pRight = -(bottom - 30)
      }
      // console.log(this.$refs.refBtn.scrollTop)
      // console.log(this.google)
      // console.log(this.$refs.refBtn.getBoundingClientRect())
    },
    Uploadbtn () {
      this.isShowUpload = false
    },
    toShopClick () {
      // this.$router.push({ name: 'NewProductDistributor', query: { CustProdId: this.ProductId, title: '取貨付款日期', name: '到店取貨選擇' } })
      this.$router.push({ name: 'NewProductDistributor', query: { CustProdId: this.ProductId, name: '002' } })
    },
    _getMaintenanceDistribution () {
      const { ProductId } = this
      getMaintenanceDistribution({
        ProductId
      }).then(res => {
        this.maintenanceDistribution = res.data.Data
        if (this.type === 2 || this.type === '2') {
          this.isShowUpload = true
          this.noScroll()
        }
        this.isShowLoadging = false
        // console.log(this.maintenanceDistribution)
      })
    },
    // 專人到府服務
    goToServices () {
      this.$router.push({ name: 'NewProductDistributor', query: { CustProdId: this.ProductId, name: '001' } })
    },
    goToMap (Address) {
      this.$router.push({ path: '/map', query: { Address: Address } })
    }
  },
  destroyed () {
    this.isShowUpload = false
    this.canScroll()
  }
}
</script>

<style scoped lang="scss">
.your-dealer {
  .el-card {
    border-radius: 1rem;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      display: flex;
      align-items: center;
      img {
        width: 2.2rem;
        height: 2.4rem;
        margin-right: .5rem;
      }
      h1 {
        line-height: 2.2rem;
        font-size: 1.6rem;
        color: #3D3D3D;
      }
    }
    .top-right {
      line-height: 2.2rem;
      font-size: 1.6rem;
      color: #1FB6ED;
    }
  }
  .text {
    margin-top: 5rem;
    h1 {
      line-height: 2.8rem;
      font-size: 2rem;
      font-weight: 700;
      color: #3D3D3D;
    }
    span {
      line-height: 1.4rem;
      font-size: 1rem;
      color: #BDBDBD;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    span {
      line-height: 1.7rem;
      font-size: 1.2rem;
      color: #868686;
    }
    .item {
      p {
        line-height: 1.7rem;
        font-size: 1.2rem;
        color: #3D3D3D;
        margin-top: .6rem;
        span {
          margin-left: .8rem;
          color: #1FB6ED;

        }
      }
    }
    .item_2 {
      width: 20rem;
        p {
           margin-top: .6rem;
        }
      }
    .btn {
      width: 13.6rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1FB6ED;
      font-size: 1.6rem;
      border-radius: .6rem;
      color: #fff;
    }
  }
  @media screen and (min-width:992px) and (max-width:1199px) {
    .bottom {
      .item {
        width: 26rem;
      }
      .item_2 {
        padding-left: 2rem;
      }
    }
  }
  @media screen and (max-width:991px) {
    .bottom {
      flex-wrap: wrap;
      .item_2{
       padding-left: 0rem;
      }
      .btn {
        margin-top: 2rem;
        margin-left: auto;
      }
    }
  }
  @media screen and (max-width:443px) {
    .bottom {
      .item_2{
       padding-left: 0rem;
      }
    }
  }
  @media screen and (max-width:407px) {
    .bottom {
      .item_2{
       margin-top: 1.5rem;
      }
    }
  }
}
</style>
