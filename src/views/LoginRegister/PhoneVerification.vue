<template>
  <div class="PhoneVerification">
    <!-- 顶部logo -->
    <img
      class="PhoneVerification_loginLogo"
      src="@/assets/imgs/loginLogo.png"
      alt=""
    />
    <!-- 中间内容 -->
    <div class="PhoneVerification_box">
      <img
        class="PhoneVerification_box_img"
        src="@/assets/imgs/loginLogoSmall.png"
        alt=""
      />
      <h1 class="PhoneVerification_box_h1">
        <img src="@/assets/imgs/PhoneVerification.png" alt="" />
        <span>手機驗證碼輸入</span>
        <img src="@/assets/imgs/PhoneVerification.png" alt="" />
      </h1>
      <div class="PhoneVerification_box_input">
        <span>手機號碼</span>
        <input type="text" placeholder="請輸入手機號碼" v-model="Phone" />
        <button v-show="!show" @click="_getWATERVIPSentSMS()">
          重新獲取{{ count }}s
        </button>
        <button v-show="show" @click="_getWATERVIPSentSMS()">獲取驗證碼</button>
      </div>
      <div class="PhoneVerification_box_input">
        <span>驗證碼</span>
        <input
          type="text"
          placeholder="請輸入驗證碼"
          v-model="VerificationCode"
        />
      </div>
      <p class="PhoneVerification_box_title" v-if="VerificationCodeStatus">
        <img src="@/assets/imgs/caveat.png" alt="" />
        您所填寫的驗證碼錯誤
      </p>
      <button class="PhoneVerification_box_button" @click="submit()">
        確認
      </button>
    </div>
    <!-- 底部申明 -->
    <nav-footer class="PhoneVerification_navFooter"></nav-footer>
  </div>
</template>
<script>
import { getWATERVIPSentSMS, getWATERVIPVerifySMS } from "@/api/api.js";
import NavFooter from "@/components/NavFooter";
export default {
  name: "PhoneVerification",
  components: {
    NavFooter
  },
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      Phone: "",
      VerificationCode: "",
      VerificationCodeStatus: false,
      lineMid: this.$route.query.lineMid
    };
  },
  methods: {
    submit() {
      if (!this.Phone) {
        return this.$message({
          message: "請輸入手機號碼",
          type: "warning"
        });
      }
      if (!this.VerificationCode) {
        return this.$message({
          message: "請輸入驗證碼",
          type: "warning"
        });
      }
      var form = {
        Mobile: this.Phone,
        Code: this.VerificationCode
      };
      getWATERVIPVerifySMS(form).then(res => {
        if (res.data.State) {
          this.$message({
            message: res.data.Result,
            type: "success"
          });
          this.$router.push({
            path: `/registered`,
            query: {
              Phone: this.Phone,
              lineMid: this.lineMid
            }
          });
        } else {
          this.$message({
            message: res.data.Result,
            type: "error"
          });
        }
      });
    },
    _getWATERVIPSentSMS() {
      if (!this.Phone) {
        return this.$message({
          message: "請輸入手機號碼",
          type: "warning"
        });
      }
      var form = {
        Mobile: this.Phone,
        Source: "LINE綁定"
      };
      getWATERVIPSentSMS(form).then(res => {
        if (res.data.State) {
          clearInterval(this.timer);
          this.timer = null;
          this.getCode();
          this.$message({
            message: res.data.Result,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.Result,
            type: "error"
          });
        }
      });
    },
    // 验证码倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.PhoneVerification {
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/bottomImg.png");
  background-size: 100% 25rem;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  .PhoneVerification_loginLogo {
    width: 23.8rem;
    height: 2.4rem;
  }
  .PhoneVerification_box {
    margin: 10rem auto 0;
    padding: 5rem 8rem 7rem;
    width: 75rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 3rem 12rem 0px rgba(86, 96, 114, 0.06);
    border-radius: 1rem;
    .PhoneVerification_box_img {
      width: 10rem;
      height: 1rem;
    }
    .PhoneVerification_box_h1 {
      padding-bottom: 1.2rem;
      margin-top: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      color: rgba(61, 61, 61, 1);
      line-height: 2.8rem;
      span {
        margin: 0 2.4rem;
      }
      img {
        width: 2.4rem;
        height: 0.4rem;
      }
    }
    .PhoneVerification_box_input {
      margin-top: 2.8rem;
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      background: rgba(247, 247, 247, 1);
      border-radius: 0.5rem;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        padding-left: 11rem;
        padding-right: 19rem;
        font-size: 1.6rem;
        color: rgba(189, 189, 189, 1);
        background: rgba(247, 247, 247, 1);
        border-radius: 0.5rem;
        outline: none;
        border: 0;
      }
      input::placeholder {
        font-size: 1.6rem;
        color: rgba(189, 189, 189, 1);
      }
      span {
        position: absolute;
        left: 3rem;
        top: 0;
        font-size: 1.6rem;
        color: rgba(61, 61, 61, 1);
      }
      button {
        border: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        position: absolute;
        right: 3rem;
        top: 1.5rem;
        text-decoration: underline;
        font-size: 1.6rem;
        color: rgba(61, 61, 61, 1);
      }
    }
    .PhoneVerification_box_title {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      margin-top: 1rem;
      font-size: 1.2rem;
      color: rgba(201, 21, 30, 1);
      line-height: 1.7rem;
      img {
        width: 1.1rem;
        height: 1.1rem;
        margin-right: 0.3rem;
      }
    }
    .PhoneVerification_box_button {
      cursor: pointer;
      margin-top: 6rem;
      border: none;
      background-color: transparent;
      outline: none;
      width: 28.7rem;
      height: 5rem;
      background: rgba(31, 182, 237, 1);
      box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
      border-radius: 5px;
      font-size: 1.6rem;
      color: rgba(255, 255, 255, 1);
      line-height: 5rem;
    }
  }
  .PhoneVerification_navFooter {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
  }
}
@media screen and (max-width: 992px) {
  .PhoneVerification {
    background-size: 100% 30vh;
    .PhoneVerification_box {
      margin: 3rem auto 0;
      width: 90%;
      padding: 3rem 5%;
      .PhoneVerification_box_h1 {
        padding-bottom: 0.5rem;
        font-size: 1.8rem;
        line-height: 2.2rem;
        span {
          margin: 0 1.4rem;
        }
      }
      .PhoneVerification_box_input {
        margin-top: 2rem;
        input {
          padding-left: 8rem;
          padding-right: 10rem;
          font-size: 1.4rem;
        }
        input::placeholder {
          font-size: 1.4rem;
        }
        span {
          left: 1rem;
          font-size: 1.4rem;
        }
        button {
          right: 1rem;
          font-size: 1.4rem;
        }
      }
      .PhoneVerification_box_button {
        margin-top: 3rem;
        width: 80%;
      }
    }
  }
}
</style>
