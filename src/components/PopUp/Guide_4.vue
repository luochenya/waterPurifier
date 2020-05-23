<template>
  <div class="guide_2">
    <el-dialog
      :visible.sync="isDialogShow"
      :show-close="false">
      <div class="content">
        <div class="imgs">
          <img src="./img/update@2x (1).png" alt="" style="width:6.1rem; height:6rem" v-if="update">
          <img src="./img/warning@2x.png" alt=""  style="width:9rem;" v-if="varning">
          <img src="./img/exit@2x (5).png" alt="" style="width:6rem;height:6rem" v-if="exit">
          <img src="./img/gift@2x (6).png" alt="" style="width:6rem;height:6rem" v-if="gift">
        </div>
        <p v-if="update">您確定要更新此型號KSP的濾心嗎</p>
        <h1 v-if="varning" style="color: #C9151E">濾心尚未配對完全</h1>
        <h1 v-if="exit">確定登出帳號嗎？</h1>
        <h1 v-if="gift" class="gift-name">確認兌換</h1>
        <p v-if="gift" class="gift">商品兌換後，無法取消更改兌換品項</p>
        <div class="btn" v-if="update">
          <span class="item_1" @click="confirmClick">確認更換</span>
          <span class="item_2" @click="noClick">取消動作</span>
        </div>
         <div class="btn" v-if="varning">
          <span class="item_1" @click="confirmClick">購買濾心</span>
          <span class="item_1" @click="noClick">已購買</span>
        </div>
        <div class="btn" v-if="exit || gift">
          <span class="item_1" @click="confirmClick">確定</span>
          <span class="item_2" @click="noClick">取消</span>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'guide-four',
  props: {
    isDialogShow: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    varning: { type: Boolean, default: false },
    exit: { type: Boolean, default: false },
    gift: { type: Boolean, default: false },
    confirmClick: { type: Function, default: () => {} },
    noClick: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.guide_2 {
  /deep/ .el-dialog {
    width: 35rem;
    border-radius: 1.4rem!important;
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 2rem 3rem 3rem;
      .imgs {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 9rem;
        height: 8rem;
        margin-bottom: 2rem;
        // img {
        //   height: 6rem;
        // }
      }
      p{
        line-height: 1.7rem;
        font-size: 1.2rem;
        color: rgba(134, 134, 134, 1);
      }
      h1 {
        font-size: 1.6rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      .gift-name {
        line-height: 2rem;
        font-size: 2rem;
      }
      .gift {
        line-height: 2rem;
        font-size: 1.4rem;
        margin-top: .9rem;
        color: #868686;
      }
      .btn {
        width: 100%;
         display: flex;
         margin-top: 3rem;
         justify-content: space-between;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 12.6rem;
          height: 3.6rem;
          border-radius: .6rem;
          cursor: pointer;
        }
        .item_1 {
          background-color: #1FB6ED;
          color: #fff;
          // margin-right: 2rem;
        }
         .item_2 {
          background-color: #E6F8FF;
          color: #1FB6ED;
        }
      }
    }
  }
}
</style>
