<template>
  <div class="guide" @touchmove.prevent>
    <div class="dialog" :style="{left: `${pLeft}px`|| '50%', bottom: `${pBottom}px` || '50%'}">
      <div class="left_btn">
        <span>配對</span>
      </div>
      <div class="right_btn">
        <img src="../../assets/img/the_arrow@2x .png" alt="">
        <div class="item">
          <span>點擊欲配對的濾心</span>
          <div class="btn" @click="btn">確認</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'matching-pop-up',
  props: {
    btn: { type: Function, default: () => {} },
    pLeft: { type: Number },
    pBottom: { type: Number }
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
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 49rem;
    height: 18rem;
    top: 30%;
    left: 50%;
    // background: pink;
    .left_btn {
      display: flex;
      // align-items: flex-end;
      align-items: center;
      justify-content: center;
      height: 5rem;
      width: 18rem;
      background: #fff;
      border-radius: 1rem;
      span {
        width: 16.8rem;
        height: 3.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .6rem;
        background: #1FB6ED;
        font-size: 1.6rem;
        color: #fff;
      }
    }
    .right_btn {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      img {
        margin-top: 6rem;
        width: 15.6rem;
        height: 10rem;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          line-height: 2.5rem;
          font-size: 1.8rem;
          color: #fff;
        }
        .btn {
          width: 12rem;
          height: 3.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1.5rem;
          background: #1FB6ED;
          border-radius: .6rem;
          font-size: 1.4rem;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
@media screen and (max-width: 500px) {
  /* .dialog {
     width: 32rem;
    .text {
      span {
        font-size: 1.4rem;
      }
    }
    .bottom {
      top: 1rem;
      img {
        width: 10rem;
        height: 6.6rem;
      }
    }
  } */
}
}
</style>
