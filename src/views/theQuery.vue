<template>
  <div class="contents">
    <!-- 點數 -->
    <el-card v-if="active != 3 && active != 4 && active != 5">
      <el-row>
        <el-col :md="12" :lg="14">
          <span>剩餘點數 <em @click="toSetPoint()">如何集點？</em></span>
          <h1>{{ Points }}<span>點</span></h1>
          <p>收集點數可以換獎品 Collect points for prizes</p>
        </el-col>
        <el-col :md="12" :lg="10">
          <div class="btn">
            <div
              :class="active == 0 ? 'spanActive' : ''"
              class="item item-1"
              @click="activeClick(0)"
            >
              <img src="@/assets/imgs/ExchangeMall.png" alt="" />
            </div>
            <div
              :class="active == 1 ? 'spanActive' : ''"
              class="item item-2"
              @click="activeClick(1)"
            >
              <img src="@/assets/imgs/latestEvents.png" alt="" />
            </div>
          </div>
          <span :class="active == 2 ? 'spanActive' : ''" @click="activeClick(2)"
            >兌換記錄</span
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 點數 -->
    <!-- 搜索框 -->
    <div class="MemberSearch">
      <div class="search-box">
        <i class="el-icon-search" @click="SearchClick()"></i>
        <input v-model="searchValue" placeholder="請您輸入關鍵字" />
        <div class="search-box-button" @click="SearchClick()">搜索</div>
      </div>
    </div>
    <!-- 搜索框 -->
    <!-- 詳情頁 -->
    <div class="task">
      <div class="tabs" v-if="active == 0">
        <span>商品兌換</span>
      </div>
      <!-- 兌換商城 -->
      <el-row v-if="active == 0" :gutter="20">
        <el-col
          :md="12"
          :xs="24"
          v-for="(item, index) in ExchangeMallList"
          :key="index"
        >
          <div class="ExchangeMall">
            <div class="ExchangeMall_img" @click="openProductDetails(item)">
              <img :src="item.imgs" alt="" />
            </div>
            <div class="ExchangeMall_content" @click="openProductDetails(item)">
              <h2>{{ item.title }}</h2>
              <h3>IB幣：{{ item.price }}</h3>
            </div>
            <div
              class="ExchangeMall_button"
              @click="CommodityExchange(item.price)"
            >
              兌換
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 最新活動 -->
      <el-row v-if="active == 1" :gutter="20">
        <el-col
          :md="12"
          :xs="24"
          v-for="(item, index) in latestEventsList"
          :key="index"
        >
          <div class="latestEvents">
            <div class="latestEvents_img" @click="openActivityDetails(item)">
              <img :src="item.imgs" alt="" />
            </div>
            <div
              class="latestEvents_content"
              @click="openActivityDetails(item)"
            >
              <h2>{{ item.title }}</h2>
              <h3>{{ item.price }}</h3>
            </div>
            <div
              v-if="item.status == 1"
              class="latestEvents_button"
              @click="ActivityClaimClick(item.price)"
            >
              領取
            </div>
            <div v-if="item.status == 0" class="latestEvents_buttons">
              已領取
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 兌換記錄 -->
      <el-row v-if="active == 2">
        <el-col
          :md="24"
          v-for="(item, index) in ExchangeRecordList"
          :key="index"
        >
          <div class="ExchangeRecord" @click="ExchangeRecordCLick(item)">
            <div v-if="!item.status" class="ExchangeRecordActive"></div>
            <div class="ExchangeRecord_img">
              <img :src="item.imgs" alt="" />
            </div>
            <div
              class="ExchangeRecord_content"
              :class="!item.status ? 'ExchangeRecord_contents' : ''"
            >
              <h2>{{ item.title }}</h2>
              <h3 v-if="item.CouponNumber">
                優惠價編號：{{ item.CouponNumber }}
              </h3>
            </div>
            <div class="ExchangeRecord_button">兌換期限：{{ item.time }}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 兌換商城詳情 -->
      <el-row v-if="active == 3 && !SearchSatatus">
        <el-col :md="24">
          <div class="productDetails">
            <div class="productDetails_header">
              <div class="productDetails_img">
                <img :src="ExchangeMallDetails.imgs" alt="" />
              </div>
              <div class="productDetails_content">
                <h2>{{ ExchangeMallDetails.title }}</h2>
                <h3>IB幣：{{ ExchangeMallDetails.price }}</h3>
              </div>
              <div class="productDetails_button">
                <div class="productDetails_button_left" @click="active = 0">
                  我知道了
                </div>
                <div
                  class="productDetails_button_right"
                  @click="CommodityExchange(ExchangeMallDetails.price)"
                >
                  兌換
                </div>
              </div>
            </div>
            <div class="productDetails_bottom">
              <h2 v-html="ExchangeMallDetails.details"></h2>
              <p v-html="ExchangeMallDetails.Precautions"></p>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 最新活動詳情 -->
      <el-row v-if="active == 4 && !SearchSatatus">
        <el-col :md="24">
          <div class="activityDetails">
            <div class="activityDetails_header">
              <div class="activityDetails_img">
                <img :src="latestEventsDetails.imgs" alt="" />
              </div>
              <div class="activityDetails_content">
                <h2>{{ latestEventsDetails.title }}</h2>
                <h3>{{ latestEventsDetails.price }}</h3>
              </div>
              <div
                class="activityDetails_button"
                v-if="latestEventsDetails.status == 1"
              >
                <div class="activityDetails_button_left" @click="active = 1">
                  我知道了
                </div>
                <div
                  class="activityDetails_button_right"
                  @click="ActivityClaimClick(latestEventsDetails.price)"
                >
                  領取
                </div>
              </div>
              <div
                class="activityDetails_buttons"
                v-if="latestEventsDetails.status == 0"
              >
                <div class="activityDetails_button_left" @click="active = 1">
                  我知道了
                </div>
                <div>
                  <div
                    v-if="latestEventsDetails.couponStatus == 0"
                    class="activityDetails_buttons_false"
                    @click="couponClick(latestEventsDetails.price)"
                  >
                    使用優惠卷
                  </div>
                  <div
                    v-if="latestEventsDetails.couponStatus == 1"
                    class="activityDetails_buttons_true"
                  >
                    優惠卷已使用
                  </div>
                  <p v-if="latestEventsDetails.couponStatus == 1">
                    無法再次使用此折扣
                  </p>
                </div>
              </div>
            </div>
            <div class="activityDetails_bottom">
              <h2>{{ latestEventsDetails.details }}</h2>
              <p v-html="latestEventsDetails.Precautions"></p>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 兌換記錄詳情 -->
      <el-row v-if="active == 5 && !SearchSatatus">
        <el-col :md="24">
          <div class="activityDetails">
            <div class="activityDetails_header">
              <div class="activityDetails_img">
                <img :src="ExchangeRecordDetails.imgs" alt="" />
              </div>
              <div class="activityDetails_content">
                <h2>{{ ExchangeRecordDetails.title }}</h2>
                <!-- <h3>{{ExchangeRecordDetails.price}}</h3> -->
              </div>
              <div class="activityDetails_buttons">
                <div class="activityDetails_button_left" @click="active = 2">
                  我知道了
                </div>
                <div>
                  <div
                    v-if="
                      ExchangeRecordDetails.status &&
                        ExchangeRecordDetails.type == 1
                    "
                    class="activityDetails_buttons_false"
                    @click="ExchangeRecordClick()"
                  >
                    已拿到實體產品
                  </div>
                  <div
                    v-if="
                      ExchangeRecordDetails.status &&
                        ExchangeRecordDetails.type == 0 &&
                        ExchangeRecordDetails.couponStatus == 0
                    "
                    class="activityDetails_buttons_false"
                    @click="couponClick(ExchangeRecordDetails.price)"
                  >
                    使用優惠卷
                  </div>
                  <div
                    v-if="
                      !ExchangeRecordDetails.status &&
                        ExchangeRecordDetails.type == 0 &&
                        ExchangeRecordDetails.couponStatus == 1
                    "
                    class="activityDetails_buttons_true"
                  >
                    優惠卷已使用
                  </div>
                  <p
                    v-if="
                      !ExchangeRecordDetails.status &&
                        ExchangeRecordDetails.type == 0 &&
                        ExchangeRecordDetails.couponStatus == 1
                    "
                  >
                    無法再次使用此折扣
                  </p>
                </div>
              </div>
            </div>
            <div class="activityDetails_bottom">
              <h2
                v-if="ExchangeRecordDetails.type == 1"
                v-html="ExchangeRecordDetails.details"
              ></h2>
              <h2 v-else>{{ ExchangeRecordDetails.details }}</h2>
              <p v-html="ExchangeRecordDetails.Precautions"></p>
              <h4 v-if="ExchangeRecordDetails.type == 1">
                {{ ExchangeRecordDetails.coupon }}
              </h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 詳情頁 -->
    <!-- 最新活動無數據 -->
    <el-card
      class="noDataStyle"
      v-if="active == 1 && latestEventsList.length == 0 && !SearchStatus"
    >
      <img src="@/assets/imgs/noData.png" alt="" />
      <p>尚未開放·敬請期待</p>
    </el-card>
    <!-- 兌換商城無數據 -->
    <el-card
      class="noDataStyle"
      v-if="active == 0 && ExchangeMallList.length == 0 && !SearchStatus"
    >
      <img src="@/assets/imgs/noData.png" alt="" />
      <p>尚無商品</p>
    </el-card>
    <!-- 兌換記錄無數據 -->
    <el-card
      class="noDataStyle"
      v-if="active == 0 && ExchangeRecordList.length == 0 && !SearchStatus"
    >
      <img src="@/assets/imgs/noData.png" alt="" />
      <p>尚無兌換券</p>
    </el-card>
    <!-- 查詢無數據 -->
    <el-card class="noDataStyle" v-if="SearchStatus">
      <img src="@/assets/imgs/noData.png" alt="" />
      <p>查無此關鍵字</p>
      <div @click="BackToList()">返回列表</div>
    </el-card>

    <!-- 商品兌換彈窗 -->
    <PopUps
      :isDialogShow="CommodityExchangeStatus"
      modyType="1"
      :noShowClick="CommodityExchangeClose"
      :submitClick="CommodityExchangeSubmit"
    ></PopUps>
    <!-- 商品兌換成功彈窗 -->
    <PopUps
      :isDialogShow="SuccessfulRedemptionStatus"
      modyType="2"
      :noShowClick="SuccessfulRedemptionClose"
    ></PopUps>
    <!-- 商品兌換失敗彈窗 -->
    <PopUps
      :isDialogShow="ErrorfulRedemptionStatus"
      modyType="3"
      :noShowClick="ErrorfulRedemptionClose"
    ></PopUps>

    <!-- 活動領取彈窗 輸入推薦碼 -->
    <PopUp
      :isDialogShow="ActivityClaimStatus"
      modyType="0"
      :noShowClick="ActivityClaimClose"
      :submitClick="ActivityClaimSubmit"
    >
      <template v-slot:body>
        <h3>請輸入推薦碼</h3>
        <input
          type="text"
          v-model="ReferralCode"
          placeholder="請輸入您的推薦碼"
        />
        <em v-if="ReferralCodeStatus"><i></i>無效推薦碼</em>
      </template>
    </PopUp>
    <!-- 活動領取成功彈窗 -->
    <PopUp
      :isDialogShow="ActivityClaimSuccessStatus"
      modyType="1"
      :noShowClick="ActivityClaimSuccessClose"
    ></PopUp>
    <!-- 使用優惠價彈窗 輸入店號 -->
    <PopUp
      :isDialogShow="couponStatus"
      modyType="0"
      :noShowClick="couponClose"
      :submitClick="couponSubmit"
    >
      <template v-slot:body>
        <h3>請由店家輸入店號</h3>
        <input type="text" v-model="CouponNumber" placeholder="請輸入店號" />
        <em v-if="CouponNumberStatus"><i></i>無效店號</em>
      </template>
    </PopUp>

    <!-- 已確認收貨彈窗彈窗 -->
    <PopUpss
      :isDialogShow="ConfirmReceiptStatus"
      modyType="1"
      :noShowClick="ConfirmReceiptClose"
      :submitClick="ConfirmReceiptSubmit"
    ></PopUpss>

    <!-- 分頁彈窗 -->
    <pagination
      v-if="active == 0 || active == 1 || active == 2"
      :currentpage="offset"
      :pagesize="limit"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :isHidePage="true"
    ></pagination>
  </div>
