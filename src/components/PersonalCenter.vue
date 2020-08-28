<template>
  <div class="containers" v-if="userName">
    <div class="hint">
      <!-- <p>王小明您好！</p>
    <p>歡迎來到櫻花淨水器～</p> -->
      <!-- <p :style="{color: blue}">{{userName.CustName}}您好,歡迎回來!</p> -->
    </div>
    <div class="personal-data">
      <div class="pic">
        <img
          v-if="userName.CustPictureUrl"
          :src="userName.CustPictureUrl"
          alt=""
          @click.stop="imgClick"
        />
        <img
          v-else
          src="./../assets/img/user_name.png"
          alt=""
          @click="imgClick"
        />
      </div>
      <div class="txt-name">{{ userName.CustName }}</div>
      <!-- <h3 class="txt-title">消費者會員代號：A05541</h3> -->
      <!-- <div class="btn">
        <i class="mcicon-3"></i>
        {{userName.Mobile}}
      </div> -->
    </div>
    <div class="list">
      <el-card>
        <div class="list-item">
          <img src="./../assets/img/icon_phone.png" alt="" />
          <div class="item-site">
            <span>電話號碼</span>
            <p>{{ userName.Mobile }}</p>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="list-item">
          <img src="./../assets/img/icon_wuzi.png" alt="" />
          <div class="item-site">
            <span>驗證地址</span>
            <p>{{ userName.CustAddress }}</p>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="list-item">
          <img
            src="./../assets/img/icon_line.png"
            alt=""
            v-if="!userName.LineBinding"
          />
          <img src="./../assets/img/icon_line2.png" alt="" v-else />
          <div class="item-site">
            <span>LINE綁定狀態</span>
            <p v-if="!userName.LineBinding">未綁定</p>
            <p v-else>已绑定</p>
          </div>
          <span
            class="site-bind"
            @click="isDialogShows = true"
            v-if="!userName.LineBinding"
            >去綁定</span
          >
        </div>
        <binding-dialog
          :isDialogShow="isDialogShows"
          :goNoClick="goNoClick"
          :goToClick="goToClick"
        ></binding-dialog>
      </el-card>
      <el-card v-if="userName.LineBinding">
        <div class="list-item">
          <img
            src="./../assets/img/icon_fanhui.png"
            alt=""
            v-if="userName.ShareCode"
          />
          <img src="./../assets/img/icon_fanhui2.png" alt="" v-else />
          <div class="item-site">
            <span>我的推薦碼</span>
            <p>{{ userName.ShareCode }}</p>
          </div>
          <span
            class="site-bind"
            v-clipboard:copy="userName.ShareCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >複製</span
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import BindingDialog from "./BindingDialog";
import storage from "./../storage";
import { getCustomerByLineMid, getCustByEncodeProdcutId } from "../api/api";
export default {
  name: "personal-center",
  props: {
    imgClick: { type: Function, default: () => {} },
    blue: { type: String, default: "" }
  },
  components: {
    BindingDialog
  },
  data() {
    return {
      isDialogShows: false,
      isShow: false,
      copyData: null,
      EncodeProductId: "",
      LINEMid: "",
      userName: {},
      fullWidth: document.documentElement.clientWidth
    };
  },
  mounted() {
    this.EncodeProductId = storage.getItem("EncodeProductId");
    this.LINEMid = storage.getItem("LINEMid");
    if (!this.EncodeProductId) {
      this._getCustomerByLineMid();
      // console.log(this.LINEMid)
    } else {
      // console.log(this.EncodeProductId)
      this._getCustByEncodeProdcutId();
    }
  },
  methods: {
    _getCustByEncodeProdcutId() {
      const EncodeProductId = storage.getItem("EncodeProductId");
      getCustByEncodeProdcutId({
        EncodeProductId
      }).then(res => {
        // console.log('p', res)
        if (res.status === 200) {
          this.userName = res.data.Data;
          storage.setItem("userName", res.data.Data);
        }
      });
    },
    _getCustomerByLineMid() {
      // const LINEMid = this.$cookie.get('LINEMid')
      const LINEMid = storage.getItem("LINEMid");
      const type = storage.getItem("type");
      // console.log(LINEMid)

      getCustomerByLineMid({
        LINEMid
      }).then(res => {
        // console.log('m', res)
        if (res.status === 200) {
          this.userName = res.data.Data;
          storage.setItem("userName", res.data.Data);
          // 已綁定line
          if (type == "line" && res.data.State) {
            // 跳轉到已綁定頁面
            this.$router.push({
              path: `/lineBind`,
              query: {
                lineMid: LINEMid
              }
            });
          } else if (type == "line" && !res.data.State) {
            // 未綁定line
            // 跳轉到手機獲取驗證碼頁面
            this.$router.push({
              path: `/PhoneVerification`,
              query: {
                lineMid: LINEMid
              }
            });
          }
        }
      });
    },
    goToClick() {
      window.location.href = "https://line.me/R/ti/p/@sakura.tw";
      this.isDialogShows = false;
    },
    goNoClick() {
      this.isDialogShows = false;
    },
    onCopy() {
      this.$message({
        message: "複製成功！",
        type: "success"
      });
    },
    onError() {
      this.$message({
        message: "複製失敗！",
        type: "error"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.containers {
  .hint {
    margin-bottom: 6rem;
    p {
      margin-left: 1.6rem;
      font-size: 2.4rem;
      line-height: 3.3rem;
      font-weight: 700;
      color: #fff;
    }
  }
  .personal-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic {
      width: 10.2rem;
      height: 10.2rem;

      border-radius: 50%;
      border: 0.2rem solid #fff;
      overflow: hidden;
      margin-bottom: 2rem;
      img {
        width: 100%;
        height: 100%;
        background-color: #e5e5e5;
      }
    }
    .txt-name {
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
      color: #868686;
      padding-bottom: 3rem;
    }
    .txt-title {
      line-height: 2.5rem;
      font-style: 1.8rem;
      color: #3d3d3d;
    }
    .btn {
      height: 3.8rem;
      background-color: #1fb6ed;
      box-shadow: 0 1.2rem 3rem 0 rgba(1, 181, 240, 0.15);
      border-radius: 0.6rem;
      color: #fff;
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4rem;
      cursor: pointer;
      .mcicon-3 {
        margin-right: 1rem;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-card {
      width: 80%;
      margin-bottom: 1.5rem;
      border-radius: 0.6rem;
      .list-item {
        height: 3rem;
        display: flex;
        align-items: center;
        img {
          flex: 0 0 2rem;
          width: 2rem;
          height: 2rem;
          margin-right: 0.8rem;
        }
        .item-site {
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size: 1.2rem;
          span {
            color: #bdbdbd;
            margin-bottom: 0.5rem;
          }
          p {
            color: #3d3d3d;
          }
        }
        .site-bind {
          display: block;
          width: 8rem;
          height: 2.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(230, 248, 255, 1);
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: rgba(31, 182, 237, 1);
          line-height: 1.7rem;
          border-color: transparent;
        }
      }
    }
  }
}
@media only screen and (max-width: 993px) {
  .list .el-card {
    width: 100% !important;
  }
}
</style>
