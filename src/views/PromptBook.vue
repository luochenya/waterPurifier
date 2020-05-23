<template>
  <div class="prompt-book">
    <div class="top">
      <img src="../assets/img/PromptBook.vue4@2x (1).png" alt="">
     <div class="name">
       <span>淨水管家小提示</span>
       <h1>恭喜您完成首次配對</h1>
     </div>
    </div>
    <el-card>
      <div class="title">
        <span></span>
        <div class="name">
          <h1>用戶使用協議</h1>
          <p>User Agreement</p>
        </div>
      </div>
      <div class="content">
        <h1>用戶使用協議</h1>
        <p>第一條：PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注，水處理設備中的PP濾心性能直接影響出水水質。下面小編為大家詳細介紹一下PP濾心對進水水質的要求；</p>
        <p>第二條：如果進水水壓過大，需要在水處理設備前面安裝一個減壓閥，如果進水壓力過小，則需要添加一個增壓泵；</p>
        <p>第三條：PP濾心對進水水溫也有一定要求，進水必須使用常溫自來水而不能使用熱水，在開水器等熱溫裝置之前安裝水處理設備，在安裝時水處理設備安裝位置需要比開水器的位置低。</p>

       <h1 class="htop">濾心更換建議書</h1>
        <p>第一條：PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注，水處理設備中的PP濾心性能直接影響出水水質。下面小編為大家詳細介紹一下PP濾心對進水水質的要求；</p>
        <p>第二條：如果進水水壓過大，需要在水處理設備前面安裝一個減壓閥，如果進水壓力過小，則需要添加一個增壓泵；</p>
        <p>第三條：PP濾心對進水水溫也有一定要求，進水必須使用常溫自來水而不能使用熱水，在開水器等熱溫裝置之前安裝水處理設備，在安裝時水處理設備安裝位置需要比開水器的位置低。</p>

      </div>
      <div class="footer">我已詳細瞭解規章內容，並完全遵守：<i></i> 用戶使用協議 <i></i> 濾心更換建議書</div>
      <div class="btn">我同意</div>
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
.prompt-book {
  .top {
    display: flex;
    align-items: center;
    color: #fff;
    margin-bottom: 3rem;
    img {
      width: 6.9rem;
      height: 6.1rem;
      margin-right: 1rem;
    }
    span {
      line-height: 3rem;
      font-size: 2.2rem;
    }
    h1 {
      line-height: 4.2rem;
      font-size: 3rem;
      font-weight: 700;
    }
  }
  .el-card {
    border-radius: 1rem;
    padding: 1rem;
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
    .content {
      width: 66.8rem;
      background: #F9F9FA;
      border-radius: 1rem;
      padding: 1.6rem;
      margin-top: 2rem;
      h1 {
        line-height: 2.4rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      .htop{
        margin-top: 3rem;
      }
      p {
        line-height: 2.4rem;
        font-size: 1.2rem;
        color: #868686;
      }
    }
    .footer {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      line-height: 2rem;
      font-size: 1.4rem;
      color: #3D3D3D;
      i {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        margin-left: 1.5rem;
        margin-right: .5rem;
        border-radius: 50%;
        border: .1rem solid #ccc;
      }
    }
    .btn {
      width: 16.8rem;
      height: 4.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      margin-left: auto;
      background: #1FB6ED;
      font-size: 1.6rem;
      border-radius: .6rem;
      color: #fff;
    }
  }
}
</style>
