<template>
  <div class="content">
    <el-card>
      <el-row>
        <el-col :sm="24">
          <div class="name">
            <img src="../assets/img/name@2x.png" alt="">
            <span>您的服務經銷商為：</span>
          </div>
        </el-col>
        <!-- <el-col :sm="24">
          <div class="information">
            <el-row>
              <el-col :sm="24" :md="11" :lg="11">
                <div class="text">
                  <h1>{{map.Name}}店</h1>
                  <span>Water Purifier Store Fengjia Store</span>
                </div>
              </el-col>
              <el-col :sm="24" :md="24" :lg="13">
                <el-row class="info">
                  <el-col :sm="16" :lg="18">
                    <span class="title">門店地址</span>
                    <div class="text">
                      <p class="span_1">{{map.Address}}</p>
                      <span class="ico" @click="$router.push({ path: '/map', query: { Address: map.Address } })">
                        <i class="mcicon-1"></i>
                        查看地址
                      </span>
                    </div>
                  </el-col>
                  <el-col :sm="8" :lg="6">
                    <span class="title">聯繫電話</span>
                    <p class="span_1">{{map.Tel}}</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col> -->

        <el-col :sm="24" class="h-scroll" v-if="map" :class="{'w-md':  map.length>= 3,'w-xs':map.length>= 2 }">
          <vue-scroll :ops="ops">
            <div class="information" v-for="(item,index) in map" :key="index">
              <el-row>
                <el-col :sm="24" :md="11" :lg="11">
                  <div class="text">
                    <h1>{{item.Name}}店</h1>
                    <span>產品型號：{{item.ModelName}}</span>
                  </div>
                </el-col>
                <el-col :sm="24" :md="24" :lg="13">
                  <el-row class="info">
                    <el-col :sm="16" :lg="18">
                      <span class="title">門店地址</span>
                      <div class="text">
                        <p class="span_1">{{item.Address}}</p>
                        <span class="ico" @click="$router.push({ path: '/map', query: { Address: item.Address } })">
                          <i class="mcicon-1"></i>
                          查看地址
                        </span>
                      </div>
                    </el-col>
                    <el-col :sm="8" :lg="6" class="m-b">
                      <span class="title">聯繫電話</span>
                      <p class="span_1">
                        <a :href="'tel:+' + item.Tel">{{item.Tel}}</a>
                        <!-- {{item.Tel}} -->
                      </p>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </vue-scroll>
        </el-col>
      </el-row>

    </el-card>

  </div>
</template>

<script>
import { getMaintenanceDistributionByCustId } from '../api/api'
import storage from './../storage'
export default {
  name: 'dealer-information',
  props: {
    // map: { type: Object }
  },
  data () {
    return {
      CustId: '',
      map: [
        // {
        //   CRMId: '099a511f-8518-e911-8156-005056af7974',
        //   PHPCustId: 'FAK013',
        //   Name: '八方',
        //   Mobile: '0938710668',
        //   Tel: '038320518',
        //   Address: '花蓮縣花蓮市中山路214號'
        // },
        // {
        //   CRMId: '099a511f-8518-e911-8156-005056af7974',
        //   PHPCustId: 'FAK013',
        //   Name: '八方',
        //   Mobile: '0938710668',
        //   Tel: '038320518',
        //   Address: '花蓮縣花蓮市中山路214號'
        // },
        // {
        //   CRMId: '099a511f-8518-e911-8156-005056af7974',
        //   PHPCustId: 'FAK013',
        //   Name: '八方',
        //   Mobile: '0938710668',
        //   Tel: '038320518',
        //   Address: '花蓮縣花蓮市中山路214號'
        // },
        // {
        //   CRMId: '099a511f-8518-e911-8156-005056af7974',
        //   PHPCustId: 'FAK013',
        //   Name: '八方',
        //   Mobile: '0938710668',
        //   Tel: '038320518',
        //   Address: '花蓮縣花蓮市中山路214號'
        // }
      ],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null, // 轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0', // 距离容器的距离
          keepShow: false, // 是否即使 bar 不存在的情况下也保持显示
          border: 'none' // 边框
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#E6E6E6' // 颜色
        }

      }
    }
  },
  mounted () {
    this.CustId = storage.getItem('userName')
    this.CustId = this.CustId.CustId
    // console.log(this.CustId)
    this._getMaintenanceDistributionByCustId()
  },
  methods: {
    _getMaintenanceDistributionByCustId () {
      const { CustId } = this
      getMaintenanceDistributionByCustId({ CustId }).then(res => {
        // let list = []
        this.map = res.data.Data
        // if (res.data.Data) {
        //   const hash = {}
        //   this.map = res.data.Data.reduce(function (item, next) {
        //   // eslint-disable-next-line no-unused-expressions
        //     hash[next.Name] ? '' : hash[next.Name] = true && item.push(next)
        //     return item
        //   }, [])
        // }
      })
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
      margin-bottom: 2rem;
      img{
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
     height:10.6rem;
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
          font-weight:400;
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
          font-weight: 700;
          color: rgba(61, 61, 61, 1);
        }
        .text {
          display: flex;
          align-items: center;
          .ico {
            margin-left: 1rem;
            font-weight: 500;
            color: #1FB6ED;
          }
        }
      }
    }
  }
@media only screen and (min-width:1200px) {
   .h-scroll {
     height: 6.6rem!important;
    }
    .w-md {
      height: 19rem!important;
    }
}
@media only screen and (min-width:768px) and (max-width: 1199px) {
  .h-scroll {
     height: 10.6rem!important;
    }
    .w-xs {
      height: 21.2rem!important;
    }
}
@media only screen and (max-width:767px) {
   .h-scroll {
     height: 15rem!important;
    }
    .w-xs {
      height: 30rem!important;
    }
    .m-b {
      margin-bottom: 1rem;
    }
}
}

</style>
