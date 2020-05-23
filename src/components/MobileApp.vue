<template>
  <div>
    <div class="mobile">
    <div class="inquire" :style="{color:texColor}" @click="gotoMyProduct">我的產品</div>
    <div class="member-center" :style="{color:texColor}" @click="gotolink">會員服務</div>
    <div class="solid" @click="isMessageSolid" v-if="false">
      <i class="el-icon-message-solid"></i>
      <span> 消息通知</span>
    </div>
  </div>
  <!-- <notification v-if="isMessageSolid"></notification> -->
  </div>
</template>

<script>
// import Notification from './Notification'
export default {
  name: 'mobile-app',
  components: {

  },
  props: {
    texColor: { type: String, default: '' },
    gotoMyProduct: { type: Function, default: () => {} },
    gotolink: { type: Function, default: () => {} },
    isMessageSolid: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

.mobile {
  font-size: 1.8rem;
  font-weight: lighter;
  padding-left: 1.5rem;
  div {
    line-height: 4.5rem;
  }
  .member-center {
    margin-bottom: 1rem;
  }
  .solid {
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 3.8rem;
    background: #FECF03;
    border-radius: .2rem;
    font-size: 1.3rem;
  }
}
</style>
