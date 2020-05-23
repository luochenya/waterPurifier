<template>
  <div class="exchange-list">
    <el-card>
      <div class="image">
        <img src="../assets/img/single@2x.png" alt="">
      </div>
      <div class="text">
        <h1>大苑子·翡翠檸檬鞏固</h1>
        <h1>濾心可用兌換券</h1>
        <span>IB幣：300</span>
      </div>
      <div class="btn" @click.stop="clickToExchange">
        兌換
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'exchange-list',
  data () {
    return {
    }
  },
  methods: {
    clickToExchange () {
      this.$emit('clickToExchange')
    }
  }
}
</script>

<style scoped lang="scss">
.exchange-list {
  .el-card {
    border-radius: 1rem;
    margin-top: 1.5rem;
    /deep/ .el-card__body {
      display: flex;
      align-items: center;
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
      font-size: 1.4rem;
      h1 {
        line-height: 2rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      span {
        display: block;
        margin-top: 1.8rem;
        line-height: 2rem;
        color: #EE9702;
      }
    }
    .btn {
      width: 6.6rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .6rem;
      background: #1FB6ED;
      font-size: 1.4rem;
      color: #fff;
      cursor: pointer;
    }
  }
@media screen and (min-width:992px) and (max-width:1199px) {
  .el-card {
    position: relative;
    .btn {
      position: absolute;
      right: 1.8rem;
      bottom: 1.8rem;
    }
  }
}
}
</style>
