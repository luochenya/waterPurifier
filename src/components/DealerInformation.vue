<template>
  <div class="DealerInformation">
    <el-card v-for="(item, index) in map" :key="index" class="dealerInformation">
      <el-row>
        <el-col :sm="24">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24" class="dealerInformation_header">
              <img class="dealerInformation_header_img" :src="item.imgs" alt />
              <div v-if="!mapStatus[index]" class="dealerInformation_header_box">
                <h2>
                  {{item.names}}
                  <em v-if="item.status">{{item.status}}</em>
                </h2>
                <p>型號：{{item.model}}</p>
                <p>製號：{{item.SystemNumber}}</p>
                <p>安裝地址：{{item.adds}}</p>
              </div>
              <div
                v-if="!mapStatus[index]"
                class="dealerInformation_header_button"
                @click="editClick(index)"
              >編輯</div>
              <div
                v-if="mapStatus[index]"
                class="dealerInformation_header_button dealerInformation_header_buttons"
                @click="storageClick(index)"
              >儲存</div>
              <!--  -->
              <!--  -->
              <div v-if="mapStatus[index]" class="dealerInformation_header_content">
                <div class="dealerInformation_header_content_input">
                  <p>設備名稱</p>
                  <el-input
                    type="text"
                    placeholder
                    v-model="equipmentName[index]"
                    maxlength="10"
                    show-word-limit
                  ></el-input>
                </div>
                <div class="dealerInformation_header_content_input">
                  <p>設備位置</p>
                  <el-input type="text" placeholder v-model="equipmentArrs[index]"></el-input>
                </div>
                <span
                  class="dealerInformation_header_content_button"
                  @click="storageClick(index)"
                >儲存</span>
              </div>
              <!--  -->
              <!--  -->
            </el-col>
            <el-col
              v-if="mapStatus[index]"
              :sm="24"
              :md="24"
              :lg="24"
              class="dealerInformation_bottom"
            >
              <div class="dealerInformation_header_contents">
                <div class="dealerInformation_header_content_input">
                  <p>設備名稱</p>
                  <el-input
                    type="text"
                    placeholder
                    v-model="equipmentName[index]"
                    maxlength="10"
                    show-word-limit
                  ></el-input>
                </div>
                <div class="dealerInformation_header_content_input">
                  <p>設備位置</p>
                  <el-input type="text" placeholder v-model="equipmentArrs[index]"></el-input>
                </div>
                <span
                  class="dealerInformation_header_content_button"
                  @click="storageClick(index)"
                >儲存</span>
              </div>
            </el-col>

            <el-col
              v-if="!mapStatus[index]"
              :sm="24"
              :md="24"
              :lg="24"
              class="dealerInformation_bottom"
            >
              <div class="dealerInformation_header_box">
                <h2>
                  {{item.names}}
                  <em v-if="item.status">{{item.status}}</em>
                </h2>
                <p>型號：{{item.model}}</p>
                <p>製號：{{item.SystemNumber}}</p>
                <p>安裝地址：{{item.adds}}</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24">
          <div class="information">
            <el-row>
              <el-col :sm="24" :md="11" :lg="11">
                <div class="text">
                  <h1>{{item.Name}}店</h1>
                  <span>{{item.PHPCustId}}</span>
                </div>
              </el-col>
              <el-col :sm="24" :md="24" :lg="13">
                <el-row class="info">
                  <el-col :sm="16" :lg="18">
                    <span class="title">門店地址</span>
                    <div class="text">
                      <p class="span_1">{{item.Address}}</p>
                      <span
                        class="ico"
                        @click="$router.push({ path: '/map', query: { Address: map.Address } })"
                      >
                        <i class="mcicon-1"></i>
                        查看地址
                      </span>
                    </div>
                  </el-col>
                  <el-col :sm="8" :lg="6">
                    <span class="title">聯繫電話</span>
                    <p class="span_1">{{item.Mobile}}</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMaintenanceDistributionByCustId } from "../api/api";
