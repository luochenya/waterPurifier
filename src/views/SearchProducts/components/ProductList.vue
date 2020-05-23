<template>
  <div class="container-card" @click="clickProduct">
    <el-card>
      <div class="product-top">
        <div class="img">
          <img src="../../../assets/img/icon_list1.png" alt="">
        </div>
        <div class="btn">
          <span>更換濾心</span>
        </div>
      </div>
      <div class="tex">
        <h1>型號：A214234</h1>
        <span>製造號碼：XIN9123IQW22</span>
      </div>
      <div class="map">安裝地址：436台中市雅潭路236號5樓</div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array }
  },
  data () {
    return {
    }
  },
  methods: {
    clickProduct () {
      this.$router.push({ name: 'Toproduct' })
    }
  }
}
</script>

<style scoped lang="scss">
.container-card {
  width: 100%;
  .el-card {
    border-radius: 1.4rem;
    cursor: pointer;
  }
  .product-top {
    display: flex;
    justify-content: space-between;
    .img {
      width: 7.1rem;
      height: 7.1rem;
      display: flex;
      justify-content: center;
    }
    .btn {
      width: 8rem;
      height: 2.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .4rem;
      background: rgba(255, 244, 192, 1);
      font-size: 1.2rem;
      color: rgba(233, 154, 0, 1);
    }
  }
  .tex {
    margin-top: 1.5rem;
    h1 {
      line-height: 2.8rem;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: .4rem;
      color: rgba(31, 182, 237, 1);
    }
    span {
      margin-top: .6rem;
      line-height: 2.2rem;
      font-size: 1.4rem;
      color: rgba(134, 134, 134, 1);
    }
  }
  .map {
    margin-top: 1.4rem;
    line-height: 2.2rem;
    font-size: 1.4rem;
    color: rgba(134, 134, 134, 1);
  }

}
</style>
