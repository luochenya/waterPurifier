<template>
  <div class="search">
    <el-select v-model="value" placeholder="我的產品">
      <el-option
        label="我的產品"
        value="1">
      </el-option>
    </el-select>
    <div class="search-box">
      <i class="el-icon-search"></i>
      <input placeholder="請您選擇對應的產品"  />
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
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
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    padding: 6px 10px;
    margin-bottom: 40px;
    .el-select {
      color: #3D3D3D;
    }
    /deep/  .el-select,.el-input,.el-input--suffix {
      width: 16%;

    }
    /deep/  .el-input__inner {
      border: none;
    }
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
