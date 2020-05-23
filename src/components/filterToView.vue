<template>
  <div class="filter-content">
    <div class="title">
      <h1>濾心更換履歷</h1>
      <span>FILTER REPLACEMENT RESUME</span>
    </div>
    <el-row :gutter="10">
      <el-col :md="9" class="cols">
        <el-card>
          <div v-if="toViewDetails">
            <div class="top">
            <img src="../assets/img/icon_list1.png" alt="">
             <div class="text">
              <h1>濾心{{toViewDetails.Sequence}}號</h1>
              <span>製號：{{toViewDetails.FilterName}}</span>
            </div>
          </div>
          <div class="content">
            <div class="pic" :class="{'pic_2':isRemainLife === 50 && toViewDetails.RemainDays >= 30 , 'pic_3':isRemainLife <50 && toViewDetails.RemainDays < 30}">
              <p>{{toViewDetails.RemainLife === '無最後更換紀錄' ? '100%' : toViewDetails.RemainLife }}</p>
              <span>濾心壽命</span>
            </div>
            <div class="bottom">
              <span><i class="el-icon-success"></i>已配對</span>
              <em>當前壽命為：{{toViewDetails.RemainLife }}</em>
              <p>建議於{{toViewDetails.RemainDays}}天後更換濾心</p>
            </div>
          </div>
          </div>

        </el-card>
      </el-col>
      <el-col :md="15">
        <el-card class="list-box">
          <div class="top">
            <img src="../assets/img/icon_list1.png" alt="">
            <div class="text">
              <h1>濾心更換記錄</h1>
              <span>Filter replacement recordr</span>
            </div>
          </div>

          <div class="list">
           <vue-scroll :ops="ops">
            <!-- <el-row>
              <el-col :xs="10" :sm="10" :md="11" :lg="10">
                <img src="../assets/img/icon_2@2x.png" alt="">
                <span>2019年10月09日</span>
              </el-col>
              <el-col :xs="9"  :sm="9" :md="7" :lg="9">
                製號KSM
              </el-col>
              <el-col :xs="5" :sm="5" :md="6" :lg="5" v-if="false">
                <span>
                  <i class="el-icon-success"></i>
                  <span>配對完成</span>
                </span>
              </el-col>
            </el-row> -->

            <!-- <el-row>
              <el-col :xs="10" :sm="10" :md="11" :lg="10">
                <img src="../assets/img/icon_2@2x.png" alt="">
                <span>2019年10月09日</span>
              </el-col>
              <el-col :xs="9" :sm="9" :md="7" :lg="9">
                製號KSM
              </el-col>
              <el-col :xs="5" :sm="5" :md="6" :lg="5" v-if="false">
                <span>
                  <i class="el-icon-success"></i>
                  <span>配對完成</span>
                </span>
              </el-col>
            </el-row> -->
             <span class="hint" v-if="orderHistory===undefined">暫無更換記錄</span>
            <el-row v-else  v-for="(item,index) in orderHistory" :key="index">
              <el-col :xs="10" :sm="10" :md="11" :lg="10">
                <img src="../assets/img/icon_2@2x.png" alt="">
                <span>{{item.LastChangeDate| formData}}</span>
              </el-col>
              <!-- <el-col :xs="9"  :sm="9" :md="7" :lg="9"> -->
              <el-col :xs="14"  :sm="14" :md="7" :lg="9">
                <span v-if="item.Mfno === '此道濾心尚無製造號碼'">製號: 無</span>
                <span v-else> 製號: {{item.Mfno}}</span>
              </el-col>
              <!-- <el-col :xs="5" :sm="5" :md="6" :lg="5" v-if="false">
                <span>
                  <i class="el-icon-success"></i>
                  <span>配對完成</span>
                </span>
              </el-col> -->
            </el-row>
            </vue-scroll>
          </div>
          <div class="btn">
            <div class="item item_1" @click="goBuy">購買濾心</div>
            <div class="item item_2" @click="btnClick">更換濾心</div>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <guide-four :isDialogShow="isShowGuideFour" :confirmClick="confirmClick" :noClick="noClick" :update="true"></guide-four>
    <loging :isDialogShow="isShowLoging"></loging>
     <guide-four :isDialogShow="isShowVarning" :confirmClick="varningConfirmClick" :noClick="varningNoClick" :varning="true"></guide-four>
     <Loading :show="isShowLoadging"></Loading>
  </div>
