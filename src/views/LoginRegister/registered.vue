<template>
  <div class="registered">
    <!-- 顶部logo -->
    <img class="registered_loginLogo" src="@/assets/imgs/loginLogo.png" alt />
    <!-- 提示语 -->
    <p class="registered_title">
      <img src="@/assets/imgs/caveat.png" alt />
      您尚未成為櫻花好友，請填寫下方資料註冊
    </p>
    <!-- 中间内容 -->
    <div class="registered_box">
      <img
        class="registered_box_img"
        src="@/assets/imgs/loginLogoSmall.png"
        alt
      />
      <h1 class="registered_box_h1">
        <img src="@/assets/imgs/PhoneVerification.png" alt />
        <span>建立您的櫻花好友</span>
        <img src="@/assets/imgs/PhoneVerification.png" alt />
      </h1>
      <div class="registered_box_content">
        <!-- 姓名输入框 -->
        <div class="registered_box_content_input">
          <p>姓名</p>
          <el-input v-model="CustName" placeholder="請輸入姓名"></el-input>
        </div>
        <!-- 手機號碼输入框 -->
        <div class="registered_box_content_input">
          <p>手機號碼</p>
          <el-input
            disabled
            v-model="CustMobile"
            placeholder="請輸入手機號碼"
          ></el-input>
        </div>
      </div>
      <div class="registered_box_addr">
        <p>地址</p>
        <span>·未來驗證您的產品或帳戶資料時使用</span>
      </div>
      <div class="registered_box_content">
        <!-- 縣市地區选择框 -->
        <div class="registered_box_content_select">
          <p>縣市地區</p>
          <el-select
            v-model="CustAddrCityId"
            placeholder="請選擇"
            @change="cityChange()"
          >
            <el-option
              v-for="item in cityList"
              :key="item.CityId"
              :label="item.CityName"
              :value="item.CityId"
            ></el-option>
          </el-select>
        </div>
        <!-- 路选择框 -->
        <div class="registered_box_content_select">
          <p>路</p>
          <el-select v-model="CustAddrRoadId" placeholder="請選擇">
            <el-option
              v-for="item in roadList"
              :key="item.RoadId"
              :label="item.RoadName"
              :value="item.RoadId"
            ></el-option>
          </el-select>
        </div>
        <!-- 村 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="village" placeholder="村"></el-input>
        </div>
        <!-- 里 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="ins" placeholder="里"></el-input>
        </div>
        <!-- 鄰 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="adjacent" placeholder="鄰"></el-input>
        </div>
        <!-- 巷 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="lane" placeholder="巷"></el-input>
        </div>
        <!-- 弄 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="dos" placeholder="弄"></el-input>
        </div>
        <!-- 街 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="street" placeholder="街"></el-input>
        </div>
        <!-- 號 -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="numbers" placeholder="號"></el-input>
        </div>
        <!--  -->
        <div class="registered_box_content_input_smasll">
          <el-input v-model="floor"></el-input>
        </div>
        <!-- 樓之 -->
        <div class="registered_box_content_title">樓之</div>
        <div class="registered_box_content_input_smasll">
          <el-input v-model="Ofs"></el-input>
        </div>
        <!--  -->
        <!-- 性別选择框 -->
        <div class="registered_box_content_select">
          <p>性別</p>
          <el-select v-model="CustGender" placeholder="請選擇">
            <el-option
              v-for="item in CustGenderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 市話输入框 -->
        <div class="registered_box_content_input">
          <p>市話</p>
          <el-input v-model="CustTel" placeholder="請輸入市區電話"></el-input>
        </div>
        <!-- 生日选择框 -->
        <div class="registered_box_content_selects">
          <p>生日</p>
          <el-date-picker
            v-model="CustBirthdate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="請選擇"
          ></el-date-picker>
        </div>
        <button class="registered_box_content_button" @click="registered()">
          立即註冊
        </button>
      </div>
    </div>
    <!-- 底部申明 -->
    <nav-footer class="registered_navFooter"></nav-footer>
  </div>
