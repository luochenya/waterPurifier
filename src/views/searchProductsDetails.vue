<template>
  <div class="searchProductsDetails">
    <div class="searchProductsDetails_title">
      <h1>產品詳細資料</h1>
      <span>PRODUCT DETAILS</span>
    </div>
    <el-card class="card" v-if="dataFormList">
      <div class="productDetails">
        <div class="productDetails_img">
          <img :src="dataFormList.img" alt="" />
        </div>
        <div v-if="EditStatus" class="productDetails_title">
          <h2>
            {{ dataFormList.name }} <span>{{ dataFormList.type }}</span>
          </h2>
          <p>型號：{{ dataFormList.model }}</p>
          <p>製號：{{ dataFormList.SystemNumber }}</p>
          <p>安裝地址：{{ dataFormList.address }}</p>
        </div>
        <div v-if="EditStatus" class="productDetails_button">
          <div class="productDetails_button_left" @click="EditStatus = false">
            編輯
          </div>
          <div class="productDetails_button_right">水質檢測結果</div>
        </div>
        <div v-if="!EditStatus" class="productDetails_content">
          <div class="productDetails_content_input">
            <p>設備名稱</p>
            <el-input
              type="text"
              placeholder=""
              v-model="equipmentName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
          <div class="productDetails_content_input">
            <p>設備位置</p>
            <el-input
              type="text"
              placeholder=""
              v-model="equipmentArrs"
            ></el-input>
          </div>
          <span class="productDetails_content_button" @click="storageClick()"
            >儲存</span
          >
        </div>
      </div>
    </el-card>
    <el-row :gutter="15">
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        v-for="(item, index) in dataFormList.Detail"
        :key="index"
      >
        <div @click="clickFilterState(item, dataFormList)">
          <filter-state
            :list="item"
            :isHeight="'30rem'"
            @timeClick="timeClick(item, dataFormList)"
            @redClick="redClick(item, dataFormList)"
          ></filter-state>
        </div>
      </el-col>
    </el-row>
    <guide-two
      :isDialogShow="isShowGuideTwo"
      :noShowClick="noShowClick"
      :noClick="noClick"
      :filter="true"
    ></guide-two>
    <guide-two :isDialogShow="isShowGuideTwos" :filter_="true"></guide-two>
    <Loading :show="isShowLoadging"></Loading>
  </div>
</template>

<script>
import FilterState from "@/components/FilterState";
import GuideTwo from "@/components/PopUp/Guide_2";
import { getByProductId } from "../api/api";
import storage from "./../storage";
export default {
  components: {
    FilterState,
    GuideTwo
  },
  data() {
    return {
      isShowGuideTwo: false,
      isShowGuideTwos: false,
      isShowLoadging: false,
      CustProdId: "",
      dataFormList: {},
      // 設備名稱
      equipmentName: "",
      // 設備位置
      equipmentArrs: "",
      EditStatus: true
    };
  },
  mounted() {
    this.dataFormList = JSON.parse(decodeURIComponent(this.$route.query.item));
  },
  methods: {
    // 存儲
    storageClick() {
      if (this.equipmentName) {
        this.dataFormList.name = this.equipmentName;
      }
      if (this.equipmentArrs) {
        this.dataFormList.type = this.equipmentArrs;
      }
      // 清空輸入框
      this.equipmentName = "";
      this.equipmentArrs = "";
      this.EditStatus = true;
    },
    noShowClick() {
      this.isShowGuideTwo = false;
      this.$router.push({ name: "YourDealer" });
    },
    // 略過
    noClick() {
      this.isShowGuideTwo = false;
      this.$router.push({ name: "YourDealer2" });
    },
    clickFilterState(item, id) {
      this.$router.push({
        path: `/toView/${id.CustProdId}`,
        query: { Sequence: item.Sequence }
      });
    },
    // 建議更換濾芯
    timeClick(item, id) {
      this.$router.push({
        path: `/toView/${id.CustProdId}`,
        query: { Sequence: item.Sequence }
      });
    },
    redClick(item, id) {
      this.$router.push({
        path: `/toView/${id.CustProdId}`,
        query: { Sequence: item.Sequence }
      });
    }
  }
};
</script>

