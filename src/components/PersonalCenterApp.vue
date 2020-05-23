<template>
  <div class="personal" v-if="userName">
      <div class="pic">
        <img v-if="userName.CustPictureUrl" :src="userName.CustPictureUrl" alt="" @click="toClink">
        <img v-else src="./../assets/img/user_name.png" alt="" @click="toClink">
      </div>
    <div class="hint">
      <div class="txt-name">{{userName.CustName}}</div>
      <p>{{userName.CustName}}您好,歡迎回來!</p>
    </div>
  </div>
</template>

<script>
import storage from './../storage'
import { getCustomerByLineMid, getCustByEncodeProdcutId } from '../api/api'
export default {
  name: 'personal-center-app',
  data () {
    return {
      isShow: false,
      EncodeProductId: '',
      LINEMid: '',
      userName: {},
      fullWidth: document.documentElement.clientWidth
    }
  },
  mounted () {
    this.EncodeProductId = storage.getItem('EncodeProductId')
    this.LINEMid = storage.getItem('LINEMid')
    if (this.fullWidth <= 768) {
      if (!this.EncodeProductId) {
        this._getCustomerByLineMid()
      // console.log(this.LINEMid)
      } else {
      // console.log(this.EncodeProductId)
        this._getCustByEncodeProdcutId()
      }
    }
  },
  methods: {
    _getCustByEncodeProdcutId () {
      const EncodeProductId = storage.getItem('EncodeProductId')
      getCustByEncodeProdcutId({
        EncodeProductId
      }).then(res => {
        // console.log('p', res)
        if (res.status === 200) {
          this.userName = res.data.Data
          storage.setItem('userName', res.data.Data)
        }
      })
    },
    _getCustomerByLineMid () {
      // const LINEMid = this.$cookie.get('LINEMid')
      const LINEMid = storage.getItem('LINEMid')
      // console.log(LINEMid)

      getCustomerByLineMid({
        LINEMid
      }).then(res => {
        // console.log('m', res)
        if (res.status === 200) {
          this.userName = res.data.Data
          storage.setItem('userName', res.data.Data)
        }
      })
    },
    toClink () {
      this.$emit('goClick')
      // this.$router.replace({ name: 'PersonalCenterApp' })
    }
  }
}
</script>

<style scoped lang="scss">
.personal {
    height: 13rem;
    width: 22rem;
    position: relative;
    left: -2rem;
    top: -4rem;
    display: flex;
    align-items: center;
    .pic {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 1.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .hint {
      color: #fff;
      .txt-name {
        line-height: 2.5rem;
        font-size: 1.8rem;
        font-weight: 500;
      }
      p {
        line-height: 1.8rem;
        font-size: 1.3rem;
      }
    }
}
@media screen and (max-width: 600px) {
  .personal {
      left: 1rem;
      top: -8rem;
      .pic {
        width: 4.6rem;
        height: 4.6rem;
      }
    }

}
</style>
