<template>
  <div class="details">
    <div class="title">
      <h1>兌換商品詳情</h1>
      <span>REDEEM PRODUCT DETAILS</span>
    </div>
    <el-card>
      <div class="content-box">
        <div class="image">
          <img src="../assets/img/three@2x.png" alt="">
        </div>
        <div class="name">
          <h1>大苑子-翡翠檸檬（L）</h1>
          <p>鮮果茶店-大苑子採用每日現採有機檸檬，搭配寒天等配方調配而成，酸甜低卡風味，絕對是夏天臂嘗的飲品。</p>
        </div>
        <div class="btn" @click="giftClick">兌換</div>
      </div>
      <div class="text">注意事項：1、本公司保有最終更改決定權；2、台北信義、桃機第一航廈等門市不提供兌換服務</div>
    </el-card>
    <guide-four :isDialogShow="isShowFour" :gift="true" :confirmClick="FourClick" :noClick="noFourClick"></guide-four>
    <guide-tow  :isDialogShow="isShowTow" :noShowClick="forFailureClick" :ForFailure="true"></guide-tow>
    <guide-tow  :isDialogShow="isShowSuccess" :noShowClick="ForSuccessful" :ForSuccessful="true" :w="'40rem'"></guide-tow>
  </div>
</template>

<script>
import GuideFour from '@/components/PopUp/Guide_4'
import GuideTow from '@/components/PopUp/Guide_2'
export default {
  components: {
    GuideFour,
    GuideTow
  },
  data () {
    return {
      isShowFour: false,
      isShowTow: false,
      isShowSuccess: false
    }
  },
  methods: {
    giftClick () {
      this.isShowFour = true
    },
    // 確認兌換
    noFourClick () {
      this.isShowFour = false
    },
    //  確認兌換
    FourClick () {
      this.isShowFour = false
      this.isShowTow = true
    },
    // 兌換失敗
    forFailureClick () {
      this.isShowTow = false
      this.isShowSuccess = true
    },
    // 兌換成功
    ForSuccessful () {
      this.isShowSuccess = false
    }
  }
}
</script>

<style scoped lang="scss">
.details {
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
  .el-card {
    padding: 1.6rem;
    border-radius: 1rem;
    .content-box {
      display: flex;
      align-items: center;
      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        height: 10.2rem;
        margin-right: 2rem;
        img {
          height: 10.2rem;
        }
      }
      .name {
        width: 36rem;
        h1 {
          line-height: 2.8rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1FB6ED;
        }
        p {
          margin-top: 1rem;
          line-height: 2rem;
          font-size: 1.4rem;
          color: #868686;
        }
      }
      .btn {
        width: 11.6rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        background: #1FB6ED;
        border-radius: .6rem;
        font-size: 1.4rem;
        color: #fff;
        cursor: pointer;
      }
    }
    .text {
      line-height: 1.7rem;
      margin-top: 1.8rem;
      font-size: 1.2rem;
      color: #EE9702;
    }
  }
@media screen  and (max-width: 1199px) {
  .el-card {
    .content-box {
      flex-wrap: wrap;
    }
  }
}
@media screen and (max-width:991px){
   .el-card {
    .content-box {
      justify-content: center;
      .name {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    }
  }
}
}
</style>
