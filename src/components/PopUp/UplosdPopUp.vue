<template>
  <div class="guide" @touchmove.prevent>
    <div class="dialog" :style="{left: `${pLeft}px`, bottom: `${pBottom}px`}">
       <div class="right_btn">
        <div class="box">
          <div class="prompt">請輸入濾心編號</div>
          <div class="btn">上傳濾瓶QRCODE照</div>
        </div>
      </div>
      <div class="left_cont">
        <div class="text">
          <p>手動輸入濾心編號，或透通照片上傳辨識</p>
          <span  @click="btn">確認</span>
        </div>
        <img src="../../assets/img/the_arrow@2x .png" alt="" >
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'uplosd-pop-up',
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
      if (this.fullWidth <= 600) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      // console.log(this.fullWidth)
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
    width: 70rem;
    height: 26rem;
    color: #fff;
    // background: pink;
    .right_btn {
      width: 34rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: .6rem;
      box-sizing: border-box;
      .box {
        width: 32rem;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        border-radius: .5rem;
        .prompt,.btn {
          width: 16rem;
          height: 4rem;
          line-height: 4rem;
          font-size: 1.4rem;
        }
        .prompt {
          color: #BDBDBD;
          border: .1rem solid rgba(215,216,223,1);
           border-radius:5px 0 0px 5px;
           border-right: none;
           padding-left: 1rem;
        }
        .btn {
          display: flex;
          justify-content: center;
          color: #1FB6ED;
          background:rgba(230,248,255,1);
          border-radius:0px 5px 5px 0px;
        }
      }
    }
    .left_cont {
      // display: flex;
      // flex-direction: column;
      // // align-items: center;
      // justify-content: center;
      margin-left: 2rem;
      margin-bottom: 2rem;
      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size:1.8rem;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:3rem;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          width:12.5rem;
          height:4.6rem;
          font-size: 1.4rem;
          font-weight:500;
          background:rgba(31,182,237,1);
          box-shadow:0px 12px 30px 0px rgba(1,181,240,0.15);
          border-radius:6px;
        }
      }
      img {
        width: 15.6rem;
        height: 10rem;
        margin-top: 2rem;

      }
    }
  }
@media screen and (min-width: 1100px) and (max-width: 1400px){
 .left_cont {
   position: relative;
   left: -19rem;
   top: -6rem;
 }
}
@media screen and(max-width: 1099px){
  .left_cont {
    position: relative;
    left: -30rem;
    top: -6rem;
 }
}
@media screen and (max-width: 420px) {
  .dialog {
    .left_cont {
      position: relative;
      left: -20rem;
      top: -10rem;
       img {
       margin-left: 3rem;
      }
    }
    .right_btn {
      width: 18rem;
      height: 10rem;
      .box {
        width: 16rem;
        height: 8rem;
        flex-direction: column;
        .prompt {
          border: .1rem solid rgba(215,216,223,1);
          border-radius:5px .5rem 0px 0px;
         border-bottom: 0;
        }
        .btn {
          border-radius:0px 0px 5px 5px;
        }
      }
    }
  }
}

}
</style>
