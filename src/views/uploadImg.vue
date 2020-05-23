<template>
  <div class="contents">
    <div class="title">
      <h1>上傳QRCODE照片</h1>
      <span>UPLOAD QRCCDE PHOTOS</span>
    </div>
    <el-card>
        <div class="left-box">
          <div class="qi-code">
            <img src="../assets/img/Qr-code.png" alt="">
          </div>
          <div class="icon"><img src="../assets/img/icon_w@2x.png" alt="">
          <span>如果遇到圖片無法刪除的情況，請嘗試清除瀏覽器緩存或換個瀏覽器操作。</span></div>
        </div>

        <div class="btn" @click="confirmClick" ref="refBtn">
          確定裁剪上傳
        </div>
    </el-card>
    <tailoring-pop-up v-if="isShowTailoring" :pLeft="pLeft" :pBottom="pBottom" :btn="Tailoringbtn"></tailoring-pop-up>
    <loging :isDialogShow="isShowLogin"></loging>
  </div>
</template>

<script>
import TailoringPopUp from '@/components/PopUp/TailoringPopUp'
import Loging from '@/components/PopUp/loging'
export default {
  components: {
    TailoringPopUp,
    Loging
  },
  data () {
    return {
      isShowTailoring: true,
      isShowLogin: false,
      pLeft: 0,
      pBottom: 0,
      imageUrl: '',
      isShow: false,
      isShowImg: true
    }
  },
  mounted () {
    this.getTopRight()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if (this.imageUrl) {
        this.isShow = true
      }
      this.option.img = this.imageUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上傳頭像圖片只能是JPG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上傳頭像圖片大小不能超過2MB!')
      }
      return isJPG && isLt2M
    },
    noImg () {
      this.imageUrl = ''
      this.isShow = false
    },
    getTopRight () {
      const { left, bottom } = this.$refs.refBtn.getBoundingClientRect()
      // if (this.fullWidth <= 600) {
      //   this.pTot = left - 302 - 38
      //   this.pRight = -(bottom - 26)
      // } else {
      //   this.pTot = left - 276
      //   this.pRight = -(bottom)
      // }
      this.pLeft = left - ((570 + 159) / 2)
      this.pBottom = -(bottom - 26)
      // console.log(left, bottom)

      // console.log(this.$refs.refBtn.getBoundingClientRect())
    },
    Tailoringbtn () {
      this.isShowTailoring = false
    },
    confirmClick () {
      this.isShowLogin = true
      setTimeout(() => {
        this.isShowLogin = false
        this.$router.push({ name: 'FilterToView' })
      }, 2000)
    }
  }
}

</script>

<style scoped lang="scss">
.contents {
  .title {
    margin-bottom: 4rem;
    text-align: center;
    color: #fff;
    h1 {
      line-height: 4.4rem;
      font-size: 3.1rem;
      font-weight: lighter;
    }
    span {
      line-height: 1.7rem;
      font-size: 1.2rem;
    }
  }
  .el-card {
    // display: flex;
    // // position: relative;
    // // height: 60rem;
    /deep/ .avatar-uploader .el-upload {
      position: relative;
      // border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      background: #F5F5F5;
      .icon-close {
        position: absolute;
        top: -.6rem;
        right:-.6rem;
        font-size: 1.6rem;
        color: #333;
        z-index: 999;
      }
    }
    /deep/ .avatar-uploader .el-upload:hover {
      // border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
      font-size: 60px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    /deep/ .avatar {
      width: 178px;
      height: 178px;
      border-radius: 6px;
      display: block;
    }
}

// 截图
.cropper-content {
  position: absolute;
  height: 30rem;
  .cropper {
    width: auto;
    height: 300px;
  }
}
.el-card {
  border-radius: 1rem;
  /deep/ .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .left-box {
    .qi-code {
      width: 28.2rem;
      height: 21rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F3F3F3;
      border-radius: 1.2rem;
      margin-bottom: 1rem;
      img {
        width: 15.3rem;
        height: 15.3rem;
      }

    }
    .icon {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      img {
        width: 1rem;
        height: .9rem;
        margin-right: .5rem;
      }
      span {
        line-height: 1.4rem;
        font-size: 1rem;
        color: #868686;
      }
    }
  }
  .btn {
    width: 16.8rem;
    height: 4.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .6rem;
    background: #1FB6ED;
    font-size: 1.6rem;
    color: #fff;
  }
}
@media screen and (max-width: 1199px) {
  .el-card {
    /deep/ .el-card__body {
      display: flex;
      flex-wrap: wrap;
      .btn {
        margin-top: 2rem;
      }
    }
  }

}
}
</style>
