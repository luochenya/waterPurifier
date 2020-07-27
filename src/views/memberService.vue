<template>
  <div class="contents">
    <div class="title">
      <h1>會員服務</h1>
      <span>MEMBERSHIP SERVICE</span>
    </div>
    <dealer-information :map="map"></dealer-information>
    <el-row :gutter="15">
      <el-col :md="6">
        <div @click="clickTheQuery">
          <el-card class="card-2">
            <span></span>
            <div class="name">
              <h1>櫻花點數商城</h1>
              <p>Points Mall</p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="6">
         <div @click="clickServiceApply()">
          <el-card class="card-3">
              <span></span>
              <div class="name">
                <h1>服務申請</h1>
                <p>Service application</p>
              </div>
          </el-card>
         </div>
      </el-col>
      <el-col :md="6">
        <div @click="clickPersonalInformation">
          <el-card class="card-4">
            <span></span>
            <div class="name">
              <h1>個人資訊</h1>
              <p>Personal information</p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="6">
        <div @click="toMemberBenefits()">
          <el-card class="card-1">
            <span></span>
            <div class="name">
              <h1>會員權益</h1>
              <p>member benefits</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- <div class="btn" @click="clickExit">登出</div> -->
    <guide-four :isDialogShow="isShowFour" :exit="true" :confirmClick="confirmClick" :noClick="noClick"></guide-four>
     <Loading :show="isShowLoadging"></Loading>
 </div>
</template>

<script>
import DealerInformation from '@/components/DealerInformation'
import GuideFour from '@/components/PopUp/Guide_4'
import { getMaintenanceDistribution } from './../api/api'
import storage from './../storage'
// import ConsentForm from './ConsentForm'
export default {
  name: 'menber-service',
  components: {
    DealerInformation,
    GuideFour
    // ConsentForm
  },
  data () {
    return {
      isShowLoadging: true,
      isShowFour: false,
      ProductId: '',
      map: {},
      userName: {}
    }
  },
  mounted () {
    this.ProductId = storage.getItem('CustProdId')
    if (this.ProductId) {
      this._getMaintenanceDistribution()
    }
    this.userName = storage.getItem('userName')
  },
  methods: {
    _getMaintenanceDistribution () {
      const { ProductId } = this
      getMaintenanceDistribution({
        ProductId
      }).then(res => {
        this.map = res.data.Data
        this.isShowLoadging = false
      })
    },
    // 前往會員權益
    toMemberBenefits () {
      this.$router.push({ name: 'MemberBenefits' })
    },
    clickTheQuery () {
      this.$router.push({ name: 'theQuery' })
      // console.log(this.$router)
    },
    clickServiceApply () {
      const base64 = btoa(this.userName.CustId)
      window.location.href = `https://service.sakura.com.tw/service.aspx?custId=${base64}`
    },
    clickPersonalInformation () {
      this.$router.push({ name: 'personalInformation' })
    },
    clickExit () {
      this.isShowFour = true
    },
    confirmClick () {
      this.$router.push({ name: 'Login' })
    },
    noClick () {
      this.isShowFour = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.contents {
  .title {
    margin-bottom: 4rem;
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
  .el-row {
    margin-top: 2rem;
    .el-card {
      // max-height: 18.7rem;
      padding: 1rem 0;
      border-radius: 1rem;
      /deep/ .el-card__body {
         @include flex();
         padding: 1rem 0.6rem;
      }
      cursor: pointer;
      .name {
        margin-left: 1rem;
        h1 {
          line-height: 2.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #3D3D3D;
        }
        p{
          line-height: 1.4rem;
          font-size: 1rem;
          color: #BDBDBD;
        }
      }
    }
    .card-2 {
      span {
        @include bgImg(3rem,3rem, '../assets/imgs/shoppingCart.png',3rem)
      }
    }
    .card-3 {
      span {
        @include bgImg(3rem,3rem, '../assets/imgs/ServiceApplication.png',3rem)
      }
    }
    .card-4 {
      span {
        @include bgImg(3rem,3rem, '../assets/imgs/PersonalInformation.png',3rem)
      }
    }
    .card-1 {
      span {
        @include bgImg(3rem,3rem, '../assets/imgs/memberBenefits.png',3rem)
      }
    }
  }
  .btn {
    width: 16rem;
    height: 4rem;
    @include flex();
    margin-top: 12rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    background: #1FB6ED;
    border-radius: .6rem;
    cursor: pointer;
  }
@media screen and (min-width:992px) and (max-width:1200px) {
    .el-row {
      .el-card {
        height: 11.1rem;
        display: flex;
        align-items: center;
        // padding-left: 1rem;
      /deep/ .el-card__body {
        margin-left: 1rem;
        padding: 1.4rem;
      }
      .name {
        margin-left: .8rem;
      }
    }
  }
}
@media screen and (max-width: 991px) {
  .el-row{
    .el-card {
      margin-bottom: 1.5rem;
      .name {
        width: 15rem;
      }
    }
    .card-2 {
     /deep/ .el-card__body {
        padding-left: 0;
      }
    }
  }
}
}
</style>
