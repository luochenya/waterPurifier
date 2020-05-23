<template>
  <div class="replace-filter">
    <el-dialog
      :visible.sync="isDialogShow"
      :show-close="false">
      <div class="content">
        <div class="imgs">
          <img src="./img/filter@2x.png" alt="" style="width:4.5rem;">
        </div>
        <h1>更換10次濾心</h1>
        <span>凡註冊為會員後，不限濾心更換方式、機型，完成十次更換，即可獲得2000IB幣</span>
        <div class="text">
          <p>注意事項：</p>
          <p>1、本公司保有最終更改決定權；</p>
          <p>2、需確保濾心更換時間，於本網站上配對完成，若未線上配置直接更換，視同無效</p>
        </div>
         <div class="btn">
          <span @click="confirmClick">我知道了</span>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'replace-filter',
  props: {
    isDialogShow: { type: Boolean, default: false },
    confirmClick: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.replace-filter {
  /deep/ .el-dialog {
    width: 58.8rem;
    border-radius: 1.4rem!important;
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 1rem 7rem 4rem 7rem;
      .imgs {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4.5rem;
        height: 7rem;
        margin-bottom: 2rem;
        margin-left: auto;
        margin-right: auto;
        img {
          height: 7rem;
        }
      }
      h1 {
        line-height: 3rem;
        font-size: 2.2rem;
        font-weight: 700;
        text-align: center;
        color: #3D3D3D;
      }
      span, p {
        line-height: 2rem;
        font-size: 1.2rem;
      }
      span {
        text-align: center;
        color: #868686;
      }
      .text {
        margin-top: 2.6rem;
        p {
          color: #1FB6ED;

        }
      }
      .btn {
        width: 100%;
         display: flex;
         margin-top: 6rem;
        justify-content: center;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18.8rem;
          height: 4.6rem;
          border-radius: .6rem;
          background: #1FB6ED;
          font-size: 1.4rem;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
