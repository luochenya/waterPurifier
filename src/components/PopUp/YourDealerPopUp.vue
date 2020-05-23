<template>
  <div class="guide" @touchmove.prevent>
    <div class="dialog" :style="{left: `${pLeft}px`, bottom: `${pBottom}px`}" v-if="isShow">
      <div class="left_btn" >
        <img src="./img/Thearrow_top@2x.png" alt="">
        <div class="item">
          <span>選擇濾心更換方式</span>
          <div class="btn" @click="btn">確認</div>
        </div>
      </div>
        <div class="right_btn">
        <span>到店取貨服務</span>
      </div>
    </div>

    <div class="dialog dialog_2" :style="{left: `${pLeft}px`, bottom: `${pBottom}px`}" v-else>
      <div class="left_btn" >
          <div class="item">
            <div class="btn" @click="btn">確認</div>
            <span>選擇濾心更換方式</span>
        </div>
        <img src="./img/Thearrow_right@2x.png" alt="">

      </div>
        <div class="right_btn">
        <span>到店取貨服務</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'your-dealer-pop-up',
  props: {
    btn: { type: Function, default: () => {} },
    pLeft: { type: Number },
    pBottom: { type: Number }
  },
  data () {
    return {
      fullWidth: document.documentElement.clientWidth,
      isShow: false
    }
  },
  mounted () {
    if (this.fullWidth <= 767) {
      this.isShow = false
    } else {
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="scss">
.guide {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  background-color:rgba(0, 0, 0, .6);
  .dialog {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 40rem;
    height: 20rem;
   /*  top: 30%;
    left: 50%; */
    // background: pink;
    .left_btn {
      img {
        width: 15.6rem;
        height: 10rem;
        margin-left: 50%;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
        span {
          line-height: 2.5rem;
          font-size: 1.8rem;
          color: #fff;
        }
        .btn {
          width: 12.5rem;
          height: 4.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          background:#1FB6ED;
          font-size: 1.4rem;
          border-radius: .6rem;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .right_btn {
      width: 16.2rem;
      height: 5.2rem;
      margin-top: -1.5rem;
      background: #fff;
      border-radius: .6rem;
      font-size: 1.6rem;
      color: #fff;
      border: .6rem solid #fff;
      span {
        width: 15rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1FB6ED;
        border-radius: .6rem;
      }
    }
  }
@media screen and (max-width: 767px) {
  .dialog_2 {
    .left_btn {
      position: relative;
      top: -26rem;
      left: 9rem;
      .btn {
        margin-bottom: 1.5rem;
      }
      .item {
        margin-bottom: 1.5rem;
      }
    }
  }
}
 @media screen and (max-width: 500px) {
   .dialog {
    .left_btn {
      position: relative;
      top:4rem;
      left:16rem;
      img {
        width: 10rem;
        height: 6.6rem;
      }
      .text {
        margin-bottom: 1.5rem;
      }
    }
  }
  .dialog_2 {
    .left_btn {
      position: relative;
      top: -23rem;
      left: 15rem;
    }
  }

 }
}
</style>