import storage from "./../storage";
export default {
  name: "dealer-information",
  props: {
    // map: { type: Object }
  },
  data() {
    return {
      CustId: "",
      equipmentName: ["", ""],
      equipmentArrs: ["", ""],
      mapStatus: [false, false],
      map: [
        {
          imgs: require("@/assets/imgs/WaterPurifier1.png"),
          names: "標準型RO淨水器",
          model: "P0220",
          SystemNumber: "XIN9123IQ",
          adds: "436台中市雅潭路236號5樓",
          status: "廚房",
          CRMId: "099a511f-8518-e911-8156-005056af7974",
          PHPCustId: "Water Purifier Store Fengjia Store",
          Name: "淨水器專賣店 逢甲",
          Mobile: "0938-710-668",
          Address: "花蓮縣花蓮市中山路214號",
        },
        {
          imgs: require("@/assets/imgs/WaterPurifier2.png"),
          model: "P0220",
          names: "RO 淨水器",
          SystemNumber: "XIN9123IQ",
          adds: "436台中市雅潭路236號5樓",
          status: "客廳",
          CRMId: "099a511f-8518-e911-8156-005056af7974",
          PHPCustId: "Water Purifier Store Fengjia Store",
          Name: "淨水器專賣店 逢甲",
          Mobile: "0938-710-668",
          Address: "花蓮縣花蓮市中山路214號",
        },
      ],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: "#01a99a",
          opacity: 0,
          size: "10px",
          specifyBorderRadius: false,
          gutterOfEnds: null, // 轨道距 x 和 y 轴两端的距离
          gutterOfSide: "0", // 距离容器的距离
          keepShow: false, // 是否即使 bar 不存在的情况下也保持显示
          border: "none", // 边框
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: "#E6E6E6", // 颜色
        },
      },
    };
  },
  mounted() {
    this.CustId = storage.getItem("userName").CustId;
    // this._getMaintenanceDistributionByCustId()
  },
  methods: {
    // 编辑
    editClick(index) {
      this.mapStatus.splice(index, 1, true);
    },
    // 储存
    storageClick(index) {
      if (this.equipmentName[index])
        this.map[index].names = this.equipmentName[index];
      if (this.equipmentArrs[index])
        this.map[index].status = this.equipmentArrs[index];
      this.mapStatus.splice(index, 1, false);
      this.equipmentName.splice(index, 1, "");
      this.equipmentArrs.splice(index, 1, "");
    },
    _getMaintenanceDistributionByCustId() {
      const { CustId } = this;
      getMaintenanceDistributionByCustId({ CustId }).then((res) => {
        // let list = []
        this.map = res.data.Data;
        // if (res.data.Data) {
        //   const hash = {}
        //   this.map = res.data.Data.reduce(function (item, next) {
        //   // eslint-disable-next-line no-unused-expressions
        //     hash[next.Name] ? '' : hash[next.Name] = true && item.push(next)
        //     return item
        //   }, [])
        // }
      });
    },
  },
};
</script>

