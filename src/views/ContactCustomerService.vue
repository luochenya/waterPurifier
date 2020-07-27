<template>
  <div class="contents">
    <div class="title">
      <h1>聯繫客服</h1>
      <span>CONTACT CUSTOMER SERVICE</span>
    </div>
    <el-card>
      <el-row>
        <el-col :span="24" class="col_1">
          <img src="../assets/img/CustomerService2x.png" alt="">
          <div class="text">
            <h1>客服專線</h1>
            <span>Customer Service Hotline</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="left_text">
            <i class="mcicon-3"></i>
            <!-- <span>0909-611-818</span> -->
            <span><a href="tel:+0909-611-818">0909-611-818</a></span>
          </div>
          <div class="btn" @click="$router.push({ name: 'SearchProducts' })">返回我的產品列表</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'contact-customer-service'
}
</script>

<style scoped lang="scss">
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
    }
  }
  .el-card {
    border-radius: 1rem;
    .col_1 {
      display: flex;
      align-items: center;
      img {
        width: 2rem;
        height: 2.8rem;
        margin-right: .6rem;
      }
      .text {
        h1 {
          line-height: 2.2rem;
          font-size: 1.6rem;
          color: #3D3D3D;
        }
        span {
          font-size: 1rem;
          color: #BDBDBD;
        }
      }
    }
    .el-col:last-of-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4rem;
      .left_text {
        line-height: 2.8rem;
        font-size: 2rem;
        font-weight: 500;
        color: #3D3D3D;
        .mcicon-3 {
          margin-right: .5rem;
        }
      }
      .btn {
        padding: 1rem 1.5rem;
        border-radius: .6rem;
        background:#1FB6ED;
        color: #fff;
      }
    }
  }
}
</style>
