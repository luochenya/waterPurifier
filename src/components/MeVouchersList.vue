<template>
  <div class="me-vouchers-list">
    <el-card>
      <div class="image">
        <img src="../assets/img/single@2x.png" alt="">
      </div>
       <div class="text text-x" v-if="isTest">
        <h1>大苑子·翡翠檸檬可用兌換券</h1>
      </div>
      <div class="text" v-else>
        <h1>大苑子·翡翠檸檬可用兌換券</h1>
        <span>兌換碼：XYZ78901</span>
        <span>兌換期限：2020年12月31日</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'me-vouchers-list',
  props: {
    isTest: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.me-vouchers-list {
  .el-card {
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    /deep/ .el-card__body {
      display: flex;
    }
    .image {
      flex: 0 0 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 8rem;
      height: 8rem;
      background: #F3F3F5;
      border-radius: .5rem;
      img {
        height: 6.4rem;
      }
    }
    .text {
      flex: 1;
      margin-left: 1rem;
      h1 {
        line-height: 2rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: #3D3D3D;
        margin-bottom: 1.8rem;
      }
      span {
        display: block;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #BDBDBD;
      }
    }
    .text-x {
      display: flex;
      align-items: center;
    }
  }
}
</style>
