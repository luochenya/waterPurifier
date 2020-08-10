<template>
  <div class="to-upload">
    <el-card>
      <div class="content">
        <div class="toUpload_content_button">確認</div>
        <el-row>
          <el-col :sm="24" :md="6" :lg="4">
            <div class="title">
              <h1>濾心{{ toViewDetails.Sequence }}號</h1>
              <span>Filter No. {{ toViewDetails.Sequence }}</span>
            </div>
            <img src="../assets/img/Single_pipe@2x.png" alt="" />
          </el-col>
          <el-col :sm="18" :md="18" :lg="13">
            <div class="text">
              <h1>型號：{{ toViewDetails.FilterName }}</h1>
              <span>{{ toViewDetails.FilterDescription }}</span>
              <div class="inp" ref="refBtn">
                <el-input
                  maxlength="14"
                  v-model="fileCode"
                  placeholder="請輸入濾心編號"
                ></el-input>
                <div class="btn">
                  上傳濾瓶QRCODE照
                  <input
                    type="file"
                    @change="uploadPhoto($event)"
                    name="file"
                    id="uploadFile"
                    ref="file"
                  />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :sm="24" :md="24" :lg="7" class="sussecImg">
            <img src="@/assets/imgs/sussec.png" alt="" />
            我已閱讀完
            <em>濾心更換權益說明</em>
          </el-col>
        </el-row>
        <div class="WhatFilterElement">
          <img src="@/assets/imgs/questionMark.png" alt="" />
          濾心編號是什麼？
        </div>
        <div class="toUpload_content_button_sussecImgs">
          <div class="sussecImgs">
            <img src="@/assets/imgs/sussec.png" alt="" />
            我已閱讀完
            <em>濾心更換權益說明</em>
          </div>
          <div class="toUpload_content_buttons">確認</div>
        </div>
      </div>
    </el-card>
    <div v-if="confirmStatus" class="confirmPopup">
      <el-dialog
        :visible.sync="confirmStatus"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :modal="false"
      >
        <div class="content">
          <div class="imgs">
            <img src="../components/PopUp/img/update@2x (1).png" alt="" />
          </div>
          <slot name="body"></slot>
          <h1>
            您確定要更新此型號<em>{{ FilterModel }}</em
            >的濾心嗎？
          </h1>
          <div class="btn_1">
            <div @click="confirm">確認更換</div>
            <div @click="confirmStatus = false">取消動作</div>
          </div>
        </div>
      </el-dialog>
    </div>
    <upload-pop-up
      v-if="isShowUpload"
      :pLeft="pTot"
      :pBottom="pRight"
      :btn="Uploadbtn"
    ></upload-pop-up>
    <guide-tow
      :isDialogShow="isShowGuideTow"
      modyType="4"
      :noShowClick="isGuideTwoClick"
    ></guide-tow>
    <guide-tow
      :isDialogShow="isShowGuideError"
      modyType="5"
      :noShowClick="isGuideErrorClick"
    ></guide-tow>
    <guide-tow
      :isDialogShow="isShowGuidePrompt"
      modyType="6"
      :noShowClick="isGuidePromptClick"
    ></guide-tow>
    <guide-tow
      :isDialogShow="isShowGuideCode"
      modyType="7"
      :noShowClick="isGuideCode"
    >
      <template v-slot:body>
        <h1>查無濾心編號！</h1>
      </template>
    </guide-tow>
    <guide-tow
      :isDialogShow="isShowGuideMun"
      modyType="7"
      :noShowClick="isGuideCode"
    >
      <template v-slot:body>
        <h1>請輸入13-14位編碼！</h1>
      </template>
    </guide-tow>
    <guide-tow
      :isDialogShow="isShowGuideCodeNo"
      modyType="8"
      :noShowClick="isGuideCode"
    >
      <template v-slot:body>
        <h1>{{ text }}</h1>
      </template>
    </guide-tow>
    <loging :isDialogShow="isShowLoging"></loging>
    <Loading :show="isShowLoadging"></Loading>
    <!-- 轮播弹窗 -->
    <div class="updateSwiperStyle" v-show="swiperStatus">
      <div class="updateSwiperStyle_box">
        <div class="updateSwiperStyle_close" @click="swiperStatusClose()">
          <img src="@/assets/imgs/swiperClose.png" alt="" />
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <h1>{{ item.title }}</h1>
            <div class="updateSwiperStyle_box_img">
              <img :src="item.img" alt="" />
            </div>
            <h2>{{ item.content }}</h2>
            <h3 v-html="item.remarks"></h3>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- 轮播弹窗 -->
    <div class="IndicatorPopupStyle" v-show="IndicatorPopupStatus">
      <div id="IndicatorPopupStyle_box">
        <div class="input">請輸入濾心編號</div>
        <div class="btn">
          上傳濾瓶QRCODE照
        </div>
        <div id="IndicatorPopupStyle_box_img">
          <img src="@/assets/imgs/arrowRight.png" alt="" />
          <div class="IndicatorPopupStyle_box_img_box">
            <h2>手動輸入濾心編號，或透通照片上傳辨識</h2>
            <div
              class="IndicatorPopupStyle_box_img_box_button"
              @click="IndicatorPopupStatus = false"
            >
              確認
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPopUp from "@/components/PopUp/UplosdPopUp";
import { getByProductId, getUpdateROFilter, getDecodeQRCode } from "../api/api";
import GuideTow from "@/components/PopUp/Guide_2";
import Loging from "@/components/PopUp/loging";
import { setTimeout } from "timers";

