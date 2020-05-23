<template>
  <div class="search">
    <div class="search-box">
      <i class="el-icon-search"></i>
      <input placeholder="請您輸入關鍵字"  />
    </div>
    <span>搜索</span>
  </div>
</template>

<script>
export default {
  name: 'search-tow',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 1.4rem;
    overflow: hidden;
    padding: 1.5rem;
    margin-bottom: 40px;
    .search-box {
      display: flex;
      align-items: center;
      margin-left: 20px;
      color:#BDBDBD;
      width: 80%;
      input {
        width: 100%;
        margin-left: 10px;
        background:none;
        outline:none;
        border:0px;
        color:#BDBDBD;
      }
    }
    span {
      font-size: 1.4rem;
      margin-right: 2rem;
      font-weight: 700;
      color: #3D3D3D;
    }
  @media only screen and (min-width: 993px) and (max-width: 1200px) {
    /deep/  .el-select,.el-input,.el-input--suffix {
      width: 20%!important;
    }
  }
  @media only screen and (max-width:993px) {
    /deep/  .el-select,.el-input,.el-input--suffix {
    width: 30%!important;
   }
  .search-box {
    margin-left: 0!important;
    padding: 0!important;
   }
  }
  @media only screen and (max-width: 575px){
    /deep/  .el-select,.el-input,.el-input--suffix {
      width: 40%!important;
   }
 }

  }

</style>
