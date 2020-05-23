<template>
  <div class="exchange">
    <!-- <search-tow></search-tow> -->
    <points-card></points-card>
    <el-row :gutter="15" v-if="isShowBox">
      <el-col :md="12">
        <div @click="toDetailsClick">
          <ex-change-list @clickToExchange="clickToExchange"></ex-change-list>
        </div>
      </el-col>
      <el-col :md="12">
         <ex-change-list></ex-change-list>
      </el-col>
      <el-col :md="12">
         <ex-change-list></ex-change-list>
      </el-col>
      <el-col :md="12">
         <ex-change-list></ex-change-list>
      </el-col>
    </el-row>
    <blank :blankThree="true" v-else></blank>
    <guide-four :isDialogShow="isShowFour" :gift="true" :confirmClick="confirmClick" :noClick="noClick"></guide-four>
    <guide-two :isDialogShow="isShowTwo" :ForSuccessful="true" :w="'40rem'" :noShowClick="noShowTwoClick"></guide-two>
  </div>
</template>

<script>
// import SearchTow from '@/components/SearchTow'
import PointsCard from '@/components/PointsCard'
import ExChangeList from '@/components/ExchangeList'
import GuideFour from '@/components/PopUp/Guide_4'
import GuideTwo from '@/components/PopUp/Guide_2'
import Blank from '@/components/Blank'
export default {
  components: {
    PointsCard,
    ExChangeList,
    GuideFour,
    GuideTwo,
    Blank
  },
  data () {
    return {
      isShowFour: false,
      isShowTwo: false,
      isShowBox: false
    }
  },
  methods: {
    clickToExchange () {
      this.isShowFour = true
    },
    toDetailsClick () {
      this.$router.push({ name: 'toExchangeDetails' })
    },
    confirmClick () {
      this.isShowFour = false
      this.isShowTwo = true
    },
    noClick () {
      this.isShowFour = false
    },
    noShowTwoClick () {
      this.isShowTwo = false
      this.$router.push({ name: 'meVouchers' })
    }
  }
}
</script>

<style scoped lang="scss">
.exchange {
}
</style>
