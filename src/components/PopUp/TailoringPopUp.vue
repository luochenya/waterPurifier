<template>
  <div class="guide" @touchmove.prevent>
    <div class="dialog" :style="{left: `${pLeft}px`, bottom: `${pBottom}px`}">

      <div class="left_btn" v-if="isShow">
        <img src="./img/Thearrow_top@2x.png" alt="">
        <div class="item">
          <span>使用相機拍攝濾瓶QRCODE照片後，儲存於相簿中</span>
          <span>將其上傳至此調整後，點擊裁切上傳</span>
          <div class="btn" @click="btn">確認</div>
        </div>
      </div>
      <div class="left_btn" v-else>
         <div class="item">
          <span>使用相機拍攝濾瓶QRCODE照片後，儲存於相簿中</span>
          <span>將其上傳至此調整後，點擊裁切上傳</span>
          <div class="btn" @click="btn">確認</div>
        </div>
        <img src="../../assets/img/the_arrow@2x .png" alt="">
      </div>
        <div class="right_btn">
        <span>確定裁剪上傳</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tailoring-pop-up',
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
    this.getTopRight()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    getTopRight () {
      if (this.fullWidth <= 900) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
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
    width: 58rem;
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
      position: relative;
      right: 3.6rem;
      width: 18rem;
      height: 5.8rem;

      margin-top: -2rem;
      background: #fff;
      border-radius: .6rem;
      font-size: 1.6rem;
      color: #fff;
      border: .6rem solid #fff;
      span {
        width: 16.8rem;
        height: 4.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .6rem;
        background: #1FB6ED;
      }
    }
}
  @media screen and (max-width: 900px) {
    .dialog {
      .left_btn {
        position: relative;
        top: -23rem;
        right: -36rem;
        img {
          width: 10rem;
          height: 6.6rem;
          position: absolute;
          bottom: 0;
          right: 14rem;
        }
        .item {
          span {
            font-size: 1.4rem;
          }
          .btn {
            width: 10rem;
            height: 3.8rem;
        }
      }
    }
    }
  }
 }
</style>