export default {
  components: {
    UploadPopUp,
    GuideTow,
    Loging
  },
  data() {
    return {
      IndicatorPopupStatus: false,
      swiperStatus: false,
      swiperList: [
        {
          title: "1.確認進水處已關閉",
          content: "更換濾心前，必須關閉進水三通球閥。",
          img: require("@/assets/imgs/swiperOne.png")
        },
        {
          title: "2.取出新購買的濾心",
          content: "找到濾心上的Qrcode，掃描輸入至濾心編號欄位(亦可手動輸入)。",
          img: require("@/assets/imgs/swiperTwo.png"),
          remarks:
            "*濾心上是否有製造編號，並且再次確認型號與淨水器濾心道數是否一致!<br />*若查無濾心編號，請致電客服協助更新濾心週期。"
        },
        {
          title: "3.拆換舊濾心",
          content: "將舊濾心拆下後，置換新的濾心即更換完成。",
          img: require("@/assets/imgs/swiperTherr.png")
        }
      ],
      swiperOption: {
        pagination: ".swiper-pagination", //这里修改
        pagination: {
          el: ".swiper-pagination"
        },
        grabCursor: true,
        paginationClickable: true
      },
      FilterModel: "",
      confirmStatus: false,
      isShowLoadging: true,
      fileCode: "",
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
      text: ""
    };
  },
  mounted() {
    // 样式赋值
    var box = document.getElementById("IndicatorPopupStyle_box");
    box.style.left = this.$refs.refBtn.getBoundingClientRect().left - 5 + "px";
    box.style.top = this.$refs.refBtn.getBoundingClientRect().top - 5 + "px";
    box.style.width =
      this.$refs.refBtn.getBoundingClientRect().width + 10 + "px";
    box.style.height =
      this.$refs.refBtn.getBoundingClientRect().height + 10 + "px";

    var arrowRight = document.getElementById("IndicatorPopupStyle_box_img");
    arrowRight.style.left =
      this.$refs.refBtn.getBoundingClientRect().width + 15 + "px";

    // 样式赋值

    this.CustProdId = this.$route.query && this.$route.query.CustProdId;
    this.Sequence = this.$route.query && this.$route.query.Sequence;
    // console.log(this.CustProdId, this.Sequence)

    this.getTopRight();
    window.addEventListener("resize", this.handleResize);
    this._getByProductId();
  },
  methods: {
    // 关闭轮播弹窗并打开箭头弹窗
    swiperStatusClose() {
      this.swiperStatus = false;
      this.IndicatorPopupStatus = true;
    },
    _getByProductId() {
      const { CustProdId } = this;
      getByProductId({
        CustProdId
      }).then(res => {
        this.toViewDetails = res.data.Data[0].Detail[this.Sequence - 1];
        if (!res.data.Data[0].IsOldWaterProduct) {
          this.isShowUpload = true;
        }
        this.isShowLoadging = false;
        // 打开轮播弹窗
        this.swiperStatus = true;
      });
    },
    getTopRight() {
      const { left, bottom } = this.$refs.refBtn.getBoundingClientRect();
      // console.log(left, bottom)
      if (this.fullWidth <= 600) {
        this.pTot = left;
        this.pRight = -(bottom - 225);
      } else {
        this.pTot = left - 10;
        this.pRight = -(bottom - 245);
      }
      // console.log(this.$refs.refBtn.scrollTop)

      // console.log(this.$refs.refBtn.getBoundingClientRect())
    },
    Uploadbtn() {
      // this.$router.push({ name: 'FilterToView' })
      this.isShowUpload = false;
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
      // console.log(this.fullWidth)
    },
    btnClick() {
      this.$router.push({ name: "uploadImg" });
    },
    uploadPhoto(e) {
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
      this.localFile = document.getElementById("uploadFile").files[0];
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
      const params = new FormData();
      params.append("file", this.localFile);
      // console.log(params.get('file'))
      this.isShowLoging = true;
      getDecodeQRCode(params).then(res => {
        // console.log(res.data.State)
        // console.log(res.data.Data)
        if (!res.data.State) {
          setTimeout(() => {
            this.isShowGuideError = true;
            this.isShowLoging = false;
          }, 1000);
        } else {
          setTimeout(() => {
            this.fileCode = res.data.Data;
            this.isShowLoging = false;
          }, 1000);
        }
      });
    },
    determine() {
      if (this.fileCode.length <= 0) {
        this.isShowGuidePrompt = true;
        return;
      }
      const Reg = /^1BE/;
      if (!Reg.test(this.fileCode)) {
        this.isShowGuideCode = true;
        return;
      }
      if (this.fileCode.length > 12 && this.fileCode.length <= 14) {
        this.FilterModel = this.toViewDetails.FilterName;
        this.confirmStatus = true;
      } else {
        this.isShowGuideMun = true;
      }
    },
    confirm() {
      this.isShowLoadging = true;
      this.confirmStatus = false;
      getUpdateROFilter({
        ProductId: this.CustProdId,
        Sequence: this.Sequence,
        Mfno: this.fileCode
      }).then(res => {
        if (res.status === 200 && res.data.State) {
          this.isShowLoadging = false;
          this.isShowGuideTow = true;
        } else {
          this.isShowLoadging = false;
          this.text = res.data.Data;
          this.isShowGuideCodeNo = true;
        }
      });
    },
    isGuideTwoClick() {
      this.isShowGuideTow = false;
      this.fileCode = "";
      this.$router.push({
        path: `/toView/${this.CustProdId}`,
        query: { Sequence: this.Sequence }
      });
    },
    isGuideErrorClick() {
      this.isShowGuideError = false;
    },
    isGuidePromptClick() {
      this.isShowGuidePrompt = false;
    },
    // 編碼不合法
    isGuideCode() {
      this.isShowGuideCode = false;
      this.isShowGuideMun = false;
      this.isShowGuideCodeNo = false;
    }
  }
};
</script>

