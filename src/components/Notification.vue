<template>
  <div class="container">
    <div class="header">
       <h1>訊息通知</h1>
       <span>Notification message</span>
    </div>
    <div class="content" v-show="isShow">
       <el-card class="card">
        <img src="../assets/img/notification.png" alt="">
        <div class="tex">
          <h1>濾心到期維護消息</h1>
          <span>PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注水...</span>
        </div>
        <div class="to" @click="isShowMsg">
          <a href="#">查看詳情</a>
        </div>
      </el-card>
      <el-card class="card">
        <img src="../assets/img/notification.png" alt="">
        <div class="tex">
          <h1>濾心到期維護消息</h1>
          <span>PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注水...</span>
        </div>
        <div class="to" @click="isShowMsg">
          <a href="#">查看詳情</a>
        </div>
      </el-card>
      <el-card class="card">
        <img src="../assets/img/notification.png" alt="">
        <div class="tex">
          <h1>濾心到期維護消息</h1>
          <span>PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注水...</span>
        </div>
        <div class="to" @click="isShowMsg">
          <a href="#">查看詳情</a>
        </div>
      </el-card>
      <el-card class="card">
        <img src="../assets/img/notification.png" alt="">
        <div class="tex">
          <h1>濾心到期維護消息</h1>
          <span>PP濾心是水處理設備中重要的水處理耗材，隨著人們生活質量的不斷提升，用水安全受到人們關注水...</span>
        </div>
        <div class="to" @click="isShowMsg">
          <a href="#">查看詳情</a>
        </div>
      </el-card>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
    <el-card class="card_2" v-show="isShowMessage">
      <div class="title">
        <h1>濾心到期維護消息</h1>
        <span>通知時間：2020年03月04日</span>
      </div>
      <div class="text">
        <p>敬愛的客戶您好!</p>
        <p>您的淨水器濾心已經到期，請立即更新，如您並未購買此產品卻受到此訊息，請優速與專人聯繫，確保您的收益。</p>
        <div class="btn" @click="btn">
         <span>我知道了</span>
        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  name: 'notification',
  data () {
    return {
      isShow: true,
      isShowMessage: false
    }
  },
  methods: {
    isShowMsg () {
      this.isShowMessage = true
      this.isShow = false
    },
    btn () {
      this.isShowMessage = false
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 4rem;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  h1 {
    line-height: 4.4rem;
    font-size: 2.8rem;
  }
  span {
    line-height: 1.7rem;
    font-size: 1.2rem;
  }
}
.content {
  display: flex;
  flex-direction: column;
  .card {
    width: 100%;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    /deep/ .el-card__body {
      display: flex;
      img {
        flex: 0 0 3.8rem;
        width: 3.8rem;
        height: 3.8rem;
        margin-right: 0.8rem;
      }
      .tex {
        flex: 1;
        margin-top: -0.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        h1 {
          line-height: 3rem;
          font-size: 2.2rem;
          color: rgba(61, 61, 61, 1);
        }
        span {
          line-height: 2rem;
          font-size: 1.2rem;
          color: rgba(134, 134, 134, 1);
        }
      }
      .to {
        flex:0 0 4.8rem;
        text-align: right;
        a {
          font-size: 1.2rem;
          color: rgba(31, 182, 237, 1);
        }
      }
    }

    }
}

.card_2 {
  width: 100%;
  .title {
    text-align: center;
    margin-bottom: 2rem;
    h1{
      line-height: 3rem;
      font-size: 2.2rem;
    }
    span {
      line-height: 1.7rem;
      font-size: 12px;
      color: rgba(31, 182, 237, 1);
      font-weight: lighter;
    }
  }
  .text {
    width: 85%;
    margin: 0 auto;
    p {
      line-height: 2.3rem;
      font-size: 1.4rem;
      color: rgba(61, 61, 61, 1);
    }
    P:last-of-type {
      text-indent: 2em;
      margin-bottom: 6rem;
    }
    .btn {
      margin-left: auto;
      width: 16.8rem;
      height: 4.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .6rem;
      background: rgba(31, 182, 237, 1);
      font-size: 1.4rem;
      color: rgba(255, 255, 255, 1);
    }
  }

}
.el-pagination {
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
}
@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .content{
    .card {
      .tex {
        width: 55%;
        font-size: 1.8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
@media only screen and (max-width: 433px) {
   .container {
     padding: 0;
   }
   .content{
    .card {
      /deep/ .el-card__body {
        width: 98%;
        padding: 2.5rem 1rem 2rem 1.5rem;
        .tex {
          h1 {
            font-size: 1.8rem;
          }
        }
      }
    }
   }
}
</style>