<style lang="scss">
.searchProductsDetails {
  .searchProductsDetails_title {
    margin-bottom: 3rem;
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
      font-weight: lighter;
    }
  }
  .card {
    border-radius: 1rem;
    padding: 2rem 3rem;
    margin-bottom: 2rem;
    .productDetails {
      height: 100%;
      display: flex;
      // align-items: center;
      .productDetails_img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10rem;
        height: 10rem;
        margin-right: 2.8rem;
        img {
          max-width: 10rem;
          max-height: 10rem;
        }
      }
      .productDetails_title {
        display: flex;
        flex-direction: column;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
        h2 {
          display: flex;
          align-items: center;
          line-height: 2.8rem;
          margin-bottom: 0.6rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1fb6ed;
          span {
            margin-left: 0.6rem;
            display: inline-block;
            line-height: 1.6rem;
            padding: 0.3rem 0.9rem;
            font-size: 1rem;
            color: rgba(255, 255, 255, 1);
            background: rgba(233, 99, 67, 1);
            border-radius: 3px;
          }
        }
        p {
          line-height: 2.1rem;
          font-size: 1.3rem;
          color: #868686;
        }
      }
      .productDetails_button {
        display: flex;
        margin-left: auto;
        .productDetails_button_left {
          width: 11.8rem;
          height: 4.6rem;
          background: rgba(226, 247, 255, 1);
          box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.1);
          border-radius: 0.6rem;
          border: 2px solid rgba(31, 182, 237, 1);
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(31, 182, 237, 1);
          line-height: 4.6rem;
          text-align: center;
        }
        .productDetails_button_right {
          margin-left: 2rem;
          width: 11.8rem;
          height: 4.6rem;
          background: rgba(31, 182, 237, 1);
          box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
          border-radius: 0.3rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 4.6rem;
          text-align: center;
        }
      }
      .productDetails_content {
        display: flex;
        align-items: center;
        .productDetails_content_input {
          padding-right: 2rem;
          p {
            font-size: 1.3rem;
            font-weight: 500;
            color: rgba(61, 61, 61, 1);
            line-height: 1.8rem;
            margin-bottom: 0.8rem;
          }
          .el-input__inner {
            width: 16.8rem;
            height: 4.6rem;
            background: rgba(247, 247, 247, 1);
            border-radius: 0.6rem;
            font-size: 1.4rem;
            color: rgba(189, 189, 189, 1);
            line-height: 4.6rem;
          }
          .el-input .el-input__count .el-input__count-inner {
            font-size: 1.2rem;
            color: rgba(189, 189, 189, 1);
            line-height: 1.7rem;
            background: rgba(247, 247, 247, 1);
          }
        }
        .productDetails_content_button {
          margin-left: 1rem;
          margin-top: 2.6rem;
          display: block;
          width: 10rem;
          height: 4.6rem;
          background: rgba(31, 182, 237, 1);
          box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
          border-radius: 0.6rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 4.6rem;
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 1199px) {
    .card {
      padding: 1rem;
    }
  }
  @media screen and (max-width: 991px) {
    .card {
      .productDetails {
        flex-wrap: wrap;
        width: 100%;
        .productDetails_img {
          margin-right: 2rem;
        }
        .productDetails_title {
          width: calc(100% - 12rem);
          margin-right: 0;
        }
        .productDetails_button {
          margin-top: 2rem;
          margin-left: auto;
        }
        .productDetails_content {
          width: calc(100% - 12rem);
          align-items: flex-start;
          flex-wrap: wrap;
          .productDetails_content_input {
            width: 100%;
            padding-right: 0;
            margin-bottom: 1rem;
            .el-input__inner {
              width: 100%;
            }
          }
          .productDetails_content_button {
            margin-top: 1rem;
            margin-left: auto;
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .card {
    }
  }
  @media screen and (max-width: 500px) {
    .card {
      /deep/ .el-card__body {
        padding: 1rem;
      }
    }
  }
}
</style>
