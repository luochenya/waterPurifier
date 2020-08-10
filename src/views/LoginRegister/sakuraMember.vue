<template>
  <div class="sakuraMember">
    <!-- 顶部logo -->
    <img
      class="sakuraMember_loginLogo"
      src="@/assets/imgs/loginLogo.png"
      alt=""
    />
    <!-- 中间内容 -->
    <div class="sakuraMember_box">
      <img
        class="sakuraMember_box_logo"
        src="@/assets/imgs/sakuraMemberLogo.png"
        alt=""
      />
      <h1 class="sakuraMember_box_h1">
        在登入成為淨水管家VIP前，您必須先確認您購買過台灣櫻花股份有限公司的淨水設備，並且執行過該產品之回
        函卡登錄作業，方能使用完整服務
      </h1>
      <div class="sakuraMember_box_card">
        <div class="sakuraMember_box_card_header">
          <img src="@/assets/imgs/sakuraMemberHeader.png" alt="" />
          <div>
            <p>王大寶您好</p>
            <span>淨水管家VIP用戶</span>
          </div>
        </div>
        <p class="sakuraMember_box_card_addr">
          您的地址：新北市信義區信義路1號
        </p>
        <img
          class="sakuraMember_box_card_img"
          src="@/assets/imgs/sakuraMemberVip.png"
          alt=""
        />
      </div>
      <button class="sakuraMember_box_button">
        下一步
      </button>
      <p class="sakuraMember_box_p">您已經註冊為櫻花好友。不是您本人？</p>
    </div>
    <!-- 底部申明 -->
    <nav-footer class="sakuraMember_navFooter"></nav-footer>
  </div>
</template>
<script>
import NavFooter from "@/components/NavFooter";
export default {
  name: "sakuraMember",
  components: {
    NavFooter
  }
};
</script>
<style lang="scss" scoped>
.sakuraMember {
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/bottomImg.png");
  background-size: 100% 25rem;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  .sakuraMember_loginLogo {
    width: 23.8rem;
    height: 2.4rem;
  }
  .sakuraMember_box {
    margin: 10rem auto 0;
    padding: 5rem 14.3rem 4rem;
    width: 87rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 3rem 12rem 0px rgba(86, 96, 114, 0.06);
    border-radius: 1rem;
    .sakuraMember_box_logo {
      width: 15rem;
      height: 3.7rem;
    }
    .sakuraMember_box_h1 {
      margin-top: 1.4rem;
      margin-bottom: 4rem;
      font-size: 1.2rem;
      color: rgba(134, 134, 134, 1);
      line-height: 1.8rem;
    }
    .sakuraMember_box_card {
      position: relative;
      margin: 0 auto;
      width: 28.7rem;
      height: 15rem;
      padding: 2rem;
      background-image: url("../../assets/imgs/sakuraMemberCard.png");
      background-size: cover;
      background-repeat: no-repeat;
      .sakuraMember_box_card_header {
        display: flex;
        align-items: center;
        img {
          width: 3.2rem;
          height: 3.2rem;
          margin-right: 1rem;
        }
        div {
          text-align: left;
          p {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(255, 224, 196, 1);
            line-height: 2rem;
          }
          span {
            font-size: 0.7rem;
            color: rgba(255, 224, 196, 1);
            line-height: 1.2rem;
          }
        }
      }
      .sakuraMember_box_card_addr {
        position: absolute;
        left: 2rem;
        bottom: 2rem;
        font-size: 1rem;
        color: rgba(255, 224, 196, 1);
        line-height: 1.4rem;
      }
      .sakuraMember_box_card_img {
        position: absolute;
        right: 2rem;
        top: 2rem;
        width: 2.7rem;
        height: 2.5rem;
      }
    }
    .sakuraMember_box_button {
      cursor: pointer;
      margin-top: 5rem;
      margin-bottom: 2rem;
      border: none;
      background-color: transparent;
      outline: none;
      width: 28.7rem;
      height: 5rem;
      background: rgba(31, 182, 237, 1);
      box-shadow: 0px 1.2rem 3rem 0px rgba(1, 181, 240, 0.15);
      border-radius: 0.5rem;
      font-size: 1.6rem;
      color: rgba(255, 255, 255, 1);
      line-height: 5rem;
    }
    .sakuraMember_box_p {
      cursor: pointer;
      font-size: 1.2rem;
      color: rgba(31, 182, 237, 1);
      line-height: 1.7rem;
      text-decoration: underline;
    }
  }
  .sakuraMember_navFooter {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
  }
}
@media screen and (max-width: 992px) {
  .sakuraMember {
    background-size: 100% 30vh;
    .sakuraMember_box {
      margin: 3rem auto 0;
      width: 90%;
      padding: 3rem 5% 2rem;
      .sakuraMember_box_h1 {
        margin-bottom: 2rem;
      }
      .sakuraMember_box_card {
        width: 100%;
      }
      .sakuraMember_box_button {
        margin-top: 3rem;
        width: 100%;
      }
    }
  }
}
</style>