</template>

<script>
import GuideFour from '@/components/PopUp/Guide_4'
import Loging from '@/components/PopUp/loging'
import { getByProductId, getFilterChangeHistory } from '../api/api'

export default {
  name: 'filter-to-view',
  components: {
    GuideFour,
    Loging
  },
  data () {
    return {
      isShowLoadging: true,
      isShowGuideFour: false,
      isShowLoging: false,
      isShowVarning: false,
      toViewDetails: {},
      CustProdId: '',
      Sequence: 0,
      orderHistory: {},
      IsOriginalService: false,
      IsOldWaterProduct: false,
      type: 1,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null, // 轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0', // 距离容器的距离
          keepShow: false, // 是否即使 bar 不存在的情况下也保持显示
          border: 'none' // 边框
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#E6E6E6' // 颜色
        }

      }
    }
  },
  computed: {
    isRemainLife () {
      return +((this.toViewDetails.RemainLife || '').substring(0, (this.toViewDetails.RemainLife || '').length - 1))
    }
  },
  mounted () {
    this.CustProdId = this.$route.params && this.$route.params.id
    this.Sequence = this.$route.query && this.$route.query.Sequence
    // this.toViewDetails = this.$route.params.list
    // this.ProductId = this.$route.params.CustProdId
    // console.log('p', this.ProductId)
    // console.log('s', this.Sequence)
    // console.log('t', this.toViewDetails.Sequence)
    this._getByProductId()
    this._getOrderHistory()
  },
  methods: {
    _getByProductId () {
      const { CustProdId } = this
      getByProductId({
        CustProdId
      }).then((res) => {
        this.IsOriginalService = res.data.Data[0].IsOriginalService
        this.toViewDetails = res.data.Data[0].Detail[this.Sequence - 1]
        this.IsOldWaterProduct = res.data.Data[0].IsOldWaterProduct
        // console.log('ss', this.IsOldWaterProduct)
        // console.log(this.toViewDetails)
        this.isShowLoadging = false
      })
    },
    _getOrderHistory () {
      const ProductId = this.CustProdId
      getFilterChangeHistory({
        ProductId
      }).then(res => {
        // console.log('gg', res.data.Data[this.Sequence])
        this.orderHistory = res.data.Data[this.Sequence]
        // console.log(res.data.Data)
      })
    },
    btnClick () {
      this.$router.push({ path: '/upload', query: { CustProdId: this.CustProdId, Sequence: this.Sequence } })
      // this.isShowGuideFour = true
    },
    // 确认
    confirmClick () {
      this.isShowGuideFour = false
      this.isShowLoging = true
      setTimeout(() => {
        this.isShowLoging = false
        this.isShowVarning = true
      }, 2000)
    },
    // 取消
    noClick () {
      this.isShowGuideFour = false
    },
    // 已購買
    varningNoClick () {
      // this.isShowVarning = false
      this.$router.push({ path: '/upload', query: { CustProdId: this.CustProdId, Sequence: this.Sequence } })
    },
    // 購買濾心
    varningConfirmClick () {
      this.isShowVarning = false
      this.$router.push({ name: 'YourDealer' })
    },
    // 去购买
    goBuy () {
      if (this.IsOriginalService) {
        // console.log(this.IsOriginalService)
        this.$router.push({ path: '/service' })
      } else {
        if (!this.IsOldWaterProduct) {
          this.type = 2
        } else {
          this.type = 1
        }
        // console.log(this.type)
        this.$router.push({ path: '/yourDealer', query: { ProductId: this.CustProdId, type: this.type } })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-content {
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
    }
  }
  .top {
    display: flex;
    align-items: center;
    img {
      width: 1.2rem;
      height: 2.6rem;
      margin-right: .5rem;
    }
    .text {
      h1 {
        line-height: 2.1rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      span {
        font-size: 1rem;
        color: #BDBDBD;
      }
    }
  }
  .el-col:first-of-type{
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
      .pic {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 13.8rem;
        height: 13.8rem;
        // background-color: pink;
        overflow: hidden;
        border-radius: 50%;
        background:url('../assets/img/Fill 1@2x.png') no-repeat;
        background-size: 100% auto;
        box-shadow: 0 12px 30px 0 rgba(1,181,240,.15);
        color: #fff;
        p {
          line-height: 3.7rem;
          font-size: 2.6rem;
          font-weight: 700;
        }
        span {
          font-size: 1.95rem;
        }
      }
      .pic_2 {
         background:url('../assets/img/Fill 1orange@2x (1).png') no-repeat;
         background-size: 100% auto;
          box-shadow: 0 12px 30px 0 rgba(255, 141, 45, .15);
      }
      .pic_3 {
        background:url('../assets/img/Fill 1red@2x (2).png') no-repeat;
        background-size: 100% auto;
        box-shadow: 0 12px 30px 0 rgba(254, 96, 59, .15);

      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3rem;
        span {
          line-height: 3rem;
          font-size: 1.4rem;
          color: #00C922;
          i {
            margin-right: .5rem;
          }
        }
        em {
          line-height: 3rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D3D3D;
        }
        p {
          line-height: 1.7rem;
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #C9C9C9;
        }
      }
    }
  }
  .el-card {
    border-radius: 1rem;
    height: 35rem;
  }
  .list {
    margin-top: 3rem;
    font-size: 1.2rem;
    height: 12.3rem;
    overflow: hidden;
    .hint {
      display: block;
      text-align: center;
      color: #868686;
    }
    .el-row:nth-of-type(2n) {
      background: #fff;
    }
    .el-row {
      display: flex;
      align-items: center;
      padding: 1.2rem 2rem;
      background: #F9F9FA;
      border-radius: 1rem;
      .el-col:first-of-type {
        display: flex;
        align-items: center;
        img {
          width: 1.4rem;
          height: 1.4rem;
          margin-right: .5rem;
        }
        span {
          line-height: 1.7rem;

          color: #3D3D3D;
        }
      }
      .el-col:nth-of-type(2) {
        color: #868686;
        line-height: 1.7rem;
      }
      .el-col:last-of-type {
        text-align: right;
        span{
          display: flex;
          align-items: center;
          i {
          color: #03BB00;
          font-size: 1.4rem;
          margin-right: .5rem;
          }
          span {
            font-size: 1.2rem;
            line-height: 1.7rem;
          }
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 5rem;
    .item {
      width: 13rem;
      height: 3.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // margin-left: auto;
      // margin-top: 5rem;
      font-size: 1.4rem;
      color: #fff;
      background-color: #1FB6ED;
      border-radius: .6rem;
      border: .2rem solid #1FB6ED;
    }
    .item_1 {
      margin-right: 2rem;
      background: rgba(226, 247, 255, 1);
      color: #1FB6ED;
    }

  }
 @media only screen and (max-width:992px) {
   .cols {
     margin-bottom: 2rem;
   }
}
@media only screen and (max-width:550px) {
  .list {
    .el-row {
      padding: 1.3rem .8rem;
      border-radius: .6rem;
      .el-col:last-of-type {
        // width: 7rem;
      }
    }
  }
}
@media only screen and (max-width:365px) {
  .list {
    .el-row {
      padding: .6rem .8rem;
      border-radius: .6rem;
      .el-col:nth-of-type(2) {
        // width: 8.5rem;
      }
    }
  }
}
}
</style>