<style lang="scss">
// 指示弹窗
.IndicatorPopupStyle {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  #IndicatorPopupStyle_box {
    position: absolute;
    background: #fff;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .input {
      border: 0.1rem solid #d7d8df;
      border-radius: 0.5rem 0 0 0.5rem;
      border-right: none;
      color: rgba(189, 189, 189, 1);
      width: 16rem;
      font-size: 1.6rem;
      padding: 0 15px;
      height: 3.8rem;
      line-height: 3.8rem;
    }
    .btn {
      position: relative;
      width: 16rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(230, 248, 255, 1);
      font-size: 1.4rem;
      font-weight: 500;
      color: rgba(31, 182, 237, 1);
      line-height: 2rem;
      border-radius: 0 0.5rem 0.5rem 0;
    }
    #IndicatorPopupStyle_box_img {
      position: absolute;
      bottom: -1.5rem;
      img {
        width: 15.6rem;
        height: 17.3rem;
      }
      .IndicatorPopupStyle_box_img_box {
        position: absolute;
        left: 0;
        top: -6rem;
        width: 33rem;
        text-align: center;
        h2 {
          font-size: 1.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 3rem;
        }
        .IndicatorPopupStyle_box_img_box_button {
          cursor: pointer;
          margin: 2rem auto 0;
          width: 12rem;
          height: 4.6rem;
          background: rgba(31, 182, 237, 1);
          box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
          border-radius: 0.6rem;
          font-size: 1.7rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 4.6rem;
        }
      }
    }
  }
}
// 轮播弹窗
.updateSwiperStyle {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .updateSwiperStyle_box {
    text-align: center;
    padding: 5rem 3.6rem;
    width: 47rem;
    height: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1.4rem 6rem 0px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .updateSwiperStyle_close {
      cursor: pointer;
      position: absolute;
      top: 2.4rem;
      right: 2.4rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0;
      }
    }
    h1 {
      font-size: 2.2rem;
      font-weight: bold;
      color: rgba(61, 61, 61, 1);
      line-height: 3rem;
    }
    .updateSwiperStyle_box_img {
      margin: 2rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 26.2rem;
    }
    h2 {
      text-align: left;
      text-indent: 2em;
      font-size: 1.1rem;
      color: rgba(134, 134, 134, 1);
      line-height: 2.2rem;
    }
    h3 {
      text-align: left;
      font-size: 1.1rem;
      color: rgba(134, 134, 134, 1);
      line-height: 2.2rem;
    }
    .swiper-wrapper {
      padding-bottom: 3rem;
    }
    .swiper-pagination-bullets {
      bottom: 0;
      .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
        background: rgba(189, 189, 189, 0.3);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        width: 1rem;
        height: 1rem;
        background: rgba(189, 189, 189, 1);
      }
    }
  }
}
.confirmPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
  webkit-overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
  /deep/ .el-dialog__wrapper {
    //  webkit-z-index: 9996!important;
    //  overflow: hidden;
    //  webkit-overflow: hidden;
  }
  /deep/ .el-dialog {
    // z-index: 9999!important;
    width: 40rem;
    border-radius: 1.4rem !important;
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
          border-radius: 0.6rem;
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
        color: #3d3d3d;
      }
      span {
        line-height: 1.4rem;
        font-size: 1rem;
        color: #bdbdbd;
      }
    }
    .content {
      .toUpload_content_button {
        position: absolute;
        right: 4.9rem;
        top: 1.8rem;
        width: 12rem;
        height: 4.6rem;
        background: rgba(31, 182, 237, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
        border-radius: 0.6rem;
        font-size: 1.7rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 4.6rem;
        text-align: center;
      }
      .sussecImg {
        font-size: 1.2rem;
        color: rgba(134, 134, 134, 1);
        line-height: 1.4rem;
        img {
          width: 1.4rem;
          height: 1.4rem;
          margin-right: 0.3rem;
        }
        em {
          color: #1fb6ed;
          text-decoration: underline;
        }
      }
      .toUpload_content_button_sussecImgs {
        display: none;
        .toUpload_content_buttons {
          width: 12rem;
          height: 4.6rem;
          background: rgba(31, 182, 237, 1);
          box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
          border-radius: 0.6rem;
          font-size: 1.7rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 4.6rem;
          text-align: center;
        }
        .sussecImgs {
          font-size: 1.2rem;
          color: rgba(134, 134, 134, 1);
          line-height: 1.4rem;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin-right: 0.3rem;
          }
          em {
            color: #1fb6ed;
            text-decoration: underline;
          }
        }
      }
      .WhatFilterElement {
        margin-top: 2.5rem;
        padding-left: 2rem;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: rgba(31, 182, 237, 1);
        line-height: 1.7rem;
        text-decoration: underline;
        img {
          width: 1.3rem;
          height: 1.3rem;
          margin-right: 0.3rem;
        }
      }
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
            color: #1fb6ed;
          }
          span {
            line-height: 1.7rem;
            font-size: 1.2rem;
            color: #868686;
          }
          .inp {
            width: 32rem;
            height: 4rem;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 0.5rem;
            border: 0.1rem solid rgba(215, 216, 223, 1);
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
              background: rgba(230, 248, 255, 1);
              font-size: 1.4rem;
              font-weight: 500;
              color: rgba(31, 182, 237, 1);
              line-height: 2rem;
              border-radius: 0 0.5rem 0.5rem 0;
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
          width: 10rem;
          height: 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
          border-radius: 0.6rem;
          background: #1fb6ed;
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
    .el-card {
      .content {
        .toUpload_content_button {
          display: none;
        }
        .sussecImg {
          display: none !important;
        }
        .toUpload_content_button_sussecImgs {
          margin-top: 2rem;
          display: flex;
          align-items: flex-end;
          .sussecImgs {
            width: 70%;
            display: inline-block;
          }
          .toUpload_content_buttons {
            width: 30%;
            display: inline-block;
          }
        }
        .WhatFilterElement {
          margin-top: 1.5rem;
          padding-left: 1rem;
        }
      }
    }
    .el-col:nth-of-type(2) {
      padding-right: 1rem;
      /deep/ .el-input__inner {
        width: 100% !important;
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
      background-color: rgba(0, 0, 0, 0.6);
      /deep/ .el-dialog__wrapper {
        //  webkit-z-index: 9996!important;
        //  overflow: hidden;
        //  webkit-overflow: hidden;
      }
      /deep/ .el-dialog {
        // z-index: 9999!important;
        width: 90%;
        margin: 0 auto;
        border-radius: 1.4rem !important;
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
              border-radius: 0.6rem;
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
      margin-top: 3rem;
    }
    .el-col:last-of-type {
      align-items: flex-end !important;
      .btn {
        width: 15rem !important;
        height: 3.6rem !important;
        font-size: 1.4rem !important;
      }
    }
  }
  @media screen and (max-width: 420px) {
    .el-col:nth-of-type(2) {
      .text {
        .inp {
          margin-top: 1rem !important;
          height: 8rem !important;
          width: 16.2rem !important;
          flex-direction: column !important;
          box-sizing: border-box !important;
          border-right: 0.1rem solid rgba(215, 216, 223, 1) !important;
        }
        .btn {
          border-radius: 0 0 0.5rem 0.5rem !important;
        }
      }
    }
  }
}
@media screen and (max-width: 991px) {
  .IndicatorPopupStyle {
    #IndicatorPopupStyle_box {
      .input {
        height: 3.8rem;
        border-bottom: none;
        border-right: 0.1rem solid #d7d8df;
        margin-bottom: -1.2rem;
        border-radius: 0.5rem 0.5rem 0 0 !important;
      }
      .btn {
        border-radius: 0 0 0.5rem 0.5rem !important;
      }
      #IndicatorPopupStyle_box_img {
        bottom: 1.5rem;
        img {
          // transform: scale (0.7);
          // -webkit-transform: scale(0.7); /*兼容-webkit-引擎浏览器*/
          // -moz-transform: scale(0.7); /*兼容-moz-引擎浏览器*/
          width: 11rem;
          height: 12.1rem;
        }
        .IndicatorPopupStyle_box_img_box {
          left: 2rem;
          top: -8rem;
          width: 13rem;
          h2 {
            font-size: 1.4rem;
            line-height: 2rem;
          }
          .IndicatorPopupStyle_box_img_box_button {
            margin: 1rem auto 0;
          }
        }
      }
    }
  }
  .updateSwiperStyle {
    .updateSwiperStyle_box {
      width: 90%;
      padding: 3rem 2.6rem;
      .updateSwiperStyle_close {
        top: 1.4rem;
        right: 1.4rem;
      }
      h1 {
        font-size: 2rem;
      }
      .updateSwiperStyle_box_img {
        height: 17rem;
        img {
          transform: scale (0.7);
          -webkit-transform: scale(0.7); /*兼容-webkit-引擎浏览器*/
          -moz-transform: scale(0.7); /*兼容-moz-引擎浏览器*/
        }
      }
      h2 {
        line-height: 2rem;
      }
    }
  }
}
</style>
