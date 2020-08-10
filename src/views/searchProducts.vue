<template>
  <div class="search-ponents">
    <div class="title">
      <h1>我的產品</h1>
      <span>MY PRODUCT</span>
    </div>
    <el-row :gutter="30" class="product-row" v-if="isShowBlank">
      <el-col :sm="12" v-for="(item, index) in custWaterProdList" :key="index">
        <div class="container-card">
          <el-card>
            <div class="product_top">
              <div class="product_top_imgs">
                <img :src="item.img" alt="" />
              </div>
              <div class="product_top_title">
                <h1>
                  {{ item.name }}<span>{{ item.type }}</span>
                </h1>
                <h2>型號：{{ item.model }}</h2>
                <h2>製號：{{ item.SystemNumber }}</h2>
              </div>
            </div>
            <div class="product_address">安裝地址：{{ item.address }}</div>
            <div class="product_button">
              <div class="product_button_left">
                <img
                  v-if="item.status"
                  src="@/assets/imgs/productTrue.png"
                  alt=""
                />
                <span v-if="item.status">運作正常</span>
                <img
                  v-if="!item.status"
                  src="@/assets/imgs/productFalse.png"
                  alt=""
                />
                <em v-if="!item.status">尚未配對完全</em>
              </div>
              <div class="product_button_right" @click="gotoProduct(item)">
                查看詳情
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="addProduct">
      <img src="@/assets/imgs/addProduct.png" alt="" />
      新增產品
    </div>
    <!-- 產品為空 -->
    <blank v-if="!isShowBlank"></blank>
    <Loading :show="isShowLoading" />
    <!-- 分頁 -->
    <pagination
      :currentpage="offset"
      :pagesize="limit"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :isHidePage="true"
    ></pagination>
  </div>
</template>

<script>
// import ProductList from './components/ProductList'
import Blank from "@/components/Blank";
import storage from "./../storage";
import Pagination from "@/components/Pagination";

