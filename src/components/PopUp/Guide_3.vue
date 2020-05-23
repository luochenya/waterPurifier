<template>
  <div class="guide">
    <div class="dialog">
      <div class="left_dialog">
        <div class="text">
          <span>點擊“通知經銷商更換”按鈕</span>
          <span>預約濾心更換</span>
        </div>
        <div class="pic">
          <img src="./img/Thearrow_right@2x.png" alt="">
        </div>

      </div>
      <div class="right_dialog">
        <img src="./img/warning@2x.png" alt="">
        <h1>濾心尚未配對完全</h1>
        <div class="btn">
          <span @click="BtnLeft">通知經銷商更換</span>
          <span @click="BtnLeft">已購買</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide-three',
  props: {
    BtnLeft: { type: Function, default: () => {} },
    BtnBottom: { type: Function, default: () => {} }
  },
  data () {
    return {
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
    display: flex;
    position: relative;
    top: 36%;
    left: 43%;
    transform: translate(-50%,-50%);
    width: 62rem;
    .left_dialog {
      display: flex;
      width: 26.8rem;
      flex-direction: column;
      // align-items: center;
      .text {
        display: flex;
        flex-direction: column;
        width: 21.5rem;
        span:last-of-type {
          text-align: center;
        }
        span {
          line-height: 2.5rem;
          font-size: 1.8rem;
          color: #fff;
        }
      }
      .pic {
        position: relative;
        left: 9.5rem;
        img {
          width: 15.6rem;
          height: 10rem;
        }
      }
    }
    .right_dialog {
      width: 35rem;
      height: 28.7rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      border-radius: 1.4rem;
      img {
        width: 9rem;
        height: 8rem;
        margin-top: 3rem;
      }
      h1 {
        line-height: 3rem;
        margin-top: 1.5rem;
        font-size: 2.2rem;
        font-weight: 700;
        color: #C9151E;
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 4.5rem;
        span {
          width: 12.5rem;
          height: 4.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1FB6ED;
          border-radius: .6rem;
          color: #fff;
          cursor: pointer;
        }
        span:first-of-type {
          margin-right: 2rem;
        }
      }
    }
  }
@media screen and (max-width: 992px) {
  .dialog {
    top: 50%;
    width: 50rem;
    .left_dialog {
      width: 20rem;
      .text {
        width: 17rem;
        span {
          line-height: 2rem;
          font-size: 1.4rem;
        }
      }
      .pic {
        img {
          width: 10rem;
          height: 6.6rem;
        }
      }
    }
    .right_dialog {
      width: 30rem;
      height: 23.6rem;
      img {
        width: 8rem;
        height: 7rem;
      }
      h1 {
        line-height: 2.8rem;
        margin-top: 1.3rem;
        font-size: 2rem;
      }
      .btn {
        margin-top: 3.5rem;
        span {
          width: 12rem;
          height: 3.8rem;
        }
      }
    }
  }
}
@media screen and (max-width: 636px) {
  .dialog {
    width: 35rem;
    display: flex;
    flex-direction: column;
    .right_dialog {
      position: relative;
      top: 1rem;
      right: -25%;
    }
  }
}
@media screen and (max-width: 452px) {
  .dialog {
    left: 50%;
    .right_dialog {
      right: -12%;
    }
  }
}
}
</style>