</template>
<script>
import { CreateCustByLINE, getGetAddrCity, GetAddressRoad } from "@/api/api.js";
import NavFooter from "@/components/NavFooter";
export default {
  name: "registered",
  components: {
    NavFooter
  },
  data() {
    return {
      CustGenderList: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      options: [
        {
          value: "選項1",
          label: "選項1"
        },
        {
          value: "選項2",
          label: "選項2"
        },
        {
          value: "選項3",
          label: "選項3"
        },
        {
          value: "選項4",
          label: "選項4"
        },
        {
          value: "選項5",
          label: "選項5"
        }
      ],
      cityList: [],
      roadList: [],
      CustName: "",
      CustMobile: this.$route.query.Phone,
      CustAddrCityId: "",
      CustAddrRoadId: "",
      village: "",
      ins: "",
      adjacent: "",
      lane: "",
      dos: "",
      street: "",
      numbers: "",
      floor: "",
      Ofs: "",
      CustGender: "",
      CustTel: "",
      CustBirthdate: ""
    };
  },
  created() {
    this._getGetAddrCity();
  },
  methods: {
    // 注册
    registered() {
      if (!this.CustName) {
        return this.$message({
          message: "姓名不能為空",
          type: "warning"
        });
      }
      if (!this.CustMobile) {
        return this.$message({
          message: "手機號碼不能為空",
          type: "warning"
        });
      }
      if (!this.CustAddrCityId) {
        return this.$message({
          message: "縣市地區不能為空",
          type: "warning"
        });
      }
      if (!this.CustAddrRoadId) {
        return this.$message({
          message: "路名不能為空",
          type: "warning"
        });
      }
      let CustAddrDetails =
        this.village +
        "村" +
        this.ins +
        "里" +
        this.adjacent +
        "鄰" +
        this.lane +
        "巷" +
        this.dos +
        "弄" +
        this.street +
        "街" +
        this.numbers +
        "號" +
        this.floor +
        "樓之" +
        this.Ofs;
      let form = {
        CustName: this.CustName,
        CustMobile: this.CustMobile,
        CustAddrCityId: this.CustAddrCityId,
        CustAddrRoadId: this.CustAddrRoadId,
        CustAddrVil: "",
        CustAddrDetail: CustAddrDetails,
        LINEMID: this.$route.query.lineMid,
        CustTel: this.CustTel,
        CustGender: this.CustGender,
        CustBirthdate: this.CustBirthdate,
        InstallAddrCityId: "",
        InstallAddrRoadId: "",
        InstallAddrVil: ""
      };
      CreateCustByLINE(form).then(res => {
        if (res.data.State) {
          this.$message({
            message: res.data.Msg,
            type: "success"
          });
          this.$router.push("/sakuraMember");
        } else {
          this.$message({
            message: res.data.Msg ? res.data.Msg : "註冊失敗請重試",
            type: "error"
          });
        }
      });
    },
    // 獲取縣市地區
    _getGetAddrCity() {
      getGetAddrCity().then(res => {
        if (res.status == "success") {
          this.cityList = res.data;
        } else {
          this.$message({
            message: "獲取數據失敗",
            type: "error"
          });
        }
      });
    },
    // 縣市地區變動並獲取路名
    cityChange() {
      console.log(this.CustAddrCityId);
      let form = {
        addressCityId: this.CustAddrCityId
      };
      GetAddressRoad(form).then(res => {
        if (res.status == "success") {
          this.roadList = res.data;
        } else {
          this.$message({
            message: "獲取數據失敗",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.registered {
  position: relative;
  padding-top: 5rem;
  width: 100%;
  height: 108rem;
  background-image: url("../../assets/imgs/bottomImg.png");
  background-size: 100% 25rem;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  .registered_loginLogo {
    width: 23.8rem;
    height: 2.4rem;
  }
  .registered_title {
    margin-top: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: rgba(201, 21, 30, 1);
    line-height: 2.2rem;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.8rem;
    }
  }
  .registered_box {
    margin: 4rem auto 0;
    padding: 5rem 8rem 11rem;
    width: 95rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 3rem 12rem 0px rgba(86, 96, 114, 0.06);
    border-radius: 1rem;
    .registered_box_img {
      width: 10rem;
      height: 1rem;
    }
    .registered_box_h1 {
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
    .registered_box_content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .registered_box_content_input {
        margin-top: 3rem;
        width: 37.9rem;
        height: 5rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.5rem;
        position: relative;
        line-height: 5rem;
        input {
          width: 100%;
          height: 100%;
          padding-left: 10rem;
          padding-right: 2.6rem;
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
        p {
          z-index: 1;
          position: absolute;
          left: 2.6rem;
          top: 0;
          font-size: 1.6rem;
          color: rgba(61, 61, 61, 1);
        }
      }
      .registered_box_content_select {
        margin-top: 3rem;
        width: 37.9rem;
        height: 5rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.5rem;
        position: relative;
        line-height: 5rem;
        // select {
        //   position: absolute;
        //   right: 2.6rem;
        //   top: 0;
        //   width: calc(100% - 10rem);
        //   height: 100%;
        //   padding-left: 10rem;
        //   font-size: 1.6rem;
        //   color: rgba(189, 189, 189, 1);
        //   background: rgba(247, 247, 247, 1);
        //   border-radius: 0.5rem;
        //   outline: none;
        //   border: 0;
        // }
        select::placeholder {
          font-size: 1.6rem;
          color: rgba(189, 189, 189, 1);
        }
        p {
          z-index: 1;
          position: absolute;
          left: 2.6rem;
          top: 0;
          font-size: 1.6rem;
          color: rgba(61, 61, 61, 1);
        }
        .el-select {
          width: 100%;
          height: 100%;
          padding-left: 8.5rem;
          padding-right: 2.6rem;
          border-radius: 0.5rem;
        }
        .el-input__inner {
          font-size: 1.6rem;
          color: rgba(189, 189, 189, 1);
          outline: none;
          border: 0;
          background: rgba(247, 247, 247, 1);
        }
      }
      .registered_box_content_selects {
        margin-top: 3rem;
        padding-right: 2.6rem;
        width: 37.9rem;
        height: 5rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.5rem;
        position: relative;
        line-height: 5rem;
        .el-date-editor {
          float: right;
          padding-left: 8.5rem;
          width: 100%;
          height: 100%;
          font-size: 1.6rem;
          border-radius: 0.5rem;
        }
        .el-input__inner {
          padding-left: 15px;
          outline: none;
          border: 0;
          color: rgba(189, 189, 189, 1);
          background: rgba(247, 247, 247, 1);
        }
        .el-icon-date:before {
          content: none;
        }
        select::placeholder {
          font-size: 1.6rem;
          color: rgba(189, 189, 189, 1);
        }
        p {
          z-index: 1;
          position: absolute;
          left: 2.6rem;
          top: 0;
          font-size: 1.6rem;
          color: rgba(61, 61, 61, 1);
        }
      }
      .registered_box_content_input_smasll {
        margin-top: 3rem;
        width: 7.4rem;
        height: 5rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 5px;
        .el-input {
          height: 100%;
        }
        input {
          width: 100%;
          height: 100%;
          padding: 0 1.4rem;
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
      }
      .registered_box_content_title {
        margin-top: 3rem;
        font-size: 1.6rem;
        color: rgba(189, 189, 189, 1);
        line-height: 5rem;
      }
      .registered_box_content_button {
        margin-top: 3rem;
        border: none;
        background-color: transparent;
        outline: none;
        width: 37.9rem;
        height: 5rem;
        background: rgba(31, 182, 237, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
        border-radius: 0.5rem;
        font-size: 1.6rem;
        color: rgba(255, 255, 255, 1);
        line-height: 5rem;
      }
    }
    .registered_box_addr {
      margin-top: 3rem;
      text-align: left;
      p {
        margin-right: 1.4rem;
        display: inline-block;
        font-size: 2rem;
        font-weight: 500;
        color: rgba(61, 61, 61, 1);
        line-height: 2.8rem;
      }
      span {
        font-size: 1rem;
        color: rgba(31, 182, 237, 1);
        line-height: 1.4rem;
      }
    }
  }
  .registered_navFooter {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
  }
}
@media screen and (max-width: 750px) {
  .registered {
    background-size: 100% 30vh;
    height: auto;
    padding-bottom: 30vh;
    .registered_title {
      margin-top: 3rem;
      font-size: 1.4rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: 0.6rem;
      }
    }
    .registered_box {
      margin: 3rem auto 0;
      width: 90%;
      padding: 3rem 5%;
      .registered_box_h1 {
        font-size: 1.6rem;
        span {
          margin: 0 2rem;
        }
        img {
          width: 2rem;
          height: 0.4rem;
        }
      }
      .registered_box_addr {
        margin-top: 2rem;
      }
      .registered_box_content {
        justify-content: flex-start;
        .registered_box_content_input {
          width: 100%;
          margin-top: 1.5rem;
          .el-input {
            padding-right: 1.5rem;
          }
          p {
            left: 1.5rem;
          }
        }
        .registered_box_content_select {
          width: 100%;
          margin-top: 1.5rem;
          .el-select {
            padding-right: 1.5rem;
          }
          p {
            left: 1.5rem;
          }
        }
        .registered_box_content_selects {
          width: 100%;
          margin-top: 1.5rem;
          p {
            left: 1.5rem;
          }
        }
        .registered_box_content_title {
          margin-top: 1.5rem;
          width: 22%;
          margin-right: 4%;
        }
        .registered_box_content_input_smasll {
          margin-top: 1.5rem;
          width: 22%;
          margin-right: 4%;
        }
        .registered_box_content_input_smasll:nth-child(6) {
          margin-right: 0;
        }
        .registered_box_content_button {
          width: 100%;
          margin-top: 2rem;
        }
      }
    }
  }
}
</style>
