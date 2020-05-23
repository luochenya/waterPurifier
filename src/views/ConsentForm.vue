<template>
  <div class="consent-form">
    <el-card>
      <div class="title">
        <span></span>
        <div class="name">
          <h1>用戶使用協議</h1>
          <p>User Agreement</p>
        </div>
      </div>
      <div class="text">
        <p><em>第一條</em>: PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注，水處理設備中的PP濾心性能直接影響出水水質。下面小編為大家詳細介紹一下PP濾心對進水水質的要求</p>
        <p><em>第二條</em>: 如果進水水壓過大，需要在水處理設備前面安裝一個減壓閥，如果進水壓力過小，則需要添加一個增壓泵</p>
        <p><em>第三條</em>：PP濾心對進水水溫也有一定要求，進水必須使用常溫自來水而不能使用熱水，在開水器等熱溫裝置之前安裝水處理設備，在安裝時水處理設備安裝位置需要比開水器的位置低。</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.consent-form {
  .el-card {
    border-radius: 1rem;
    .title {
      @include flex(flex-start);
      span {
         @include bgImg(2rem,2.8rem,'../assets/img/CustomerService2x.png');
         margin-right: .5rem;
      }
      h1 {
        line-height: 2.2rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      p {
        font-size: 1rem;
        color: #BDBDBD;
      }
    }
    .text {
      padding: 1rem 1.6rem;
      background: #F9F9FA;
      border-radius: 1rem;
      p {
        line-height: 2.8rem;
        font-size: 1.2rem;
        color: #868686;
        em {
          font-weight: 700;

        }
      }
    }
  }
}
</style>
