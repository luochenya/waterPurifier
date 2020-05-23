<template>
  <div class="filter-state" v-if="list">
      <el-card class="card" :style="{height: isHeight}">
        <div class="icon">
          <img src="../assets/img/icon_list1.png" alt="">
          <div class="title">
            <h1>濾心{{list.Sequence}}號</h1>
            <span>型號：{{list.FilterName}}</span>
          </div>
          </div>
          <div class="filter-img"
            v-if="isRemainLife > 50 || isRemainLife === 50 && list.RemainDays >= 30 || isRemainLife < 50 && list.RemainDays < 30 ||  isRemainLife < 50"
            :class="{'filter-img_2': orange =isRemainLife === 50 && list.RemainDays >= 30, 'filter-img_3' :isRemainLife < 50 && list.RemainDays < 30 ||isRemainLife < 50}">
            <span>{{list.RemainLife}}</span>
            <em>濾心壽命</em>
          </div>
          <div class="filter-img_1" v-if="noFilter || isNo || complete">
              <img src="../assets/img/icon-ff.png" alt="" height="80">
          </div>
          <div class="fliter-txt" v-if="isRemainLife > 50 || isRemainLife === 50 && list.RemainDays >= 30 || isRemainLife < 50 && list.RemainDays < 30 ||isRemainLife < 50|| complete">
            <div class="fliter-item">
              <span>狀態</span>
              <span class="success">
                <i class="el-icon-success"></i>
                已配對</span>
            </div>
            <div class="fliter-item">
              <span>壽命</span>
              <span class="span_1">{{list.RemainLife}}</span>
            </div>
          </div>
           <!-- 无 -->
          <div class="fliter-txt fliter-txt-no" v-if="isNo">
            <div class="fliter-item">
              <span>狀態</span>
              <span>
                未配對</span>
            </div>
            <div class="fliter-item">
              <span>壽命</span>
              <span>無</span>
            </div>
          </div>
          <a href="javascript:;" v-if="list.RemainDays>=30" @click.stop="timeClick">建議{{list.RemainDays}}天後更換濾心</a>
          <a href="javascript:;" v-if="isRemainLife < 50 && list.RemainDays < 30" @click.stop="redClick">點我開始更新</a>
          <div class="btn" v-if="noFilter" @click.stop="theHorseClick">
            配對
          </div>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'filter-state',
  props: {
    list: { type: Object },
    theHorseClick: { type: Function, default: () => {} },
    // timeClick: { type: Function, default: () => {} },
    // redClick: { type: Function, default: () => {} },
    // yesFilter: { type: Boolean, default: false },
    noFilter: { type: Boolean, default: false },
    // orange: { type: Boolean, default: false },
    // red: { type: Boolean, default: false },
    complete: { type: Boolean, default: false },
    // time: { type: Boolean, default: false }, // 更换时间
    isNo: { type: Boolean, default: false },
    isHeight: { type: String, default: '26rem' }
  },
  data () {
    return {
      yesFilter: false,
      orange: false,
      red: false,
      mun: 0

    }
  },
  computed: {
    isRemainLife () {
      return +(this.list.RemainLife.substring(0, this.list.RemainLife.length - 1))
    }
  },
  methods: {
    timeClick () {
      this.$emit('timeClick')
    },
    redClick () {
      this.$emit('redClick')
    }
  }
}
</script>

<style scoped lang="scss">
.filter-state {
  .card {
    width: 100%;
    height: 26rem;
    border-radius: 1rem;
    padding: 2rem 3rem;
    margin-bottom: 20px;
    /deep/ .el-card__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      margin-top: 1rem;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      img {
        width: 12px;
        height: 26px;
        margin-right: 5px;
      }
      .title {
        h1 {
          font-size: 1.5rem;
          line-height: 2.1rem;
          font-weight: 700;
          color: #3D3D3D;
        }
        span {
          font-size: 1rem;
          line-height: 1.4rem;
          color: #BDBDBD;
        }
      }
    }
    .filter-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      background:url('../assets/img/Fill 1.png') no-repeat;
      box-shadow: 0 12px 30px 0 rgba(1,181,240,.15);
      color: #fff;
      span {
        font-size: 15px;
        font-weight: 500;
      }
      em {
        margin-top: 5px;
        font-size: 12px;
        font-weight: lighter;
      }
    }
    .filter-img_2 {
       background:url('../assets/img/Fill 1orange@2x (1).png') no-repeat;
      background-size: 8rem;
    }
    .filter-img_3 {
      background:url('../assets/img/Fill 1red@2x (2).png') no-repeat;
      background-size: 8rem;
    }
    .fliter-txt {
      width: 100%;
      margin-top: 30px;
      font-size: 14px;
      .fliter-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 15px;
        span {
          color: #C9C9C9;
        }
        .success {
          color: #00C922;
        }
        .span_1 {
          color: #3D3D3D;
        }
      }
    }
    .fliter-txt-no {
      color: #C9C9C9;
    }
    .btn {
      width: 16.8rem;
      height: 3.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 3.6rem;
      border-radius: .6rem;
      background: #1FB6ED;
      font-size: 1.6rem;
      color: #fff;
    }
    a {
      margin-top: 1.5rem;
      color: #1FB6ED;
    }
  }
 @media screen and (min-width:992px) and (max-width:1199px) {
    .card {
      padding: 1rem 2rem!important;
      .btn {
        width: 15rem;
      }
    }
 }
  @media screen and (max-width: 767px) {
   .fliter-txt {
    //  padding: 0 9rem;
   }
 }
  @media screen and (max-width: 430px) {
   .card {
     padding: 1.5rem;
     .btn {
       margin-top: 5rem;
       width: 10.3rem;
     }
   }
 }
}
</style>
