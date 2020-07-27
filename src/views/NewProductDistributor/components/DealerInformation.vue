<template>
  <div class="content" ref="wrapper">
    <el-card v-if="list">
      <el-row>
        <el-col :sm="24">
          <div class="name">
            <img src="./../../../assets/img/name@2x.png" alt="">
            <span>您的服務經銷商為：</span>
          </div>
        </el-col>
        <el-col :sm="24">
          <div class="information">
            <el-row>
              <el-col :sm="24" :md="10" :lg="12">
                <div class="text">
                  <h1>{{list.Name}}店</h1>
                  <!-- <span>Water Purifier Store Fengjia Store</span> -->
                </div>
              </el-col>
              <el-col :sm="24" :md="14" :lg="12">
                <el-row class="info">
                  <el-col :sm="18">
                    <span class="title">門店地址</span>
                    <div class="text">
                      <p class="span_1">{{list.Address}}</p>
                      <span class="ico" @click="$router.push({ path: '/map', query: { Address: list.Address } })">
                        <i class="mcicon-1"></i>
                        查看地址
                      </span>
                    </div>
                  </el-col>
                  <el-col :sm="6" >
                    <span class="title">聯繫電話</span>
                    <!-- <p class="span_1">{{list.Tel}}</p> -->
                    <p class="span_1">
                      <a :href="'tel:+' + list.Tel">{{list.Tel}}</a>
                    </p>
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
export default {
  name: 'dealer-information',
  props: {
    list: { type: Object }
  },
  data () {
    return {
      fullWidth: document.documentElement.clientWidth
    }
  },
  mounted () {
    if (this.fullWidth < 768) {
      this.$refs.wrapper.scrollIntoView()
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  .el-card {
    border-radius: 1rem;
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 3rem;
      img{
        width: 2.2rem;
        height: 2.4rem;
        margin-right: 1rem;
      }
      span {
        line-height: 2rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(61, 61, 61, 1);
      }
    }
    .information {
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
          font-weight: lighter;
          color: rgba(189, 189, 189, 1);
        }
      }
      .info {
        font-size: 1.2rem;
        .title {
          margin-bottom: .8rem;
          line-height: 1.7rem;
          color: rgba(134, 134, 134, 1);
        }
        .span_1{
          line-height: 1.7rem;
          font-weight: 500;
          color: rgba(61, 61, 61, 1);
        }
        .text {
          display: flex;
          align-items: center;
          .ico {
            margin-left: 1rem;
            font-weight: 500;
            color:#1fb6ed;
          }
        }
      }
    }
  }

}

</style>
