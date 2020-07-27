<template>
  <div class="to-upload">
    <el-card>
      <div class="content">
        <el-row>
          <el-col :sm="24" :md="6" :lg="4">
            <div class="title">
              <h1>濾心{{toViewDetails.Sequence}}號</h1>
              <span>Filter No. {{toViewDetails.Sequence}}</span>
            </div>
            <img src="../assets/img/Single_pipe@2x.png" alt="">
          </el-col>
          <el-col :sm="18" :md="18" :lg="15">
            <div class="text">
              <h1>型號：{{toViewDetails.FilterName}}</h1>
              <span>{{toViewDetails.FilterDescription}}</span>
              <div class="inp" ref="refBtn">
                <el-input maxlength="14" v-model="fileCode" placeholder="請輸入濾心編號" ></el-input>
                <div class="btn">上傳濾瓶QRCODE照
                  <input type="file" @change="uploadPhoto($event)" name="file" id='uploadFile' ref="file"/>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :sm="24" :md="24" :lg="5">
            <!-- <div class="btn" ref="refBtn" @click="btnClick">上傳濾瓶QRCODE照</div> -->
            <div class="btn" @click="determine">確認</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div v-if="confirmStatus" class="confirmPopup">
      <el-dialog
      :visible.sync="confirmStatus"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal="false">
        <div class="content">
          <div class="imgs">
            <img src="../components/PopUp/img/update@2x (1).png" alt="" />
          </div>
          <slot name="body"></slot>
          <h1>您確定要更新此型號<em>{{ FilterModel }}</em>的濾心嗎？</h1>
          <div class="btn_1">
            <div @click="confirm">確認更換</div>
            <div @click="confirmStatus = false">取消動作</div>
          </div>
        </div>
      </el-dialog>
    </div>
    <upload-pop-up v-if="isShowUpload" :pLeft="pTot" :pBottom="pRight" :btn="Uploadbtn"></upload-pop-up>
    <guide-tow :isDialogShow="isShowGuideTow" modyType="4" :noShowClick="isGuideTwoClick"></guide-tow>
    <guide-tow :isDialogShow="isShowGuideError" modyType="5" :noShowClick="isGuideErrorClick"></guide-tow>
    <guide-tow :isDialogShow="isShowGuidePrompt" modyType="6" :noShowClick="isGuidePromptClick"></guide-tow>
    <guide-tow :isDialogShow="isShowGuideCode" modyType="7" :noShowClick="isGuideCode">
      <template v-slot:body>
        <h1>查無濾心編號！</h1>
      </template>
    </guide-tow>
     <guide-tow :isDialogShow="isShowGuideMun" modyType="7" :noShowClick="isGuideCode">
      <template v-slot:body>
        <h1>請輸入13-14位編碼！</h1>
      </template>
    </guide-tow>
    <guide-tow :isDialogShow="isShowGuideCodeNo" modyType="8" :noShowClick="isGuideCode">
       <template v-slot:body>
        <h1>{{text}}</h1>
      </template>
    </guide-tow>
    <loging :isDialogShow="isShowLoging"></loging>
    <Loading :show="isShowLoadging"></Loading>
  </div>
</template>

<script>
import UploadPopUp from '@/components/PopUp/UplosdPopUp'
import { getByProductId, getUpdateROFilter, getDecodeQRCode } from '../api/api'
import GuideTow from '@/components/PopUp/Guide_2'
import Loging from '@/components/PopUp/loging'
import { setTimeout } from 'timers'

