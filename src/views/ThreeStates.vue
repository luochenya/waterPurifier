<template>
  <div class="to-product">
    <div class="title">
      <h1>查找產品</h1>
      <spna>FIND A PRODUCT</spna>
    </div>
    <el-card class="card" v-if="false">
      <div class="product-model">
        <div class="model-img">
          <img src="../assets/img/SAKURA@2x.png" alt="">
        </div>
        <div class="model">
          <h2 class="model-name">型號：A214234</h2>
          <span>製造號碼：XIN9123IQW22</span>
          <span>安裝日期：2019年09月13日</span>
          <span>安裝地址：436台中市雅潭路236號5樓</span>
        </div>
        <div class="btn">
          居家環境水質分析
        </div>
      </div>
    </el-card>
    <el-row :gutter="15" v-if="true">
      <el-col :md="8">
        <div @click="toClick">
          <filter-state :yesFilter="true" :time="true" :isHeight="'30rem'" :timeClick="timeClick"></filter-state>
        </div>
      </el-col>
      <el-col :md="8">
        <filter-state :orange="true" :time="true" :isHeight="'30rem'" :timeClick="redClick"></filter-state>
      </el-col>
      <el-col :md="8">
        <filter-state :red="true"  :isHeight="'30rem'" :redClick="theHorseClick"></filter-state>
      </el-col>
    </el-row>

    <blank></blank>
  </div>
</template>

<script>
import FilterState from '@/components/FilterState'
import Blank from '@/components/Blank'
export default {
  components: {
    FilterState,
    Blank
  },
  data () {
    return {
    }
  },
  methods: {
    // 1
    timeClick () {
      this.$router.push({ name: 'FilterToView' })
    },
    // 2
    redClick () {
      this.$router.push({ name: 'FilterToView' })
    },
    // 3
    theHorseClick () {
      this.$router.push({ name: 'FilterToView' })
    },
    // 卡片
    toClick () {
      this.$router.push({ name: 'FilterToView' })
    }

  }
}
</script>

<style scoped lang="scss">
.to-product {
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
      font-weight: lighter;
    }
  }
  .card {
    border-radius: 1rem;
    padding: 2rem 3rem;
    margin-bottom: 2rem;
    .product-model {
      height: 100%;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .model-img {
        flex: 0 0 10.3rem;
        width: 10.3rem;
        margin-right: 1.5rem;
        img {
          width: 10.3rem;
        }
      }
      .model {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-right: 1.5rem;
        .model-name {
          line-height: 2.8rem;
          margin-bottom: .6rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1FB6ED;
        }
        span {
          line-height: 2.1rem;
          font-size: 1.3rem;
          color: #868686;
        }

      }
      .btn {
        width: 16.8rem;
        height: 4.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        background: #1FB6ED;
        border-radius: .6rem;
        color: #fff;
        }
    }
  }
}
</style>
