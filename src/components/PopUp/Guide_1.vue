<template>
  <div class="guide" @touchmove.prevent>
    <div class="dialog" :style="{left: `${pLeft}px`, bottom: `${pBottom}px`}">
       <div class="top">
        <div class="text">
          <span>選擇欲更換的濾心、數量、並選擇日期</span>
          <span>與時間後，點擊提交</span>
          <div class="btn" @click="btn">
            <span>確認</span>
          </div>
        </div>
       </div>
       <div class="bottom">
         <div class="left">
           <span></span>
         </div>
         <img src="../../assets/img/the_arrow@2x .png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide-one',
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
    width: 43rem;
    height: 21rem;
    //top: 30%;
    //left: 50%;
    // background: pink;
    .top {
      display: flex;
      justify-content: flex-end;
      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          line-height: 2.5rem;
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 1);
        }
        .btn {
          display: flex;
          margin-top: 1rem;
          padding: .8rem 3.5rem;
          border-radius: .6rem;
          background-color: rgba(31, 182, 237, 1);
          cursor: pointer;
          span {
            font-size: 1.4rem;
          }
        }
      }
    }
    .bottom {
      display: flex;
      align-items: flex-end;
      position: relative;
      top: -1rem;
      left: 0;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        span {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          border: 1px solid rgba(216, 216, 216, 1);
        }
      }
      img {
        width: 15.6rem;
        height: 10rem;
        margin: 0 0 1rem .8rem;
      }
    }
  }
@media screen and (max-width: 767px) {
  .dialog {
     width: 32rem;
     .top {
       position: relative;
       left: -3rem;
     }
    .text {
      span {
        font-size: 1.4rem;
      }
    }
    .bottom {
      top: 1.5rem;
      img {
        width: 10rem;
        height: 6.6rem;
      }
    }
  }
}
}
</style>
