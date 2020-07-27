<template>
  <div class="SetPoint">
    <div class="title">
      <h1>如何集點</h1>
      <span>MEMBERSHIP SERVICE</span>
    </div>
    <el-card class="SetPoint_box">
      <div class="SetPoint_box_header">
        <img src="@/assets/imgs/SetPoint.png" alt="" />
        <div>
          <h2>如何集點</h2>
          <h3>How to gather points</h3>
        </div>
      </div>
      <div class="SetPoint_box_content">
        <h4>凡詿冊為會員後，不限濾心更換方式、機型，完成十次更換，即可獲得20001B幣。</h4>
        <p>注意事項:</p>
        <p>1.本公司保有最終更改決定權；</p>
        <p>2.須確保濾心更換時，於本網站上配對完成，若未線上配對直接更換，視同無效。</p>
      </div>
      <div class="SetPoint_box_button">
        <div class="SetPoint_box_button_left" @click="toReferralCode()">我的推薦碼</div>
        <div class="SetPoint_box_button_right" @click="toTheQuery()">商品兌換</div>
      </div>
    </el-card>
 </div>
</template>

<script>
export default {
  name: 'SetPoint',
  data () {
    return {
      
    }
  },
  methods: {
    // 跳轉商品兌換
    toTheQuery () {
      this.$router.push({ name: 'theQuery' })
    },
    // 跳轉推薦碼
    toReferralCode () {
      this.$router.push({ name: 'ReferralCode' })
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixin.scss';
.SetPoint {
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
  .SetPoint_box {
    padding: 2rem;
    .SetPoint_box_header {
      margin-bottom: 1.4rem;
      display: flex;
      align-items: center;
      img {
        width: 1.9rem;
        height: 2.8rem;
      }
      div {
        margin-left: 0.5rem;
        h2 {
          font-size:1.6rem;
          font-weight:500;
          color:rgba(61,61,61,1);
          line-height:2.2rem;
        }
        h3 {
          font-size:1rem;
          color:rgba(189,189,189,1);
          line-height:1.4rem;
        }
      }
    }
    .SetPoint_box_content {
      padding: 2rem;
      background:rgba(249,249,250,1);
      border-radius:1rem;
      h4 {
        font-size:1.2rem;
        color:#3D3D3D;
        line-height:2.8rem;
      }
      p {
        font-size:1.2rem;
        color:#868686;
        line-height:2.8rem;
      }
    }
    .SetPoint_box_button {
      margin-top: 5.6rem;
      display: flex;
      justify-content: flex-end;
      .SetPoint_box_button_left {
        width:16.8rem;
        height:4.6rem;
        background:rgba(226,247,255,1);
        box-shadow:0px 1.2rem 3rem 0px rgba(1,181,240,0.1);
        border-radius:6px;
        border:2px solid rgba(31,182,237,1);
        font-size:1.6rem;
        font-weight:500;
        color:rgba(31,182,237,1);
        line-height:4.6rem;
        text-align: center;
        margin-right: 2rem;
      }
      .SetPoint_box_button_right {
        width:16.8rem;
        height:4.6rem;
        background:rgba(31,182,237,1);
        box-shadow:0px 1.2rem 3rem 0px rgba(1,181,240,0.15);
        border-radius:6px;
        font-size:1.6rem;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:4.6rem;
        text-align: center;
      }
    }
  }
  @media screen and (min-width:992px) and (max-width:1200px) {}
  @media screen and (max-width: 991px) {}
}
</style>
