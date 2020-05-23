<template>
  <div class="guide_dialog" v-show="isDialogShow" @touchmove.prevent>
    <el-dialog
      :visible.sync="isDialogShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal="false"
      :width="w">
      <div class="content">
        <div class="imgs">
          <img src="./img/warning@2x.png" alt="" style="width:9rem;" v-if="warning || warning_ || modyType == 3 || modyType == 6 || modyType == 7">
          <img src="./img/filter@2x.png" alt="" style="width=5.2rem" v-if="filter || filter_">
          <img src="./img/Update_failed@2x (1).png" alt="" style="width=5.2rem" v-if="updateFailed">
          <img src="./img/succeed@2x.png" alt="" style="width=8rem" v-if="modyType == 1 || ForSuccessful|| modyType == 2 || modyType == 4">
          <img src="./img/error@2x.png" alt="" style="width=8rem" v-if="modyType == 5 || ForFailure || modyType == 8">
        </div>
        <slot name="body"></slot>
        <h1 v-if="warning">尚未選擇品項與數量</h1>
        <h1 v-if="modyType == 3">尚未選擇時間</h1>
        <h1 v-if="warning_" style="color: #C9151E">濾心尚未配對完全</h1>
        <h1 v-if="filter">更換濾心教學</h1>
        <h1 v-if="filter_">淨水管家小提示</h1>
        <h1 v-if="updateFailed">解除失敗</h1>
        <h1 v-if="modyType == 1">提交成功</h1>
        <h1 v-if="modyType == 2">修改成功</h1>
        <h1 v-if="modyType == 4">濾心更換成功</h1>
        <h1 v-if="modyType == 5">提交失敗</h1>
        <h1 v-if="modyType == 6">別忘記輸入內容哦！</h1>
        <h1 v-if="ForSuccessful">兌換成功</h1>
        <h1 v-if="ForFailure">兌換失敗</h1>
        <p v-if="filter">請先點擊下一步後，開始教學流程</p>
        <p v-if="filter_">已通知經銷商店家為您服務，將於近日與您聯繫</p>
        <p v-if="updateFailed">請再次嘗試或洽專人協助處理</p>
        <p v-if="modyType == 1">預約成功，近日將會有專人與您聯繫</p>
        <p v-if="modyType == 5"> 請再次嘗試或洽客服專線。</p><p v-if="modyType == 5">照片模糊而無法辨識亦會造</p><p v-if="modyType == 5"> 成提交失敗，請再試一次。</p>
        <p v-if="ForSuccessful">兌換券已存入我的兌換券中，出示兌換碼給店家，即可換取商品</p>
        <p v-if="ForFailure">點數不足，如有疑問請洽專人協助處理</p>
        <p v-if="modyType == 4">濾心壽命已經完全更新，您可以繼續使用</p>
        <p v-if="modyType == 4">櫻花淨水器產品與服務。</p>
        <a href="#" v-if="filter_">濾心官方價格請點此</a>
        <div class="btn_1" @click="noShowClick">
          <span v-if="warning || filter_ || updateFailed || modyType == 1 || modyType == 2||modyType == 5 || ForFailure || modyType == 3 || modyType == 4 ||modyType == 6|| modyType == 7|| modyType == 8">我知道了</span>
          <span v-if="filter">下一步</span>
          <span v-if="warning_">已通知</span>
          <span v-if="ForSuccessful">查看</span>
        </div>
        <div class="btn_2" @click="noClick" v-if="filter">
          略過
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'two',
  props: {
    isDialogShow: { type: Boolean, default: false },
    noShowClick: { type: Function, default: () => {} },
    noClick: { type: Function, default: () => {} },
    isShowClick: { type: Function, default: () => {} },
    warning: { type: Boolean, default: false },
    warning_: { type: Boolean, default: false },
    filter: { type: Boolean, default: false },
    filter_: { type: Boolean, default: false },
    updateFailed: { type: Boolean, default: false },
    // succeed: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    ForSuccessful: { type: Boolean, default: false },
    ForFailure: { type: Boolean, default: false },
    w: { type: String, default: '35rem' },
    modyType: String
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.guide_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
  webkit-overflow: hidden;
  background-color:rgba(0, 0, 0, .6);
  /deep/ .el-dialog__wrapper{
  //  webkit-z-index: 9996!important;
  //  overflow: hidden;
  //  webkit-overflow: hidden;
  }
  /deep/ .el-dialog {
    // z-index: 9999!important;
    width: 35rem;
    border-radius: 1.4rem!important;
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 2.5rem;
      .imgs {
        display: flex;
        justify-content: center;
        width: 9rem;
        height: 8rem;
        img {
          height: 8rem;
        }
      }
      h1 {
        margin-top: 1.5rem;
        line-height: 3rem;
        font-size: 2.2rem;
        color: rgba(61, 61, 61, 1);
        font-weight: 700;
      }
      p{
        margin-top: .6rem;
      }
      p,.btn_2 {
        line-height: 1.7rem;
        font-size: 1.2rem;
        color: rgba(134, 134, 134, 1);
      }
      a {
        font-size: 1.2rem;
        line-height: 2rem;
        color: #1FB6ED;
      }
      .btn_1 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 14.5rem;
        height: 4.6rem;
        margin-top: 4rem;
        background: rgba(31, 182, 237, 1);
        border-radius: .6rem;
        font-size: 1.4rem;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      .btn_2 {
        margin-top: 1.2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
