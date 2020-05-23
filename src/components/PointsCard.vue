<template>
  <div class="points">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="16" :md="14">
          <span>剩餘點數</span>
          <h1>{{userName.Points}}<span>點</span></h1>
          <p>收集點數可以換獎品  Collect points for prizes</p>
        </el-col>
        <el-col :xs="8" :sm="8" :md="10">
          <!-- <div class="btn">
            <div class="item item-1" @click="clickMeVouchers">我的兌換券</div>
            <div class="item item-2">去兌換</div>
          </div>
          <span>exchange</span> -->
          <div class="image">
            <img src="../assets/img/two_pic@2x.png"  alt="">
          </div>
          <span class="share">已分享5人</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import storage from './../storage'
export default {
  name: 'points-card',
  data () {
    return {
      userName: {}
    }
  },
  mounted () {
    this.userName = storage.getItem('userName')
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.points {
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
        color: #BDBDBD;
      }
      .image {
        @include flex();
        width: 8.8rem;
        height: 8.7rem;
        // margin-top: 1rem;
        margin-left: auto;
        img {
          height: 8.7rem;
          margin-right: 2.5rem;
        }
      }
      .share {
        font-size: 1.2rem;
        font-weight: bold;
        color: #3D3D3D;
      }
    }
  }
@media screen and (max-width: 460px) {
  .el-card{
    .el-row {
      .el-col:last-child{
        .image {
          img {
            margin-right: 0;
          }
        }
      }
    }
  }
}
}
</style>
