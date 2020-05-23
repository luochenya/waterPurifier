<template>
  <div class="search-ponents">
    <div class="title">
      <h1>我的產品</h1>
      <span>MY PRODUCT</span>
    </div>
    <el-row :gutter="30" class="product-row" v-if="isShowBlank">
      <el-col :sm="12" v-for="(item,index) in custWaterProdList" :key="index" >
        <div class="container-card" style="margin-bottom:3rem"  @click="gotoProduct(item.CustProdId)">
          <el-card>
            <div class="product-top">
              <div class="imgs">
                <img v-lazy="item.ProdImage" alt="">
              </div>
              <div class="btn"  @click="gotoProduct(item.CustProdId)">
                <!-- <span @click="$router.push({  path: `/toproduct/${item.CustProdId}` })">更換濾心</span> -->
                <span>更換濾心</span>
              </div>
            </div>
            <div class="tex">
              <h1>型號：{{item.ModelTypeName}}</h1>
              <span>製造號碼：{{item.MFNO}}</span>
            </div>
            <div class="map">安裝地址：{{item.Addr}}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 產品為空 -->
    <blank v-else></blank>
     <Loading :show="isShowLoading" />
  </div>
</template>

<script>

// import ProductList from './components/ProductList'
import Blank from '@/components/Blank'
import { getCustomerByLineMid, getCustByEncodeProdcutId, getCustWaterProdList } from '../api/api'
import storage from './../storage'

export default {
  name: 'search-ponents',
  components: {
    Blank
  },
  data () {
    return {
      isShowLoading: true,
      isShowBlank: true,
      custWaterProdList: [],
      EncodeProductId: '',
      LINEMid: ''
    }
  },
  mounted () {
    this.EncodeProductId = storage.getItem('EncodeProductId')
    this.LINEMid = storage.getItem('LINEMid')
    if (!this.EncodeProductId) {
      this._getCustomerByLineMid()
    } else {
      this._getCustByEncodeProdcutId()
    }
  },
  methods: {
    _getCustByEncodeProdcutId () {
      const { EncodeProductId } = this
      getCustByEncodeProdcutId({
        EncodeProductId
      }).then(res => {
        if (res.status === 200) {
          storage.setItem('CustId', res.data.Data.CustId)
          this._getCustWaterProdList()
        }
      })
    },
    _getCustomerByLineMid () {
      const { LINEMid } = this
      getCustomerByLineMid({
        LINEMid
      }).then(res => {
        if (res.status === 200) {
          storage.setItem('CustId', res.data.Data.CustId)
          this._getCustWaterProdList()
        }
      }).catch(() => {
        this.isShowLoading = false
      })
    },
    _getCustWaterProdList () {
      storage.setItem('EncodeProductId', this.EncodeProductId)
      storage.setItem('LINEMid', this.LINEMid)
      const CustId = storage.getItem('CustId')
      getCustWaterProdList({
        CustId
      }).then(res => {
        storage.setItem('CustProdId', res.data.Data[0].CustProdId)
        this.custWaterProdList = res.data.Data
      }).finally(() => {
        this.isShowLoading = false
      })
    },
    gotoProduct (Id) {
      if (!this.EncodeProductId) {
        this.$router.push({ path: `/toproduct/${Id}`, query: { mid: this.LINEMid } })
      } else {
        this.$router.push({ path: `/toproduct/${Id}`, query: { productid: this.EncodeProductId } })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .search-ponents {
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
    .container-card {
  width: 100%;
  .el-card {
    border-radius: 1.4rem;
    cursor: pointer;
    // height: 23.7rem;

  }
  .product-top {
    display: flex;
    justify-content: space-between;
    .imgs {
      width: 8.6rem;
      height: 8.6rem;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
      }
    }
    .btn {
      span {
        width: 8rem;
        height: 2.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .4rem;
        background: rgba(255, 244, 192, 1);
        font-size: 1.2rem;
        color: rgba(233, 154, 0, 1);
      }
    }
  }
  .tex {
    margin-top: 1.5rem;
    h1 {
      line-height: 2.8rem;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: .4rem;
      color: rgba(31, 182, 237, 1);
    }
    span {
      margin-top: .8rem;
      line-height: 2.2rem;
      font-size: 1.4rem;
      font-weight:400;
      color: rgba(134, 134, 134, 1);
    }
  }
  .map {
    margin-top: 1.2rem;
    line-height: 2.2rem;
    font-size: 1.4rem;
    font-weight:500;
    color: rgba(134, 134, 134, 1);
    // display: flex;
  //  .item {
  //     flex:0 0 7rem;
  //   }

  }

}
@media screen and(min-width: 767px) and (max-width: 991px){
 .product-row {
  /deep/.el-col-sm-12{
    padding-left: 1rem!important;
    padding-right: 1rem!important;
    .container-card {
      margin-bottom: 2rem!important;
    }
   }
 }
  .el-card {
    height: 27rem;

  }
}
@media screen and(min-width:1200px) {
  .el-card {
    height: 25.1rem;

  }
}
  }
</style>