</template>

<script>
import storage from "./../storage";
import PopUp from "@/components/PopUp/PopUp";
import PopUps from "@/components/PopUp/PopUps";
import PopUpss from "@/components/PopUp/PopUpss";
import Pagination from "@/components/Pagination";
export default {
  components: {
    PopUp,
    PopUps,
    PopUpss,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 4,
      total: 6,
      // 搜索狀態
      SearchSatatus: false,
      // 邀請碼輸入框值
      ReferralCode: "",
      // 邀請碼輸入框異常
      ReferralCodeStatus: false,
      // 店號輸入框值
      CouponNumber: "",
      // 店號輸入框異常
      CouponNumberStatus: false,
      // 已確認收貨彈窗
      ConfirmReceiptStatus: false,
      // 活動領取彈窗
      ActivityClaimStatus: false,
      // 活動領取成功彈窗
      ActivityClaimSuccessStatus: false,
      // 使用優惠價彈窗
      couponStatus: false,
      // 商品兌換彈窗
      CommodityExchangeStatus: false,
      // 兌換成功彈窗
      SuccessfulRedemptionStatus: false,
      // 兌換失敗彈窗
      ErrorfulRedemptionStatus: false,
      isShowReplace: false,
      // 等於0時為【兌換商品】
      // 等於1時為【最新活動】
      // 等於2時為【兌換記錄】
      // 等於3時為【商品詳情】
      // 等於4時為【活動詳情】
      active: 1,
      SearchStatus: false,
      searchValue: "",
      Points: 366,
      ExchangeMallList: [
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0230一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0231一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product2.png"),
          title: "P0670一年份濾心",
          price: 300,
          details:
            "提供P0670一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0670一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product3.png"),
          title: "P0680一年份濾心",
          price: 300,
          details:
            "提供P0680一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0680一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0211 PP濾心，成份：聚丙烯，共兩支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        }
      ],
      ExchangeMallListOne: [
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0230一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0231一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product2.png"),
          title: "P0670一年份濾心",
          price: 300,
          details:
            "提供P0670一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0670一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product3.png"),
          title: "P0680一年份濾心",
          price: 300,
          details:
            "提供P0680一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0680一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0211 PP濾心，成份：聚丙烯，共兩支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        }
      ],
      ExchangeMallListTwo: [
        {
          imgs: require("@/assets/imgs/product5.png"),
          title: "P0681一年份濾心",
          price: 300,
          details:
            "提供P0681一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0681一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0221 前置樹脂濾心，成份：無鈉型離子交換樹脂，共三支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product3.png"),
          title: "P0780一年份濾心",
          price: 300,
          details:
            "提供P0780一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0780一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0271 前置樹脂濾心，成份：無鈉型離子交換樹脂，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        }
      ],
      ExchangeMallValue: "",
      ExchangeMallDetails: {},
      latestEventsList: [
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 0,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 0
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 0,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 1,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 1,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        }
      ],
      latestEventsDetails: {},
      ExchangeRecordList: [
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          time: "2020年12月05日",
          status: true,
          type: 0,
          CouponNumber: "",
          couponStatus: 0
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0230一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
          time: "2020年07月05日",
          status: true,
          type: 1,
          CouponNumber: "AAA95987",
          couponStatus: 1,
          coupon: "您已於2020/07/05兌換此項目，近期將由專人與您聯繫。"
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          time: "2020年12月05日",
          status: false,
          type: 0,
          CouponNumber: "AAA95987",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0231一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
          time: "2020年07月08日",
          status: false,
          type: 1,
          CouponNumber: "AAA95987",
          couponStatus: 1,
          coupon: "您已於2020/07/08 收到此兌換項目"
        }
      ],
      ExchangeRecordDetails: {},
      // 當前登錄用戶的推薦碼
      ShareCode: storage.getItem("userName").ShareCode
    };
  },
  methods: {
    // 分頁變動
    handleCurrentChange(e) {
      if (this.active == 0) {
        if (e == 1) {
          this.ExchangeMallList = this.ExchangeMallListOne;
        } else if (e == 2) {
          this.ExchangeMallList = this.ExchangeMallListTwo;
        }
      }
    },
    // 已拿到實體產品
    ExchangeRecordClick() {
      this.ConfirmReceiptStatus = true;
    },
    // 已拿到實體產品彈窗關閉
    ConfirmReceiptClose() {
      this.ConfirmReceiptStatus = false;
    },
    // 已拿到實體產品確認彈窗關閉
    ConfirmReceiptSubmit() {
      this.ConfirmReceiptStatus = false;
    },
    // 兌換記錄詳情
    ExchangeRecordCLick(item) {
      this.ExchangeRecordDetails = item;
      this.active = 5;
    },
    // 使用優惠卷
    couponClick() {
      this.couponStatus = true;
    },
    // 使用優惠卷彈窗關閉
    couponClose() {
      this.CouponNumber = "";
      this.CouponNumberStatus = false;
      this.couponStatus = false;
    },
    // 使用優惠卷確認彈窗關閉
    couponSubmit() {
      if (this.CouponNumber != "666666") {
        this.CouponNumberStatus = true;
        return false;
      }
      this.CouponNumber = "";
      this.CouponNumberStatus = false;
      this.couponStatus = false;
    },
    // 查看活動詳情
    openActivityDetails(item) {
      this.active = 4;
      this.latestEventsDetails = item;
    },
    // 活動領取成功彈窗關閉
    ActivityClaimSuccessClose() {
      this.ActivityClaimSuccessStatus = false;
    },
    // 活動領取
    ActivityClaimClick() {
      this.ActivityClaimStatus = true;
    },
    // 活動領取取消彈窗關閉
    ActivityClaimClose() {
      this.ReferralCode = "";
      this.ReferralCodeStatus = false;
      this.ActivityClaimStatus = false;
    },
    // 活動領取確認彈窗關閉
    ActivityClaimSubmit() {
      if (this.ReferralCode != this.ShareCode) {
        this.ReferralCodeStatus = true;
        return false;
      }
      this.ReferralCode = "";
      this.ReferralCodeStatus = false;
      this.ActivityClaimStatus = false;
      this.ActivityClaimSuccessStatus = true;
    },
    // 查看商品詳情
    openProductDetails(item) {
      this.active = 3;
      this.ExchangeMallDetails = item;
    },
    // 商品兌換
    CommodityExchange(value) {
      this.ExchangeMallValue = value;
      this.CommodityExchangeStatus = true;
    },
    // 商品兌換取消彈窗關閉
    CommodityExchangeClose() {
      this.CommodityExchangeStatus = false;
    },
    // 商品兌換確認彈窗關閉
    CommodityExchangeSubmit() {
      this.CommodityExchangeStatus = false;
      if (this.ExchangeMallValue > this.Points) {
        this.ErrorfulRedemptionStatus = true;
      } else {
        this.SuccessfulRedemptionStatus = true;
      }
    },
    // 商品兌換成功彈窗關閉
    SuccessfulRedemptionClose() {
      this.SuccessfulRedemptionStatus = false;
      this.active = 5;
      this.ExchangeRecordDetails = {
        imgs: require("@/assets/imgs/product6.png"),
        title: "P0230一年份濾心(無RO膜)",
        price: 300,
        details:
          "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
        Precautions:
          "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
        time: "2020年07月05日",
        status: true,
        type: 1,
        CouponNumber: "AAA95987",
        couponStatus: 1,
        coupon: "您已於2020/07/05兌換此項目，近期將由專人與您聯繫。"
      };
    },
    // 商品兌換失敗彈窗關閉
    ErrorfulRedemptionClose() {
      this.ErrorfulRedemptionStatus = false;
    },
    // 查詢為空返回列表
    BackToList() {
      this.SearchSatatus = false;
      if (this.active == 3) {
        this.activeClick(0);
      } else if (this.active == 4) {
        this.activeClick(1);
      } else if (this.active == 5) {
        this.activeClick(2);
      } else {
        this.activeClick(this.active);
      }
    },
    // 搜索
    SearchClick() {
      if (this.searchValue) {
        this.SearchStatus = true;
        if (this.active == 0) {
          this.ExchangeMallList = [];
        } else if (this.active == 1) {
          this.latestEventsList = [];
        } else if (this.active == 2) {
          this.ExchangeRecordList = [];
        } else {
          this.SearchSatatus = true;
        }
      } else {
        this.SearchStatus = false;
        this.ExchangeMallList = [
          {
            imgs: require("@/assets/imgs/product6.png"),
            title: "P0230一年份濾心(無RO膜)",
            price: 300,
            details:
              "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
          },
          {
            imgs: require("@/assets/imgs/product6.png"),
            title: "P0231一年份濾心(無RO膜)",
            price: 300,
            details:
              "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
          },
          {
            imgs: require("@/assets/imgs/product2.png"),
            title: "P0670一年份濾心",
            price: 300,
            details:
              "提供P0670一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0670一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
          },
          {
            imgs: require("@/assets/imgs/product3.png"),
            title: "P0680一年份濾心",
            price: 300,
            details:
              "提供P0680一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0680一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0211 PP濾心，成份：聚丙烯，共兩支。",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
          }
        ];
        this.latestEventsList = [
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            status: 0,
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            couponStatus: 0
          },
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            status: 0,
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            couponStatus: 1
          },
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            status: 1,
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            couponStatus: 1
          },
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            status: 1,
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            couponStatus: 1
          }
        ];
        this.ExchangeRecordList = [
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            time: "2020年12月05日",
            status: true,
            type: 0,
            CouponNumber: "",
            couponStatus: 0
          },
          {
            imgs: require("@/assets/imgs/product6.png"),
            title: "P0230一年份濾心(無RO膜)",
            price: 300,
            details:
              "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
            time: "2020年07月05日",
            status: true,
            type: 1,
            CouponNumber: "AAA95987",
            couponStatus: 1,
            coupon: "您已於2020/07/05兌換此項目，近期將由專人與您聯繫。"
          },
          {
            imgs: require("@/assets/imgs/product1.jpg"),
            title: "揪水友 趁新鮮",
            price: "2019.01.02~2020.03.05",
            details:
              "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
            Precautions:
              " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
            time: "2020年12月05日",
            status: false,
            type: 0,
            CouponNumber: "AAA95987",
            couponStatus: 1
          },
          {
            imgs: require("@/assets/imgs/product6.png"),
            title: "P0231一年份濾心(無RO膜)",
            price: 300,
            details:
              "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
            Precautions:
              "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
            time: "2020年07月08日",
            status: false,
            type: 1,
            CouponNumber: "AAA95987",
            couponStatus: 1,
            coupon: "您已於2020/07/08 收到此兌換項目"
          }
        ];
      }
    },
    // 如何集點跳轉
    toSetPoint() {
      this.$router.push({ name: "SetPoint" });
    },
    // 列表切換
    activeClick(index) {
      this.SearchStatus = false;
      this.searchValue = "";
      this.active = index;
      this.ExchangeMallList = [
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0230一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0231一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product2.png"),
          title: "P0670一年份濾心",
          price: 300,
          details:
            "提供P0670一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0670一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        },
        {
          imgs: require("@/assets/imgs/product3.png"),
          title: "P0680一年份濾心",
          price: 300,
          details:
            "提供P0680一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0680一年份濾心」內容物包含：<br />1.F0231 複合式濾心，成份：活性碳纖維，共一支。<br />2.F0211 PP濾心，成份：聚丙烯，共兩支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />"
        }
      ];
      this.latestEventsList = [
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 0,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 0
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 0,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 1,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          status: 1,
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          couponStatus: 1
        }
      ];
      this.ExchangeRecordList = [
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          time: "2020年12月05日",
          status: true,
          type: 0,
          CouponNumber: "",
          couponStatus: 0
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0230一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0230一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br /> ※「P0230一年份濾心(無RO膜)」內容物包含：<br /> 1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。<br />",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
          time: "2020年07月05日",
          status: true,
          type: 1,
          CouponNumber: "AAA95987",
          couponStatus: 1,
          coupon: "您已於2020/07/05兌換此項目，近期將由專人與您聯繫。"
        },
        {
          imgs: require("@/assets/imgs/product1.jpg"),
          title: "揪水友 趁新鮮",
          price: "2019.01.02~2020.03.05",
          details:
            "一年內不管要换幾次濾心樱花都幫你换I凡購買指定機種，還享獨家優惠",
          Precautions:
            " 注意事項:<br />1.本公司保有最終更改決定權。<br />2.台北信羲.桃概第一航廈等門市不提供兌换服務。",
          time: "2020年12月05日",
          status: false,
          type: 0,
          CouponNumber: "AAA95987",
          couponStatus: 1
        },
        {
          imgs: require("@/assets/imgs/product6.png"),
          title: "P0231一年份濾心(無RO膜)",
          price: 300,
          details:
            "提供P0231一整年份所需的濾心，維持家中淨水器的飲用水水質健康。<br />※「P0231一年份濾心(無RO膜)」內容物包含：<br />1.F0191RO淨水器專用濾心組(一年份3支入)<br />*F0161 複合式濾心，成份：聚丙烯+活性碳纖維，共兩支。<br />*F0151 後置活性碳濾心，成份：椰殼顆粒活性碳，共一支。",
          Precautions:
            "注意事項:<br />1.本項目在確認兌換後，並扣除所需點數300點，即會自動通知專人與您聯繫。<br />2.本項目於兌換後不可任意更換兌換內容物。<br />3.本項目於點數扣除後無法復原。<br />4.本項目僅適用於淨水管家使用，無法於實體通路進行兌換。<br />5.本項目兌換次數僅限一次，不得重複兌換及使用。<br />6.相關櫻花點數商城辦法請至淨水管家的會員權益須知。<br />",
          time: "2020年07月08日",
          status: false,
          type: 1,
          CouponNumber: "AAA95987",
          couponStatus: 1,
          coupon: "您已於2020/07/08 收到此兌換項目"
        }
      ];
    },
    isClickTask() {
      this.isShowReplace = true;
    },
    ClickReplace() {
      this.isShowReplace = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/mixin.scss";
.MemberSearch {
  width: 100%;
  display: flex;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 40px;
  margin-top: 40px;
  .search-box {
    width: 100%;
    position: relative;
    .el-icon-search {
      position: absolute;
      left: 2.8rem;
      top: 2.1rem;
      font-size: 1.4rem;
      color: #bdbdbd;
      cursor: pointer;
    }
    input {
      padding-left: 5.5rem;
      padding-right: 8.1rem;
      width: 100%;
      height: 5.6rem;
      background: none;
      outline: none;
      border: 0px;
      color: rgba(189, 189, 189, 1);
    }
    input::-webkit-input-placeholder {
      color: rgba(189, 189, 189, 1);
    }
    .search-box-button {
      position: absolute;
      right: 4rem;
      top: 2rem;
      font-size: 1.4rem;
      font-family: Helvetica;
      color: rgba(61, 61, 61, 1);
      line-height: 1.6rem;
      cursor: pointer;
    }
  }
}
.noDataStyle {
  padding: 7.5rem 0;
  text-align: center;
  img {
    width: 8.5rem;
    height: 6.6rem;
  }
  p {
    margin-top: 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(134, 134, 134, 1);
    line-height: 2rem;
  }
  div {
    margin: 4rem auto 0;
    width: 17.2rem;
    height: 4.8rem;
    background: rgba(226, 247, 255, 1);
    box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.1);
    border-radius: 6px;
    border: 2px solid rgba(31, 182, 237, 1);
    font-size: 1.4rem;
    color: rgba(31, 182, 237, 1);
    line-height: 4.8rem;
    text-align: center;
  }
}
.contents {
  .el-card {
    border-radius: 1rem;
    .el-row {
      position: relative;
      margin: 1.5rem;
    }
    .el-col:first-child {
      span {
        line-height: 2.4rem;
        font-size: 1.7rem;
        font-weight: 500;
        color: #868686;
        em {
          margin-left: 2rem;
          font-size: 1.2rem;
          color: rgba(31, 182, 237, 1);
          line-height: 1.7rem;
          text-decoration: underline;
        }
      }
      h1 {
        line-height: 5.6rem;
        font-size: 4rem;
        font-weight: 700;
        color: #3d3d3d;
        span {
          font-size: 1.4rem;
          margin-left: 1rem;
          font-weight: 700;
          color: #3d3d3d;
        }
      }
      p {
        line-height: 1.7rem;
        margin-top: 1.8rem;
        font-size: 1.2rem;
        color: #bdbdbd;
      }
    }
    .el-col:last-child {
      .btn {
        /*   display: flex;
        justify-content: space-between */
        @include flex(flex-end);
        .item {
          @include flex();
          width: 11rem;
          height: 3.6rem;
          //  border-radius: .6rem;
          //  border: .2rem solid #1FB6ED;
          font-size: 1.6rem;
          font-weight: 700;
          img {
            width: 100%;
          }
        }
        .item-1 {
          // background: #E2F7FF;
          // color: #1FB6ED;
          margin-right: 2rem;
        }
        // .item-2 {
        //   // background: #1FB6ED;
        //   // color: #fff;
        // }
      }
      span {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 11rem;
        height: 3.6rem;
        background: rgba(226, 247, 255, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.1);
        border-radius: 2.3rem;
        border: 2px solid rgba(31, 182, 237, 1);
        font-size: 1.4rem;
        color: rgba(31, 182, 237, 1);
        line-height: 3.6rem;
        text-align: center;
      }
      .spanActive {
        opacity: 0.2;
      }
    }
  }
  .task {
    margin-top: 3.4rem;
    .tabs {
      margin-bottom: 1.5rem;
      span {
        font-size: 2.2rem;
        font-weight: 500;
        color: rgba(61, 61, 61, 1);
        line-height: 3rem;
      }
      span:first-of-type {
        margin-right: 1.5rem;
      }
      .active {
        font-size: 2.2rem;
        color: #3d3d3d;
      }
    }
    .ExchangeMall {
      margin-bottom: 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 1.5rem !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      .ExchangeMall_img {
        width: 8rem;
        height: 8rem;
        background: rgba(243, 243, 245, 1);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 8rem;
          max-height: 8rem;
        }
      }
      .ExchangeMall_content {
        padding-left: 1rem;
        width: 14rem;
        h2 {
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(61, 61, 61, 1);
          line-height: 2rem;
          display: block;
          height: 4rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 2rem;
        }
        h3 {
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(238, 151, 2, 1);
          line-height: 2rem;
        }
      }
      .ExchangeMall_button {
        cursor: pointer;
        margin-left: auto;
        width: 8.6rem;
        height: 3.8rem;
        background: rgba(31, 182, 237, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
        border-radius: 6px;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 3.8rem;
        text-align: center;
      }
    }
    .latestEvents {
      margin-bottom: 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 1.5rem !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      .latestEvents_img {
        width: 8rem;
        height: 8rem;
        background: rgba(243, 243, 245, 1);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 8rem;
          max-height: 8rem;
        }
      }
      .latestEvents_content {
        padding-left: 1rem;
        width: 14rem;
        h2 {
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(61, 61, 61, 1);
          line-height: 2rem;
          display: block;
          height: 4rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 2rem;
        }
        h3 {
          font-size: 1.2rem;
          font-weight: 500;
          color: rgba(238, 151, 2, 1);
          line-height: 2rem;
        }
      }
      .latestEvents_button {
        cursor: pointer;
        margin-left: auto;
        width: 8.6rem;
        height: 3.8rem;
        background: rgba(31, 182, 237, 1);
        box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
        border-radius: 6px;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 3.8rem;
        text-align: center;
      }
      .latestEvents_buttons {
        margin-left: auto;
        width: 8.6rem;
        height: 3.8rem;
        background: rgba(240, 241, 243, 1);
        border-radius: 6px;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(189, 189, 189, 1);
        line-height: 3.8rem;
        text-align: center;
      }
    }
    .ExchangeRecord {
      position: relative;
      margin-bottom: 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 2rem 4rem !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      .ExchangeRecordActive {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(100, 100, 100, 0.2);
        border-radius: 1rem;
      }
      .ExchangeRecord_img {
        width: 8rem;
        height: 8rem;
        background: rgba(243, 243, 245, 1);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 8rem;
          max-height: 8rem;
        }
      }
      .ExchangeRecord_content {
        padding-left: 1rem;
        width: calc(100% - 27rem);
        h2 {
          font-size: 1.4rem;
          font-weight: 500;
          color: rgba(61, 61, 61, 1);
          line-height: 2rem;
          display: block;
          height: 4rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 2rem;
        }
        h3 {
          font-size: 1.2rem;
          color: rgba(189, 189, 189, 1);
          line-height: 2rem;
        }
      }
      .ExchangeRecord_contents {
        h2 {
          color: rgba(189, 189, 189, 1);
        }
      }
      .ExchangeRecord_button {
        margin-left: auto;
        font-size: 1.2rem;
        color: rgba(189, 189, 189, 1);
        line-height: 1.7rem;
      }
    }
    .productDetails {
      margin-bottom: 2rem;
      cursor: pointer;
      padding: 3rem 3rem !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      .productDetails_header {
        display: flex;
        align-items: center;
        .productDetails_img {
          width: 8rem;
          height: 8rem;
          background: rgba(243, 243, 245, 1);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 8rem;
            max-height: 8rem;
          }
        }
        .productDetails_content {
          padding-left: 1rem;
          width: calc(100% - 37rem);
          h2 {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(61, 61, 61, 1);
            line-height: 2rem;
            display: block;
            height: 4rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 2rem;
          }
          h3 {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(238, 151, 2, 1);
            line-height: 2rem;
          }
        }
        .productDetails_button {
          margin-left: auto;
          display: flex;
          .productDetails_button_left {
            margin-right: 2rem;
            width: 12rem;
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
            width: 12rem;
            height: 4.6rem;
            background: rgba(31, 182, 237, 1);
            box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.1);
            border-radius: 0.6rem;
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 4.6rem;
            text-align: center;
          }
        }
      }
      .productDetails_bottom {
        h2 {
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
          color: rgba(61, 61, 61, 1);
          line-height: 1.7rem;
        }
        p {
          font-size: 1.1rem;
          color: rgba(189, 189, 189, 1);
          line-height: 2.2rem;
        }
      }
    }
    .activityDetails {
      margin-bottom: 2rem;
      cursor: pointer;
      padding: 3rem 3rem !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 1rem;
      .activityDetails_header {
        display: flex;
        align-items: center;
        .activityDetails_img {
          width: 8rem;
          height: 8rem;
          background: rgba(243, 243, 245, 1);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 8rem;
            max-height: 8rem;
          }
        }
        .activityDetails_content {
          padding-left: 1rem;
          width: calc(100% - 37rem);
          h2 {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(61, 61, 61, 1);
            line-height: 2rem;
            display: block;
            height: 4rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 2rem;
          }
          h3 {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(238, 151, 2, 1);
            line-height: 2rem;
          }
        }
        .activityDetails_button {
          margin-left: auto;
          display: flex;
          .activityDetails_button_left {
            margin-right: 2rem;
            width: 12rem;
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
          .activityDetails_button_right {
            width: 12rem;
            height: 4.6rem;
            background: rgba(31, 182, 237, 1);
            box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.1);
            border-radius: 0.6rem;
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 4.6rem;
            text-align: center;
          }
        }
        .activityDetails_buttons {
          margin-left: auto;
          display: flex;
          .activityDetails_button_left {
            margin-right: 2rem;
            width: 12rem;
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
          .activityDetails_buttons_false {
            width: 12rem;
            height: 4.6rem;
            background: rgba(31, 182, 237, 1);
            box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
            border-radius: 6px;
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 4.6rem;
            text-align: center;
          }
          .activityDetails_buttons_true {
            width: 12rem;
            height: 4.6rem;
            background: rgba(240, 241, 243, 1);
            border-radius: 6px;
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(189, 189, 189, 1);
            line-height: 4.6rem;
            text-align: center;
          }
          p {
            margin-top: 1.4rem;
            text-align: center;
            font-size: 1.2rem;
            color: rgba(61, 61, 61, 1);
            line-height: 1.7rem;
            text-decoration: underline;
          }
        }
      }
      .activityDetails_bottom {
        h2 {
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
          color: rgba(61, 61, 61, 1);
          line-height: 1.7rem;
        }
        p {
          font-size: 1.1rem;
          color: rgba(189, 189, 189, 1);
          line-height: 2.2rem;
        }
        h4 {
          margin-top: 2rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: rgba(201, 21, 30, 1);
          line-height: 1.8rem;
          a {
            color: rgba(201, 21, 30, 1);
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media screen and (max-width: 992px) {
    .el-card {
      .el-row {
        .el-col:last-child {
          margin-top: 2rem;
          .btn {
            @include flex(space-between);
          }
          span {
            margin-top: 2rem;
            display: block;
            position: static;
          }
        }
      }
    }
    .task {
      .ExchangeRecord {
        padding: 2rem !important;
        flex-wrap: wrap;
        .ExchangeRecord_content {
          width: calc(100% - 9rem);
        }
        .ExchangeRecord_button {
          margin-top: 2rem;
          margin-left: 0;
        }
      }
      .productDetails {
        .productDetails_header {
          flex-wrap: wrap;
          .productDetails_content {
            width: calc(100% - 9rem);
          }
          .productDetails_button {
            width: 100%;
            margin-top: 2rem;
            margin-left: 0;
            justify-content: space-between;
            .productDetails_button_left {
              margin-right: 0;
            }
          }
        }
      }
      .activityDetails {
        .activityDetails_header {
          flex-wrap: wrap;
          .activityDetails_content {
            width: calc(100% - 9rem);
          }
          .activityDetails_button {
            width: 100%;
            margin-top: 2rem;
            margin-left: 0;
            justify-content: space-between;
            .activityDetails_button_left {
              margin-right: 0;
            }
          }
          .activityDetails_buttons {
            width: 100%;
            margin-top: 2rem;
            margin-left: 0;
            justify-content: space-between;
            .activityDetails_button_left {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
