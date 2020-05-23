<template>
  <el-dialog
  @touchmove.prevent
  :visible.sync="isDialogShow"
  width="50%"
  :before-close="goNoClick">
  <el-row>
    <el-col :xs="24" :sm="10" class="dialog-left">
      <div class="dialog-img">
        <img src="../assets/img/dialog_1.png" alt="">
      </div>
    </el-col>
     <el-col :xs="24" :sm="14" class="dialog-right">
       <h1>綁定LINE@好友,售後服務更完善</h1>
       <p>綁定櫻花淨水管家LINE好友後, 立即啟用濾心通知服務！此外您也能馬上獲得淨水好友圈分享資格, 將自己的推薦碼推廣出去, 就能免費兌換濾心, 活動詳情請洽<a href="javascript:;">分享說明頁面</a>
</p>

      <div class="bottom">
         <el-button @click="goToClick">去綁定</el-button>
         <span class="btn_2" @click="goNoClick">暫時先不用</span>
      </div>
    </el-col>
  </el-row>
  <span slot="footer" class="dialog-footer">

  </span>
</el-dialog>
</template>

<script>

export default {
  name: 'binding-dialog',
  props: {
    isDialogShow: { type: Boolean, default: false },
    goToClick: { type: Function, default: () => {} },
    goNoClick: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.el-row {
  .dialog-left{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%!important;
    margin-top: 3rem;
    .dialog-img {
      width: 13rem;
      height: 13rem;
      border-radius: 2.3rem;
      // box-shadow: #03BB00 0 0 2rem;
      box-shadow: 0 0 5rem 1.5rem rgba(3, 187, 0, .3);
    }
 }
  .dialog-right {
    padding-right: 4rem;
    h1 {
      font-size: 2.2rem;
      line-height: 3rem;
      color: #3D3D3D;
      font-weight: 700;
    }
    p {
      margin-top: 1.2rem;
      text-indent: 2em;
      font-size: 1.2rem;
      line-height: 2.5rem;
      color: #868686;
      a {
       color: #1FB6ED;
       font-weight: 700;
      }
    }
    .bottom {
      margin-top: 3rem;
      display: flex;
      align-items: center;
    }
    /deep/ .el-button{
      // background:linear-gradient(180deg,rgba(3, 172, 0, 1) 0,rgba(3, 172, 0, 1) 30%);
      background:rgba(3, 187, 0, .8) ;
      color: #fff;
      margin-right: 3rem;
    }
  }
}
@media only screen and (min-width: 1201px) and (max-width: 1301px) {
  /deep/ .el-dialog {
    width: 60%!important;
   .el-dialog__body {
     padding: 2.6rem 0;
   }
  }
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  /deep/ .el-dialog {
    width: 85%!important;
  }
}
@media only screen and (max-width: 767px){
  /deep/ .el-dialog {
    width: 90%!important;
  }
  .dialog-img {
    margin-bottom: 2rem;
  }
  .dialog-right {
    padding-right: 0!important;
    h1 {
      text-align: center;
    }
    .bottom {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
