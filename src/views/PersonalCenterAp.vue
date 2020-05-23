<template>
  <div class="personalcenter-content">
    <personal-center :imgClick="imgClicks" :blue="'#1FB6ED'"></personal-center>
  </div>
</template>

<script>
import PersonalCenter from '@/components/PersonalCenter'
export default {
  components: {
    PersonalCenter
  },
  data () {
    return {
    }
  },
  methods: {
    imgClicks () {
      this.$emit('imgClicks')
    }
  }
}
</script>

<style scoped lang="scss">
.personalcenter-content {
  background: #F1F3F8;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  z-index: 9999;

}
</style>
