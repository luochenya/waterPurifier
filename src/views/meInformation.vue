<template>
  <div class="me-information">
   <personal-center :imgClick="imgClick" :blue="'#1FB6ED'"></personal-center>
   <Loading :show="isShowLoading" />
  </div>
</template>

<script>
import PersonalCenter from '@/components/PersonalCenter'
import { setTimeout } from 'timers'
export default {
  name: 'me-information',
  components: {
    PersonalCenter
  },
  data () {
    return {
      isShowLoading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.isShowLoading = false
    }, 1000)
  },
  methods: {
    imgClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.me-information {
  padding: 1rem 1.5rem;
}
</style>
