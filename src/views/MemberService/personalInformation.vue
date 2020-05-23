<template>
  <div class="personal">
    <div class="title">
      <h1>個人資訊</h1>
      <span>PERSONAL INFORMATION</span>
    </div>
    <el-card>
      <div class="top-content">
        <div class="name">
          <div class="pic">
            <img v-if="userName.CustPictureUrl" :src="userName.CustPictureUrl" alt="">
            <img v-else src="./../../assets/img/user_name.png" alt="">
          </div>
          <div class="text">
            <h1>{{userName.CustName}}</h1>
            <!-- <h1>消費者會員代號：A05541</h1> -->
          </div>
        </div>
        <div class="btn">
          <span><i class="mcicon-3"></i>
          {{userName.Mobile}}</span>
        </div>
      </div>
      <div class="bottom-content">
        <el-row :gutter="20">
          <el-col :lg="8">
            <div class="item">
              <span></span>
              <div class="text">
                <p>驗證地址</p>
                <p>{{userName.CustAddress}}</p>
              </div>
            </div>
          </el-col>
          <el-col :lg="8">
            <div class="item item-2">
              <span :class="{'icon': userName.LineBinding}"></span>
              <div class="text">
                <p>LINE綁定狀態</p>
                <p v-if="!userName.LineBinding">未綁定</p>
                <p v-else>已绑定</p>
              </div>
              <span class="site-bind" @click="isDialogShows=true"  v-if="!userName.LineBinding">去綁定</span>
               <binding-dialog :isDialogShow="isDialogShows" :goNoClick="goNoClick" :goToClick="goToClick"></binding-dialog>
            </div>
          </el-col>
          <el-col :lg="8" v-if="userName.LineBinding">
            <div class="item item-3" >
              <span></span>
              <div class="text">
                <p>我的推薦碼</p>
                <p>{{userName.ShareCode}}</p>
              </div>
              <div class="btn"
                v-clipboard:copy="userName.ShareCode"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">複製</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import BindingDialog from './../../components/BindingDialog'
import storage from './../../storage'
export default {
  name: 'personal-information',
  components: {
    BindingDialog
  },
  data () {
    return {
      isDialogShows: false,
      userName: {}
    }
  },
  mounted () {
    this.userName = storage.getItem('userName')
  },
  methods: {
    goToClick () {
      window.location.href = 'https://line.me/R/ti/p/@sakura.tw'
      this.isDialogShows = false
    },
    goNoClick () {
      this.isDialogShows = false
    },
    onCopy () {
      this.$message({
        message: '複製成功！',
        type: 'success'
      })
    },
    onError () {
      this.$message({
        message: '複製失敗！',
        type: 'error'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixin.scss';
.personal {
  padding-top: 4rem;
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
  .el-card {
    width: 78.8rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
    border-radius: 1rem;
    .top-content {
      @include flex(space-between);
      .name {
        @include flex();
        .pic {
          width: 10.2rem;
          height: 10.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border: .3rem solid #BDBDBD;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 10.2rem;
            height: 10.2rem;
          }
        }
        .text {
          margin-left: 2rem;
          h1 {
            line-height: 2.8rem;
            font-size: 2rem;
            font-weight: 700;
            color: #3D3D3D;
          }
        }
      }
      .btn {
        span {
          width: 16.8rem;
          height: 3.8rem;
          background-color: #1FB6ED;
          box-shadow: 0 1.2rem 3rem 0 rgba(1,181,240,.15);
          border-radius: .6rem;
          color: #fff;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          .mcicon-3 {
            margin-right: 1rem;
          }
        }
      }
    }
    .bottom-content {
      margin-top: 4.5rem;
      .el-col {
        .item {
          @include flex(flex-start);
          height: 6.9rem;
          min-height: 5.2rem;
          padding: .9rem 1.5rem;
          background: #F9F9FA;
          border-radius: .6rem;
          span {
            width: 2.272rem;
            height: 1.8rem;
            @include bgImg(2.272rem,1.8rem,'../../assets/img/icon_wuzi.png',2.272rem);
            margin-right: 1rem;
          }
          .text{
            p {
              line-height: 1.7rem;
              font-size: 1.2rem;
              color: #BDBDBD;
            }
            p:last-child{
              color: #3D3D3D;
            }
          }
        }
        .item-2 {
          span {
            width: 2rem;
            height: 2rem;
            @include bgImg(2rem,2rem,'../../assets/img/icon_line.png',2rem);
            &.icon {
              @include bgImg(2rem,2rem,'../../assets/img/icon_line2.png',2rem);
           }
          }
          .site-bind {
            width: 8rem;
            height: 2.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            margin-right: 0;
            background: #E6F8FF;
            border-radius: .6rem;
            font-size: 1.2rem;
            color: #1FB6ED;
          }

        }
        .item-3 {
          span {
            width: 1.857rem;
            height: 1.4rem;
            @include bgImg(1.857rem, 1.4rem,'../../assets/img/icon_fanhui.png',1.857rem);
          }
          .btn {
            width: 8rem;
            height: 2.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            background: #E6F8FF;
            border-radius: .6rem;
            font-size: 1.2rem;
            color: #1FB6ED;
          }
        }
      }
    }
  }
@media screen and (min-width:992px) and (max-width: 1199px) {
  .el-card{
    width: 80%;
    .bottom-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .el-col {
       margin-bottom: 1.5rem;
    }
    }

  }

}
@media screen and (max-width: 991px){
   .el-card{
    width: 90%;
    .top-content {
      // flex-direction: column;
      justify-content: space-between;
      .name {
        margin-bottom: 3rem;
      }
    }
  }
  .bottom-content {
    .el-col {
      margin-bottom: 1.5rem;
    }
  }
}
@media screen and (max-width: 767px){
   .el-card{
    .top-content {
      flex-direction: column;
      justify-content: space-between;
    }
  }

}
 @media screen and (max-width: 540px) {
   .el-card{
    width: 98%;
    /deep/ .el-card__body {
      padding: 1rem 0;
    }
    .top-content {
      .name {
        .pic {
          flex: 0 0 8rem;
          width: 8rem;
          height: 8rem;
          border: .2rem solid #fff;
          img {
            width: 8rem;
            height: 8rem;
          }
        }
        .text {
          margin-left: 1rem;
          h1 {
            line-height: 2.2rem;
            font-size: 1.6rem;
          }
        }
      }
    }
   }
 }
}
</style>
