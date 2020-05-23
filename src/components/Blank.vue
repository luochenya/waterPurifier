<template>
<div>
 <div class="blank" v-if="blankOne">
    <img src="../assets/img/blank@2x.png" alt="">
    <h2>查找產品為空</h2>
    <span>若無對應產品
      ，請先掃描該機體上之QRco</span>
    <span>在進行產品保固登入後，即可開始使用淨水管家服務</span>
  </div>
  <div class="blank_2" v-if="blankTow">
    <img src="../assets/img/blank@2x.png" alt="">
    <h2>查無此關鍵字</h2>
    <!-- <div class="btn">
      返回列表
    </div> -->
  </div>
   <div class="blank_3" v-if="blankThree">
    <img src="../assets/img/blank@2x.png" alt="">
    <h2>功能暫未開放，敬請期待！</h2>
    <div class="btn" @click="toClick" v-show="false">
      我知道了
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'blank',
  props: {
    blankOne: { type: Boolean, default: false },
    blankTow: { type: Boolean, default: false },
    blankThree: { type: Boolean, default: false },
    toClick: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.blank {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
  img {
    width: 23.4rem;
    height: 13.9rem;
    margin-bottom: 2.5rem;
  }
  h2 {
    line-height: 2.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: rgba(61, 61, 61, 1);
    margin-bottom: 1rem;
  }
  span {
    line-height: 2.2rem;
    font-size: 1.4rem;
    color: rgba(134, 134, 134, 1);
  }
}
.blank_2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.6rem;
  img {
     width: 16.9rem;
     height: 10rem;
  }
  h2 {
    line-height: 2.6rem;
    margin-top: 1.4rem;
    font-size: 2rem;
    color: #868686;
  }
  .btn {
    width: 12.8rem;
    height: 4.6rem;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 700;
    border-radius: .6rem;
    border: .2rem solid #1FB6ED;
    color: #1FB6ED;
    cursor: pointer;
  }
}
.blank_3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
   img {
    width: 23.4rem;
    height: 13.9rem;
    margin-bottom: 2.5rem;
  }
  h2 {
    line-height: 2.6rem;
    margin-top: 1.4rem;
    font-size: 2rem;
    font-weight: 700;
    color: #3D3D3D;
  }
  .btn {
    width: 18.8rem;
    height: 4.6rem;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 700;
    border-radius: .6rem;
   background: #1FB6ED;
    color: #fff;
  }
}
</style>
