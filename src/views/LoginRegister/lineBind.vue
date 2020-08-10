<template>
  <div class="lineBind">
    <!-- 顶部logo -->
    <img class="lineBind_loginLogo" src="@/assets/imgs/loginLogo.png" alt="" />
    <!-- 中间内容 -->
    <div class="lineBind_box">
      <div class="lineBind_box_div">
        <img
          class="lineBind_box_div_logo"
          src="@/assets/imgs/line.png"
          alt=""
        />
        <i></i>
        <i></i>
        <img
          class="lineBind_box_div_bind"
          src="@/assets/imgs/bind.png"
          alt=""
        />
        <i></i>
        <i></i>
        <img
          class="lineBind_box_div_logo"
          src="@/assets/imgs/sakura.png"
          alt=""
        />
      </div>
      <h1>已將LINE與櫻花淨水管家連動</h1>
      <h2>若您對本服務有任何疑問，請洽專人協助處理</h2>
    </div>
    <!-- 底部申明 -->
    <nav-footer class="lineBind_navFooter"></nav-footer>
  </div>
</template>
<script>
import NavFooter from "@/components/NavFooter";
export default {
  name: "lineBind",
  components: {
    NavFooter
  },
  mounted() {
    setTimeout(() => {
      this.$router.push("/PhoneVerification");
    }, 3000);
  }
};
</script>
<style lang="scss" scoped>
.lineBind {
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/bottomImg.png");
  background-size: 100% 25rem;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  .lineBind_loginLogo {
    width: 23.8rem;
    height: 2.4rem;
  }
  .lineBind_box {
    margin: 10rem auto 0;
    padding: 9rem 0;
    width: 75rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 3rem 12rem 0px rgba(86, 96, 114, 0.06);
    border-radius: 1rem;
    .lineBind_box_div {
      margin-bottom: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin: 0 1rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: rgba(240, 241, 243, 1);
        border-radius: 50%;
      }
      .lineBind_box_div_logo {
        margin: 0 1rem;
        width: 10rem;
        height: 10rem;
      }
      .lineBind_box_div_bind {
        width: 5rem;
        height: 5rem;
      }
    }
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
      color: rgba(61, 61, 61, 1);
      line-height: 3.3rem;
    }
    h2 {
      margin-top: 0.5rem;
      font-size: 1.4rem;
      color: rgba(134, 134, 134, 1);
      line-height: 2rem;
    }
  }
  .lineBind_navFooter {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
  }
}
@media screen and (max-width: 992px) {
  .lineBind {
    background-size: 100% 30vh;
    .lineBind_box {
      width: 90%;
      padding: 5rem 0;
      .lineBind_box_div {
        .lineBind_box_div_logo {
          margin: 0 0.5rem;
          width: 6rem;
          height: 6rem;
        }
        .lineBind_box_div_bind {
          width: 3rem;
          height: 3rem;
        }
        i {
          margin: 0 0.5rem;
          height: 0.6rem;
          width: 0.6rem;
        }
      }
      h1 {
        font-size: 1.8rem;
        line-height: 2.5rem;
      }
      h2 {
        margin-top: 0.2rem;
        font-size: 1.2rem;
        line-height: 1.7rem;
      }
    }
  }
}
</style>
