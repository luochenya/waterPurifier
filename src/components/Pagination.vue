<template>
  <div class="paginations">
    <div class="containers">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentpage"
        layout="prev, pager, next"
        :hide-on-single-page="isHidePage"
        :total="total"
        :pager-count="5"
        >
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: Number,
    handleSizeChange: {
      type: Function,
      default: () => {}
    },
    pagesize: Number,
    currentpage: Number,
    handleCurrentChange: {
      type: Function,
      default: () => {}
    },
    isHidePage: Boolean
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='scss'>
.paginations {
  padding: 5rem 0;
  .containers {
    display: flex;
    justify-content: center;
    // 數字選中狀態
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #1FB6ED;
      background-color: transparent;
    }
    .el-pagination .el-pager li {
      font-size:1.4rem;
      color:rgba(130,130,130,1);
      line-height:2.2rem;
    }
    .el-pagination.is-background .el-pager li {
      margin: 0;
      padding: 0 2rem !important;
      // width:1.4rem!important;
      height:2.1rem!important;
      background-color: transparent;
      border-right: 1px solid rgba(130,130,130,1);
    }
    .el-pagination.is-background .el-pager li:last-child {
      border-right: none;
    }

    // 省略號
    .el-pager .more::before {
      line-height: 0;
    }
    // 左箭頭
    .el-pagination.is-background .btn-prev{
      margin-top: 0.4rem;
      width: 1.4rem !important;
      background:url('../assets/imgs/left.png') no-repeat;
      .el-icon-arrow-left:before {
        content: '';
      }
    }
    // 右箭頭
    .el-pagination.is-background .btn-next{
      margin-top: 0.4rem;
      width: 1.4rem !important;
      background:url('../assets/imgs/right.png') no-repeat;
      .el-icon-arrow-right:before {
        content: '';
      }
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]) {
      min-width: 0;
    }
  }
}
@media only screen and (max-width:767px) {
  .paginations {
    padding: 2rem 0;
    .containers {
      .el-pagination.is-background .el-pager li {
        padding: 0 1rem !important;
      }
    }
  }
}
</style>
