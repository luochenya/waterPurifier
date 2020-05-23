<template>
  <el-footer class="footer">
    <div class="container">
        <!-- <span class="text-x">©2020 yinghuajingshuiqi<br />櫻花淨水器官網設計提案    www.yinghua.com</span> -->
        <span class="text-x"><a href="https://www.sakura.com.tw/pdf/%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E7%AE%A1%E7%90%86%E4%BF%9D%E8%AD%B7%E8%81%B2%E6%98%8E.pdf" target="_blank">個人資料管理保護聲明</a> @Copyright ©2017 Taiwan Sakura Corporation.All rights reserved.</span>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'nav-footer',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.el-footer {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.8rem;
    font-weight: 500;
    color: #C9C9C9;
    line-height: 3rem;
    a {
      text-decoration: none;
      margin-right: 1rem;
      color: #C9C9C9;
    }
  }
@media screen and (max-width:768px) {
  .el-footer {
    line-height: 2.6rem;
    margin-bottom: .6rem;
    font-size: 1.4rem;
  }
}
</style>