<style lang="scss">
.DealerInformation {
  .dealerInformation {
    margin-bottom: 2rem;
    .dealerInformation_header {
      margin-bottom: 4.5rem;
      display: flex;
      justify-content: space-between;
      .dealerInformation_header_img {
        width: 10rem;
        height: 10rem;
      }
      .dealerInformation_header_box {
        width: calc(100% - 21.8rem);
        padding-left: 1.8rem;
        h2 {
          margin-bottom: 0.6rem;
          font-size: 2rem;
          font-weight: 500;
          color: rgba(31, 182, 237, 1);
          line-height: 2.8rem;
          em {
            margin-left: 0.6rem;
            display: inline-block;
            padding: 0.4rem 0.7rem;
            background: rgba(233, 99, 67, 1);
            border-radius: 3px;
            font-size: 1rem;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 1.2rem;
          }
        }
        p {
          font-size: 1.3rem;
          color: rgba(134, 134, 134, 1);
          line-height: 2.1rem;
        }
      }
      .dealerInformation_header_button {
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
      .dealerInformation_header_buttons {
        display: none;
      }
      .dealerInformation_header_content {
        display: flex;
        align-items: center;
        .dealerInformation_header_content_input {
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
        .dealerInformation_header_content_button {
          margin-left: 1rem;
          margin-right: 1rem;
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
    .dealerInformation_bottom {
      display: none;
    }
  }
  .el-card {
    border-radius: 1rem;
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      img {
        width: 2.2rem;
        height: 2.4rem;
        margin-right: 1rem;
      }
      span {
        line-height: 2rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: rgba(61, 61, 61, 1);
      }
    }
    .h-scroll {
      height: 10.6rem;
    }
    .w-xs {
      height: 21.2rem;
    }
    // .h-scroll [class="information"]:nth-of-type(2n-1){
    //   background:rgba(249,249,250,1);
    //   border-radius:10px;
    // }
    .information {
      padding: 1rem 1rem 0 1rem;
      .text {
        margin-bottom: 1rem;
        h1 {
          line-height: 2.8rem;
          font-size: 2rem;
          font-weight: 700;
          color: rgba(61, 61, 61, 1);
        }
        span {
          line-height: 1.4rem;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(189, 189, 189, 1);
        }
      }
      .info {
        font-size: 1.2rem;
        .title {
          margin-bottom: 0.8rem;
          line-height: 1.7rem;
          color: rgba(134, 134, 134, 1);
        }
        .span_1 {
          line-height: 1.7rem;
          font-weight: 700;
          color: rgba(61, 61, 61, 1);
        }
        .text {
          display: flex;
          align-items: center;
          .ico {
            margin-left: 1rem;
            font-weight: 500;
            color: #1fb6ed;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    .h-scroll {
      height: 6.6rem !important;
    }
    .w-md {
      height: 19rem !important;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .h-scroll {
      height: 10.6rem !important;
    }
    .w-xs {
      height: 21.2rem !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .h-scroll {
      height: 15rem !important;
    }
    .w-xs {
      height: 30rem !important;
    }
    .m-b {
      margin-bottom: 1rem;
    }
    .dealerInformation {
      .dealerInformation_header {
        padding: 1rem 1rem 0 1rem;
        margin-bottom: 1rem;
        .dealerInformation_header_box {
          display: none;
        }
        .dealerInformation_header_buttons {
          display: block;
        }
        .dealerInformation_header_content {
          display: none;
        }
      }
      .dealerInformation_bottom {
        padding: 1rem 1rem 0 1rem;
        margin-bottom: 2.5rem;
        display: block;
        .dealerInformation_header_box {
          width: 100%;
          h2 {
            margin-bottom: 0.6rem;
            font-size: 2rem;
            font-weight: 500;
            color: rgba(31, 182, 237, 1);
            line-height: 2.8rem;
            em {
              margin-left: 0.6rem;
              display: inline-block;
              padding: 0.4rem 0.7rem;
              background: rgba(233, 99, 67, 1);
              border-radius: 3px;
              font-size: 1rem;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: 1.2rem;
            }
          }
          p {
            font-size: 1.3rem;
            color: rgba(134, 134, 134, 1);
            line-height: 2.1rem;
          }
        }
        .dealerInformation_header_contents {
          .dealerInformation_header_content_input {
            margin-top: 1rem;
            p {
              font-size: 1.3rem;
              font-weight: 500;
              color: rgba(61, 61, 61, 1);
              line-height: 1.8rem;
              margin-bottom: 0.8rem;
            }
            .el-input {
              width: 100%;
              height: 4.6rem;
            }
            .el-input__inner {
              width: 100%;
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
          .dealerInformation_header_content_button {
            margin-top: 1rem;
            display: none;
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
  }
}
</style>