export default {
  components: {
    UploadPopUp,
    GuideTow,
    Loging
  },
  data () {
    return {
      FilterModel: '',
      confirmStatus: false,
      isShowLoadging: true,
      fileCode: '',
      isShowUpload: false,
      pTot: 0,
      pRight: 0,
      fullWidth: document.documentElement.clientWidth,
      toViewDetails: {},
      localFile: {},
      isShowGuideTow: false,
      isShowLoging: false,
      isShowGuideError: false,
      isShowGuidePrompt: false,
      isShowGuideCode: false,
      isShowGuideMun: false,
      isShowGuideCodeNo: false,
      text: ''
    }
  },
  mounted () {
    this.CustProdId = this.$route.query && this.$route.query.CustProdId
    this.Sequence = this.$route.query && this.$route.query.Sequence
    // console.log(this.CustProdId, this.Sequence)

    this.getTopRight()
    window.addEventListener('resize', this.handleResize)
    this._getByProductId()
  },
  methods: {
    _getByProductId () {
      const { CustProdId } = this
      getByProductId({
        CustProdId
      }).then((res) => {
        this.toViewDetails = res.data.Data[0].Detail[this.Sequence - 1]
        if (!res.data.Data[0].IsOldWaterProduct) {
          this.isShowUpload = true
        }
        this.isShowLoadging = false
        // console.log('u', this.toViewDetails)
      })
    },
    getTopRight () {
      const { left, bottom } = this.$refs.refBtn.getBoundingClientRect()
      // console.log(left, bottom)
      if (this.fullWidth <= 600) {
        this.pTot = left
        this.pRight = -(bottom - 225)
      } else {
        this.pTot = left - 10
        this.pRight = -(bottom - 245)
      }
      // console.log(this.$refs.refBtn.scrollTop)

      // console.log(this.$refs.refBtn.getBoundingClientRect())
    },
    Uploadbtn () {
      // this.$router.push({ name: 'FilterToView' })
      this.isShowUpload = false
    },
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      // console.log(this.fullWidth)
    },
    btnClick () {
      this.$router.push({ name: 'uploadImg' })
    },
    uploadPhoto (e) {
      // const file = e.target.files[0]
      // const filesize = file.size
      // console.log(file, filesize, filename)
      // // 2,621,440   2M
      // if (filesize > 2101440) {
      //   // 图片大于2MB

      // }

      // const reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = function (e) {
      //   // 讀取到的圖片base64 數據編碼將此編碼字串傳給後臺即可
      //   // const formData = new FormData()

      //   const imgcode = e.target.result
      //   // formData.append('file', JSON.stringify(imgcode))
      //   console.log(imgcode)
      //   getDecodeQRCode({
      //     file: imgcode
      //   }).then(res => {
      //     console.log(res)
      //   })
      // }
      this.localFile = document.getElementById('uploadFile').files[0]
      // console.log(this.localFile)
      // const reader = new FileReader()
      // reader.readAsDataURL(this.localFile)
      // reader.onload = function (e) {
      //   const ImageCode = e.target.result
      //   const params = new FormData()
      //   params.append('file', ImageCode)
      //   console.log(ImageCode)
      //   console.log('b', params.get('file'))
      //   // axios.post('https://partner.sakura.com.tw/AspapApps/api/v1/common/DecodeQRCode', {
      //   //   data: params,
      //   //   headers: { 'Content-Type': 'multipart/form-data' }
      //   // }).then(res => {
      //   //   console.log(res)
      //   // })

      // }
      const params = new FormData()
      params.append('file', this.localFile)
      // console.log(params.get('file'))
      this.isShowLoging = true
      getDecodeQRCode(params).then(res => {
        // console.log(res.data.State)
        // console.log(res.data.Data)
        if (!res.data.State) {
          setTimeout(() => {
            this.isShowGuideError = true
            this.isShowLoging = false
          }, 1000)
        } else {
          setTimeout(() => {
            this.fileCode = res.data.Data
            this.isShowLoging = false
          }, 1000)
        }
      })
    },
    determine () {
      if (this.fileCode.length <= 0) {
        this.isShowGuidePrompt = true
        return
      }
      const Reg = /^1BE/
      if (!Reg.test(this.fileCode)) {
        this.isShowGuideCode = true
        return
      }
      if (this.fileCode.length > 12 && this.fileCode.length <= 14) {
        this.FilterModel = this.toViewDetails.FilterName
        this.confirmStatus = true
      } else {
        this.isShowGuideMun = true
      }
    },
    confirm () {
      this.isShowLoadging = true
      this.confirmStatus = false
      getUpdateROFilter({
        ProductId: this.CustProdId,
        Sequence: this.Sequence,
        Mfno: this.fileCode
      }).then(res => {
        if (res.status === 200 && res.data.State) {
          this.isShowLoadging = false
          this.isShowGuideTow = true
        } else {
          this.isShowLoadging = false
          this.text = res.data.Data
          this.isShowGuideCodeNo = true
        }
      })
    },
    isGuideTwoClick () {
      this.isShowGuideTow = false
      this.fileCode = ''
      this.$router.push({ path: `/toView/${this.CustProdId}`, query: { Sequence: this.Sequence } })
    },
    isGuideErrorClick () {
      this.isShowGuideError = false
    },
    isGuidePromptClick () {
      this.isShowGuidePrompt = false
    },
    // 編碼不合法
    isGuideCode () {
      this.isShowGuideCode = false
      this.isShowGuideMun = false
      this.isShowGuideCodeNo = false
    }

  }
}
</script>

<style lang="scss">

.confirmPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
  webkit-overflow: hidden;
  background-color:rgba(0, 0, 0, .6);
  /deep/ .el-dialog__wrapper{
  //  webkit-z-index: 9996!important;
  //  overflow: hidden;
  //  webkit-overflow: hidden;
  }
  /deep/ .el-dialog {
    // z-index: 9999!important;
    width: 40rem;
    border-radius: 1.4rem!important;
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 2.5rem;
      .imgs {
        display: flex;
        justify-content: center;
        width: 9rem;
        height: 8rem;
        img {
          height: 8rem;
        }
      }
      h1 {
        text-align: center;
        margin-top: 1.5rem;
        line-height: 3rem;
        font-size: 2.2rem;
        color: rgba(134, 134, 134, 1);
        font-weight: 500;
        em {
          color: #3d3d3d;
          font-weight: bold;
        }
      }
      .btn_1 {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 4rem;
          margin-top: 4rem;
          background: rgba(31, 182, 237, 1);
          border-radius: .6rem;
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
      }
    }
  }
}
.to-upload {
  .el-card {
    border-radius: 1rem;
    .title {
      h1 {
        line-height: 2.1rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #3D3D3D;
      }
      span {
        line-height: 1.4rem;
        font-size: 1rem;
        color: #BDBDBD;
      }
    }
    .content {
      .el-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
      }
      .el-col:first-of-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 4rem;
          height: 10rem;
          margin-top: 2.6rem;
        }
      }
      .el-col:nth-of-type(2) {
        .text {
          h1 {
            line-height: 2.5rem;
            font-size: 1.8rem;
            font-weight: 700;
            color: #1FB6ED;
          }
          span {
            line-height: 1.7rem;
            font-size: 1.2rem;
            color: #868686;
          }
          .inp {
            width:32rem;
            height:4rem;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            background:rgba(255,255,255,1);
            border-radius:.5rem;
            border:.1rem solid rgba(215,216,223,1);
            border-right: none;
            box-sizing: border-box;
            /deep/ .el-input {
              width: 16rem;
              font-size: 1.6rem;
              /deep/ .el-input__inner {
                border: none;
                height: 3.8rem;
              }
            }
            .btn {
              position: relative;
              width: 16rem;
              height: 4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(230,248,255,1);
              font-size:1.4rem;
              font-weight:500;
              color:rgba(31,182,237,1);
              line-height:2rem;
              border-radius:0 .5rem .5rem 0;
              input {
                position: absolute;
                top: 0;
                left: 0;
                width: 16rem;
                height: 4rem;
                z-index: 2;
                opacity: 0;
                filter: alpha(opacity=0);
              }
            }
          }

        }
      }
      .el-col:last-of-type {
        display: flex;
        align-items: center;
        .btn {
          width:10rem;
          height:4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
          border-radius: .6rem;
          background: #1FB6ED;
          font-size: 1.7rem;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
@media screen and (min-width: 993px) and (max-width: 1199px) {
  .el-col:last-of-type {
    margin-top: 3.6rem;
    margin-left: 3rem;
  }
}
@media screen and (max-width: 992px) {
  .el-col:nth-of-type(2) {
      padding-right: 1rem;
     /deep/ .el-input__inner {
      width: 100%!important;
    }
  }
  .el-col:last-of-type {
    margin-top: 3.6rem;
    justify-content: flex-end;
    padding-right: 1rem;
  }
}
@media screen and (max-width: 768px) {
.confirmPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
  webkit-overflow: hidden;
  background-color:rgba(0, 0, 0, .6);
  /deep/ .el-dialog__wrapper{
  //  webkit-z-index: 9996!important;
  //  overflow: hidden;
  //  webkit-overflow: hidden;
  }
  /deep/ .el-dialog {
    // z-index: 9999!important;
    width: 90%;
    margin: 0 auto;
    border-radius: 1.4rem!important;
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 2.5rem;
      .imgs {
        display: flex;
        justify-content: center;
        width: 9rem;
        height: 8rem;
        img {
          height: 8rem;
        }
      }
      h1 {
        text-align: center;
        margin-top: 1.5rem;
        line-height: 3rem;
        font-size: 1.8rem;
        color: rgba(134, 134, 134, 1);
        font-weight: 500;
        em {
          color: #3d3d3d;
          font-weight: bold;
        }
      }
      .btn_1 {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 2rem;
          margin-top: 3rem;
          background: rgba(31, 182, 237, 1);
          border-radius: .6rem;
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
      }
    }
  }
}
  .el-col:nth-of-type(2) {
   padding-left: 1rem;
    margin-top: 3rem
 }
 .el-col:last-of-type {
   align-items: flex-end!important;
  .btn {
    width: 15rem!important;
    height: 3.6rem!important;
    font-size: 1.4rem!important;
  }
 }
}
@media screen and (max-width: 420px) {
  .el-col:nth-of-type(2) {
   .text {
     .inp {
      margin-top: 1rem !important;
       height: 8rem!important;
       width: 16.2rem!important;
       flex-direction: column !important;
       box-sizing: border-box!important;
      border-right: .1rem solid rgba(215,216,223,1)!important;
     }
     .btn {
       border-radius:0 0 .5rem .5rem!important;
     }
   }
 }

}
}
</style>
