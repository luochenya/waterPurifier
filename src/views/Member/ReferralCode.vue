<template>
  <div class="ReferralCode">
    <div class="title">
      <h1>推薦碼</h1>
      <span>REFERRAL CODE</span>
    </div>
    <el-card class="ReferralCode_box">
      <div class="ReferralCode_box_shareIt">
        <h1>分享到</h1>
        <div>
          <img src="@/assets/imgs/shareIt1.png" alt="" />
          <img src="@/assets/imgs/shareIt2.png" alt="" />
        </div>
      </div>
      <h1>我的邀請碼</h1>
      <h2>2020年01月23日好友推薦加入櫻花淨水器會員</h2>
      <h3>ONCW2614</h3>
      <div class="ReferralCode_box_content">
        <h4>凡詿冊為會員後，不限濾心更換方式、機型，完成十次更換，即可獲得20001B幣。</h4>
        <p>注意事項:</p>
        <p>1.本公司保有最終更改決定權；</p>
        <p>2.須確保濾心更換時，於本網站上配對完成，若未線上配對直接更換，視同無效。</p>
      </div>
    </el-card>
 </div>
</template>

<script>
export default {
  name: 'ReferralCode',
  data () {
    return {
      
    }
  },
  methods: {
    // 如何集點跳轉
    toTheQuery () {
      this.$router.push({ name: 'theQuery' })
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixin.scss';
.ReferralCode {
  .title {
    margin-bottom: 4rem;
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
  .ReferralCode_box {
    position: relative;
    padding: 2rem;
    .ReferralCode_box_shareIt {
      width: 6.6rem;
      position: absolute;
      right: 4rem;
      top: 4rem;
      h1 {
        font-size:1.2rem;
        color:rgba(134,134,134,1);
        line-height:1.7rem;
        margin-bottom: 1.2rem;
      }
      div {
        display: flex;
        justify-content: space-between;
        img {
          width: 2.2rem;
          height: 2.2rem;
        }
      }
    }
    h1 {
      text-align: center;
      font-size:1.6rem;
      font-weight:bold;
      color:rgba(61,61,61,1);
      line-height:2.2rem;
    }
    h2 {
      margin-top: 0.3rem;
      margin-bottom: 1rem;
      text-align: center;
      font-size:1.1rem;
      color:rgba(134,134,134,1);
      line-height:1.6rem;
    }
    h3 {
      font-size:3.6rem;
      font-family:SFUDINMitAlt;
      color:rgba(31,182,237,1);
      line-height:4.9rem;
      letter-spacing:1px;
      text-align: center;
    }
    .ReferralCode_box_content {
      margin-top: 4.2rem;
      padding: 2rem;
      background:rgba(249,249,250,1);
      border-radius:1rem;
      h4 {
        font-size:1.1rem;
        color:#3D3D3D;
        line-height:2.2rem;
      }
      p {
        font-size:1.1rem;
        color:#868686;
        line-height:2.2rem;
      }
    }
  }
  @media screen and (min-width:992px) and (max-width:1200px) {}
  @media screen and (max-width: 991px) {
    .ReferralCode_box {
      padding: 0;
      .ReferralCode_box_shareIt {
        width: 6rem;
        right: 1rem;
        top: 1rem;
      }
      h1 {
        width: 60%;
        margin: 0 auto;
      }
      h2 {
        width: 60%;
        margin: 0 auto;
      }
      h3 {
        width: 60%;
        margin: 0 auto;
      }
    }
  }
}
</style>
