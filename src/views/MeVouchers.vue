<template>
  <div class="me-vouchers">
    <!-- <search-tow></search-tow> -->
    <points-card></points-card>
      <div class="task">
        <div class="tabs">
          <span @click="num=0" :class="{active:num==0}">可用兌換券</span>
          <span @click="num=1" :class="{active:num==1}">已使用/已逾期</span>
        </div>
        <el-row :gutter="15" v-show="num==3">
          <el-col :md="12">
            <me-vouchers-list></me-vouchers-list>
          </el-col>
          <el-col :md="12">
            <me-vouchers-list></me-vouchers-list>
          </el-col>
           <el-col :md="12">
            <me-vouchers-list></me-vouchers-list>
          </el-col>
           <el-col :md="12">
            <me-vouchers-list></me-vouchers-list>
          </el-col>
        </el-row>

        <el-row :gutter="15" v-show="num==4">
          <el-col :md="12">
            <me-vouchers-list :isTest="true"></me-vouchers-list>
          </el-col>
          <el-col :md="12">
            <me-vouchers-list :isTest="true"></me-vouchers-list>
          </el-col>
           <el-col :md="12">
            <me-vouchers-list :isTest="true"></me-vouchers-list>
          </el-col>
           <el-col :md="12">
            <me-vouchers-list :isTest="true"></me-vouchers-list>
          </el-col>
        </el-row>
      </div>
      <blank :blankThree="true"></blank>
  </div>
</template>

<script>
// import SearchTow from '@/components/SearchTow'
import PointsCard from '@/components/PointsCard'
import MeVouchersList from '@/components/MeVouchersList'
import Blank from '@/components/Blank'

export default {
  components: {
    PointsCard,
    MeVouchersList,
    Blank
  },
  data () {
    return {
      num: 0
    }
  }
}
</script>

<style scoped lang="scss">
.me-vouchers {
  .task {
    margin-top: 3.4rem;
    .tabs {
      margin-bottom: 1.5rem;
      span {
        line-height: 2.2rem;
        font-size: 1.8rem;
        font-weight: 700;
        color: #BDBDBD;
        cursor: pointer;
      }
      span:first-of-type{
        margin-right: 1.5rem;
      }
      .active {
        font-size: 2.2rem;
        color: #3D3D3D;
      }
    }
  }
}
</style>
