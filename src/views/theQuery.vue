<template>
  <div class="contents">
    <!-- <search></search> -->
    <el-card>
      <el-row>
        <el-col :md="12" :lg="14">
          <span>剩餘點數</span>
          <h1>{{userName.Points}}<span>點</span></h1>
          <p>收集點數可以換獎品  Collect points for prizes</p>
        </el-col>
        <el-col :md="12" :lg="10">
          <!-- <div class="btn">
            <div class="item item-1" @click="clickMeVouchers">我的兌換券</div>
            <div class="item item-2" @click="clickToExchange">去兌換</div>
          </div> -->
          <span>已分享{{userName.Shares}}人</span>
        </el-col>
      </el-row>
    </el-card>
    <div class="task">
      <div class="tabs">
        <span @click="num=0" :class="{active:num==0}">永久任務</span>
        <span @click="num=1" :class="{active:num==1}">限時任務</span>
      </div>
      <el-row :gutter="15" v-show="num==2">
        <el-col :md="12">
          <task-card :isClickTask="isClickTask"></task-card>
        </el-col>
        <el-col :md="12">
           <task-card></task-card>
        </el-col>
        <el-col :md="12">
           <task-card></task-card>
        </el-col>
        <el-col :md="12">
           <task-card></task-card>
        </el-col>
      </el-row>

       <el-row :gutter="15" v-show="num==3">
        <el-col :md="12">
          <task-card :istask="true"></task-card>
        </el-col>
        <el-col :md="12">
           <task-card :istask="true"></task-card>
        </el-col>
        <el-col :md="12">
           <task-card :istask="true"></task-card>
        </el-col>
        <el-col :md="12">
           <task-card :istask="true"></task-card>
        </el-col>
      </el-row>
    </div>
    <replace-filter :isDialogShow="isShowReplace" :confirmClick="ClickReplace"></replace-filter>
    <blank :blankThree="true"></blank>
  </div>
</template>

<script>
// import Search from '@/components/SearchTow'
import TaskCard from '@/components/Task'
import ReplaceFilter from '@/components/PopUp/ReplaceFilter'
import Blank from '@/components/Blank'
import storage from './../storage'
export default {
  components: {
    TaskCard,
    ReplaceFilter,
    Blank
  },
  data () {
    return {
      num: 0,
      isShowReplace: false,
      userName: {}
    }
  },
  mounted () {
    this.userName = storage.getItem('userName')
  },
  methods: {
    clickMeVouchers () {
      this.$router.push({ name: 'meVouchers' })
    },
    clickToExchange () {
      this.$router.push({ name: 'toExchange' })
    },
    isClickTask () {
      this.isShowReplace = true
    },
    ClickReplace () {
      this.isShowReplace = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.contents {
  .el-card {
    border-radius: 1rem;
    .el-row {
      position: relative;
      margin: 1.5rem;
    }
    .el-col:first-child {
      span {
        line-height: 2.4rem;
        font-size: 1.7rem;
        font-weight: 500;
        color: #868686;
      }
      h1 {
        line-height: 5.6rem;
        font-size: 4rem;
        font-weight: 700;
        color: #3D3D3D;
        span {
          font-size: 1.4rem;
          margin-left: 1rem;
          font-weight: 700;
          color: #3D3D3D;
        }
      }
      p {
        line-height: 1.7rem;
        margin-top: 1.8rem;
        font-size: 1.2rem;
        color: #BDBDBD;
      }
    }
    .el-col:last-child {
      .btn {
      /*   display: flex;
        justify-content: space-between */
        @include flex(space-between);
        .item {
         @include flex();
         width: 12rem;
         height: 4rem;
         border-radius: .6rem;
         border: .2rem solid #1FB6ED;
         font-size: 1.6rem;
         font-weight: 700;
        }
        .item-1 {
          background: #E2F7FF;
          color: #1FB6ED;
          margin-right: 2rem;
        }
        .item-2 {
          background: #1FB6ED;
          color: #fff;
        }
      }
      span {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 1.2rem;
        line-height: 1.7rem;
        color: #3D3D3D;
        font-weight: 700;
      }
    }
  }
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
    .el-row {
      .el-col{
        padding-top: 0!important;
      }
      // margin-top: 1.5rem;
      // .el-col:nth-of-type(1), {

      // }
   /*    .el-card {
        margin-bottom: 1.5rem;
        /deep/ .el-card__body{
          @include flex(space-between);
        }
        .title {
          h1 {
            line-height: 2.5rem;
            font-size: 1.8rem;
            font-weight: 700;
            color: #EE9702;
          }
          span {
            margin-top: 1.2rem;
            line-height: 2rem;
            font-size: 1.4rem;
            color: #BDBDBD;
            .nub {
              margin-left: .6rem;
            }
          }
        }
        .tex {
          line-height: 2.5rem;
          font-size: 1.8rem;
          font-weight: 700;
          color: #3D3D3D;
        }
      } */
    }
  }
@media screen and (max-width: 992px) {
  .el-card{
    .el-row{
      .el-col:last-child {
        margin-top: 2rem;
        margin-bottom: 1.5rem;
          span {
            bottom: -2rem;
          }
      }

    }
  }
}
}
</style>