export default {
  name: "search-ponents",
  components: {
    Blank,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 4,
      total: 6,
      isShowLoading: false,
      isShowBlank: true,
      custWaterProdList: [
        {
          img: require("@/assets/imgs/product.png"),
          CustProdId: "99cf576b-dcbc-ea11-81b4-005056af7974",
          name: "RO淨水器",
          type: "廚房",
          model: "P0231",
          SystemNumber: "XIN9123IQW22",
          address: "436台中市雅潭路236號5樓",
          status: true,
          Detail: [
            {
              FilterDescription: "5微米PP濾心(12吋)",
              FilterDetail:
                '過濾雜質，過濾面積比制式濾心面積更大（一般濾心10")，過濾效果更佳。',
              FilterMfno: null,
              FilterName: "Filter No. 1",
              FilterSize: "12英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 118,
              RemainLife: "77%",
              Sequence: "1",
              SuggestChangeDate: "2020-12-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 2",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "2",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 3",
              FilterSize: "12 英吋",
              IsBinding: false,
              IsNeedToChange: true,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "3",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 4",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "4",
              SuggestChangeDate: "2021-04-03"
            }
          ]
        },
        {
          img: require("@/assets/imgs/product.png"),
          CustProdId: "99cf576b-dcbc-ea11-81b4-005056af7974",
          name: "RO淨水器",
          type: "廚房",
          model: "P0231",
          SystemNumber: "XIN9123IQW22",
          address: "436台中市雅潭路236號5樓",
          status: true,
          Detail: [
            {
              FilterDescription: "5微米PP濾心(12吋)",
              FilterDetail:
                '過濾雜質，過濾面積比制式濾心面積更大（一般濾心10")，過濾效果更佳。',
              FilterMfno: null,
              FilterName: "Filter No. 1",
              FilterSize: "12英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 118,
              RemainLife: "77%",
              Sequence: "1",
              SuggestChangeDate: "2020-12-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 2",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "2",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 3",
              FilterSize: "12 英吋",
              IsBinding: false,
              IsNeedToChange: true,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "3",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 4",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "4",
              SuggestChangeDate: "2021-04-03"
            }
          ]
        },
        {
          img: require("@/assets/imgs/product.png"),
          CustProdId: "99cf576b-dcbc-ea11-81b4-005056af7974",
          name: "標準型RO淨水器",
          type: "廚房",
          model: "P0231",
          SystemNumber: "XIN9123IQW22",
          address: "436台中市學府路113號2樓",
          status: true,
          Detail: [
            {
              FilterDescription: "5微米PP濾心(12吋)",
              FilterDetail:
                '過濾雜質，過濾面積比制式濾心面積更大（一般濾心10")，過濾效果更佳。',
              FilterMfno: null,
              FilterName: "Filter No. 1",
              FilterSize: "12英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 118,
              RemainLife: "77%",
              Sequence: "1",
              SuggestChangeDate: "2020-12-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 2",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "2",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 3",
              FilterSize: "12 英吋",
              IsBinding: false,
              IsNeedToChange: true,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "3",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 4",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "4",
              SuggestChangeDate: "2021-04-03"
            }
          ]
        },
        {
          img: require("@/assets/imgs/product.png"),
          CustProdId: "99cf576b-dcbc-ea11-81b4-005056af7974",
          name: "標準型RO淨水器",
          type: "餐廳",
          model: "P0231",
          SystemNumber: "XIN9123IQW22",
          address: "436台中市學府路113號2樓",
          status: false,
          Detail: [
            {
              FilterDescription: "5微米PP濾心(12吋)",
              FilterDetail:
                '過濾雜質，過濾面積比制式濾心面積更大（一般濾心10")，過濾效果更佳。',
              FilterMfno: null,
              FilterName: "Filter No. 1",
              FilterSize: "12英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 118,
              RemainLife: "77%",
              Sequence: "1",
              SuggestChangeDate: "2020-12-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 2",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "2",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 3",
              FilterSize: "12 英吋",
              IsBinding: false,
              IsNeedToChange: true,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "3",
              SuggestChangeDate: "2021-04-03"
            },
            {
              FilterDescription: "椰殼活性碳濾心(12吋)",
              FilterDetail:
                "1.可以保護RO膜管使其不受化學物質（氯）侵蝕，延長RO膜的壽命。<BR>  2.斯里蘭卡高級天然椰殼製成，吸附效果更好。",
              FilterMfno: null,
              FilterName: "Filter No. 4",
              FilterSize: "12 英吋",
              IsBinding: true,
              IsNeedToChange: false,
              LastChangeDate: "2020-07-03",
              RemainDays: 239,
              RemainLife: "87%",
              Sequence: "4",
              SuggestChangeDate: "2021-04-03"
            }
          ]
        }
      ],
      EncodeProductId: storage.getItem("EncodeProductId"),
      LINEMid: storage.getItem("LINEMid")
    };
  },
  methods: {
    // 分頁變動
    handleCurrentChange(e) {
      console.log(e);
    },
    gotoProduct(item) {
      var arr = JSON.stringify(item);
      this.$router.push({
        path: `/searchProductsDetails`,
        query: { item: encodeURIComponent(arr) }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.search-ponents {
  .title {
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
  .container-card {
    width: 100%;
    margin-bottom: 3rem;
    .el-card {
      padding: 1rem;
      border-radius: 1.4rem;
      cursor: pointer;
    }
    .product_top {
      display: flex;
      align-items: center;
      .product_top_imgs {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        img {
          max-width: 7rem;
          max-height: 7rem;
        }
      }
      .product_top_title {
        margin-left: 1rem;
        h1 {
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          color: rgba(31, 182, 237, 1);
          line-height: 2.8rem;
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
        h2 {
          font-size: 1.3rem;
          color: rgba(134, 134, 134, 1);
          line-height: 1.8rem;
        }
      }
    }
    .product_address {
      padding: 2.6rem 0;
      font-size: 1.5rem;
      font-weight: 500;
      color: rgba(134, 134, 134, 1);
      line-height: 2.1rem;
    }
    .product_button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .product_button_left {
        display: flex;
        align-items: center;
        img {
          width: 1.6rem;
          height: 1.6rem;
          margin-right: 0.7rem;
        }
        span {
          font-size: 1.4rem;
          color: rgba(3, 187, 0, 1);
          line-height: 2rem;
        }
        em {
          font-size: 1.4rem;
          line-height: 2rem;
          color: rgba(201, 21, 30, 1);
        }
      }
      .product_button_right {
        width: 12.8rem;
        height: 3.8rem;
        background: rgba(31, 182, 237, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
        border-radius: 0.6rem;
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 1);
        line-height: 3.8rem;
        text-align: center;
      }
    }
  }
  .addProduct {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    height: 6rem;
    background: rgba(31, 182, 237, 1);
    box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
    border-radius: 0.6rem;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.8rem;
    }
  }
  @media screen and(min-width: 767px) and (max-width: 991px) {
    .product-row {
      /deep/.el-col-sm-12 {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        .container-card {
          margin-bottom: 2rem !important;
        }
      }
    }
    // .el-card {
    //   height: 27rem;
    // }
  }
  // @media screen and(min-width:1200px) {
  //   .el-card {
  //     height: 25.1rem;
  //   }
  // }
}
</style>
