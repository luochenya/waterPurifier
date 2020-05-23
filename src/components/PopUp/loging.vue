<template>
  <div class="guide_2">
    <el-dialog
      :visible.sync="isDialogShow"
      :show-close="false">
      <div class="content">
        <div class="imgs">
          <img src="./img/loading@2x (2).png" alt="" style="width:6rem;">
        </div>
        <p>處理中，請稍候...</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'loging',
  props: {
    isDialogShow: { type: Boolean, default: false }
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
    width: 20.6rem;
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
        width: 6.1rem;
        height: 6rem;
        margin-bottom: 2.4rem;
        img {
          height: 6rem;
        }
      }
      p,{
        line-height: 1.7rem;
        font-size: 1.2rem;
        color: rgba(134, 134, 134, 1);
      }
      .btn {
         display: flex;
         margin-top: 4rem;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 13rem;
          height: 4rem;
          border-radius: .6rem;
        }
        .item_1 {
          background-color: #1FB6ED;
          color: #fff;
          margin-right: 2rem;
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
