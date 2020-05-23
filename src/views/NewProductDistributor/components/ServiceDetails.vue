<template>
  <div class="content">
    <el-card>
      <div class="title">
        <div class="title_left">
          <h1>{{nameId === '001' ? name='專人到府濾心更換' : name='到店取貨付款'}}</h1>
          <!-- <span>On-site service deta</span> -->
        </div>
        <div class="title_right" @click="$router.push({  path: `/toproduct/${details.CustProdId}` })">
          返回產品內容頁<i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="list" ref="refSuccess">
        <el-row v-for="(item,index) in details.Detail" :key="index">
          <el-col :xs="7" :sm="7" :md="4" :lg="4" >
            <span class="input-checkbox" @click.stop="isShowClick(item)">
              <label>
              <input type="checkbox" class="remmber" :value="item.Sequence" v-model="getCheckboxs">
              <span></span>
                第{{item.Sequence}}道濾心
              </label>
              <!-- <span><i class="mcicon-4" ref="refSuccess" @click="isShowClick(index,item.Sequence)" :class="{'mcicon-5': radios[isIndex].isChecked}"></i></span> -->

            </span>
          </el-col>
          <el-col :xs="11" :sm="9" :md="6" :lg="6">
            <div class="item">
              <img src="./../../../assets/img/icon_1@2x.png" alt="">
              <div class="name">
                <span>{{item.FilterDescription}}</span>
                <span>{{item.FilterName}}</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="8" :md="5" :lg="5">
            <div class="btn" :class="{'red': item.RemainLife==='0%' || item.RemainLife==='0'}">
              <div class="bg_color" :style="'width:'+ item.RemainLife">
              </div>
                <span v-if="item.RemainLife>'0%'">
                壽命：{{item.RemainLife}}
               </span>
              <span v-else>
                已過期
              </span>

            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="5" :lg="5">
            <div class="price">
               建議售價：{{item.FilterUniPrice}}元
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="4" :lg="4">
            <div class="amount">
              數量
              <!-- <span>13</span> -->
              <input type="text" v-model.number="num[index].i" maxlength="2">
            </div>
          </el-col>
        </el-row>

  <!--       <el-row>
          <el-col :xs="7" :sm="7" :md="4" :lg="4">
            <span>
              <i class="el-icon-success" @click="GuideClick"></i>
              第一道濾心
            </span>
          </el-col>
          <el-col :xs="11" :sm="9" :md="6" :lg="6">
            <div class="item">
              <img src="./../../../assets/img/icon_1@2x.png" alt="">
              <span>複合式濾心</span>
              <span>F0161</span>
            </div>
          </el-col>
          <el-col :xs="6" :sm="8" :md="5" :lg="5">
            <div class="btn" :class="{'red': details.Detail[0].RemainLife}">
              <div class="bg_color">
              </div>
                 <span>
                   123
               {{details.Detail[0].RemainLife}}
              </span>

            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="5" :lg="5">
            <div class="price">
               建議售價：500元
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="4" :lg="4">
            <div class="amount">
              数量
              <span>13</span>
            </div>
          </el-col>
        </el-row>
 -->
      </div>

      <div class="bottom">
        <el-row class="row">
          <el-col :md="24" :lg="18">
            <el-row :gutter="10">
              <el-col :sm="24" :md="12" :lg="12" class="row_col">
                <div class="tiem">
                  <span class="tex">{{nameId === '001' ? title='預約服務日期' : title='取貨付款日期'}}</span>
                  <div class="tiems">
                    <!-- <span>2020.03.05</span> -->
                     <myDatepicker :date="startTime" :option="option" :limit="limit"></myDatepicker>
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </el-col>
              <!-- <el-col :sm="24" :md="12" :lg="12" v-if="false">
                 <div class="tiem">
                  <span class="tex">專人到府服務時間</span>

                  <div class="tiems">

                    <span>2020.03.05</span>
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </el-col> -->
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="8" :md="6" :lg="6" class="bottom_btn">
            <div class="btn" @click="clickChange">
              <span>{{btnName}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <guide-one v-show="isShow" :btn="clickBtn" :pLeft="getLeft" :pBottom="getBottom"></guide-one>
    <!-- 提交成功 -->
    <guide-two :isDialogShow="isShowTwo" :noShowClick="noShowClick" modyType="1"></guide-two>
     <!-- 修改成功 -->
    <guide-two :isDialogShow="isShowTwo2" :noShowClick="_noShowClick" modyType="2"></guide-two>
    <!-- 尚未選擇時間 -->
    <guide-two :isDialogShow="isShowTwo3" :noShowClick="noWarningClick" modyType="3"></guide-two>
    <guide-two :isDialogShow="isFilterShowTwo" :noShowClick="filterClick" :filter_="true"></guide-two>
    <guide-two :isDialogShow="isFilterShowWarning" :noShowClick="isFilterWarningClick" :warning="true"></guide-two>
    <guide-three v-show="isShowThree" :BtnLeft="BtnLeft"></guide-three>
    <Loading :show="isShowLoadging"></Loading>
  </div>

</template>

<script>
import GuideOne from '@/components/PopUp/Guide_1'
import GuideTwo from '@/components/PopUp/Guide_2'
import GuideThree from '@/components/PopUp/Guide_3'
import { getByProductId, getCreateFilterOrder } from '@/api/api'
// , getCreateFilterOrder
import myDatepicker from 'vue-datepicker'
import storage from '@/storage'
import { newTime } from '@/util'

export default {
  name: 'servic-details',
  props: {
    list: { type: Object }
  },
  components: {
    GuideOne,
    GuideThree,
    GuideTwo,
    myDatepicker
  },
  data () {
    return {
      isShowLoadging: true,
      isShow: false,
      getLeft: 0,
      getBottom: 0,
      isShowTwo: false,
      isShowTwo2: false,
      isShowTwo3: false,
      isFilterShowTwo: false,
      isShowThree: false,
      isFilterShowWarning: false,
      fullWidth: document.documentElement.clientWidth,
      isIndex: 0,
      CustProdId: '',
      details: [],
      nameId: '',
      name: '',
      title: '',
      getCheckboxs: [],
      visible: false,
      OrderDetail: [

      ],
      num: [{ i: 0 }, { i: 0 }, { i: 0 }],
      flag: false,
      newTime: newTime(),
      startTime: { // 相當於變數
        time: ''
      },
      dateTime: '',
      option: {
        type: 'day',
        week: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD',
        inputStyle: {
          display: 'inline-block',
          // padding: '6px',
          'line-height': '22px',
          width: '90px',
          'font-size': '14px',
          border: 'none',
          // border: '2px solid #fff',
          // 'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          // 'border-radius': '2px',
          outline: 'none',
          color: '#5F5F5F',
          margin: '0'
        },
        color: { // 字體顏色
          header: '#35acff', // 頭部
          headerText: '#fff'// 頭部文案
        },
        buttons: { // button 文案
          // ok: '確定',
          cancel: '取消'
        },
        placeholder: '請選時間',
        dismissible: true
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5, 6, 0]
      },
      {
        type: 'fromto',
        from: newTime(),
        to: '2060-06-06'
      }],
      btnName: '確定',
      userName: {},
      btnNameType: '1'
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.CustProdId = this.$route.query && this.$route.query.CustProdId
    this.nameId = this.$route.query && this.$route.query.name
    this._getByProductId()
    this.$nextTick(() => {
      setTimeout(() => {
      }, 100)
      this.getOffsetTop()
    })
    this.userName = storage.getItem('userName')
    const time = new Date()
    this.dateTime = time.toLocaleDateString()
  },
  watch: {
    isShow (newVal, oldVal) {
      // if (newVal === true) {
      //   console.log('gaibian l ')

      //   const cssStr = 'overflow-y: hidden; height: 100%;'
      //   document.getElementsByTagName('html')[0].style.cssText = cssStr
      //   document.body.style.cssText = cssStr
      // } else {
      //   const cssStr = 'overflow-y: auto; height: auto;'
      //   document.getElementsByTagName('html')[0].style.cssText = cssStr
      //   document.body.style.cssText = cssStr
      // }

      // // 下麵需要這兩行程式碼，相容不同瀏覽器
      // document.body.scrollTop = this.pageScrollYoffset
      // window.scroll(0, this.pageScrollYoffset)
    }
  },
  methods: {
    /*  isShows () {
      this.getOffsetTop()
      this.isShow = true

      const mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.removeEventListener('touchmove', mo, false)
    }, */
    _getByProductId () {
      const { CustProdId } = this
      getByProductId({
        CustProdId
      }).then((res) => {
        this.details = res.data.Data[0]
        const { IsOldWaterProduct } = this.details
        if (!IsOldWaterProduct) {
          this.isShow = true
          this.isShowLoadging = false
          this.noScroll()
        }
      })
    },
    clickBtn () {
      this.isShow = false
      this.canScroll()
      const mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
    },

    filterClick () {
      this.isFilterShowTwo = false
      this.$router.push({ name: 'MatchingComplete' })
    },
    GuideClick () {
      this.isShowThree = false
      this.canScroll()
    },
    BtnLeft () {
      this.isShowThree = false
      this.canScroll()
    },
    getOffsetTop () {
      const { left, bottom } = this.$refs.refSuccess.getBoundingClientRect()
      if (this.fullWidth < 768) {
        this.getLeft = left - 8 + 10
        this.getBottom = -(bottom - 136)
      } else {
        this.getLeft = left - 8 + 10
        this.getBottom = -(bottom - 163)
      }
    },
    // 提交
    clickChange () {
      // console.log(this.getCheckboxs)
      if (!this.getCheckboxs.length) {
        this.isFilterShowWarning = true
        this.noScroll()
        return
      }
      // if(this.getCheckboxs.length !==)
      this.getCheckboxs.forEach((item) => {
        this.flag = true
        // console.log(item, '0')
        // console.log(this.details.Detail)
        const { FilterName, FilterDescription } = this.details.Detail[item - 1]
        const Quantity = this.num[item - 1].i
        // console.log(this.OrderDetail)
        // console.log(this.details.Detail[item - 1].FilterName)
        if (Quantity > 0 && Quantity <= 99) {
          this.OrderDetail.push({ FilterName, FilterDescription, Quantity })
          this.flag = true
        } else if (Quantity <= 0) {
          this.isFilterShowWarning = true
          this.noScroll()
          this.flag = false
          return true
        }
      })
      if (!this.flag) {
        return
      }
      if (!this.startTime.time) {
        this.isShowTwo3 = true
        this.noScroll()
        return
      }
      const filterOrder = {
        CustId: this.userName.CustId,
        CustName: this.userName.CustName,
        CustMobile: this.userName.Mobile,
        CustAddress: this.userName.CustAddress,
        DistributionId: this.list.CRMid,
        DistributionUofId: this.list.UOFid,
        ProductId: this.CustProdId,
        BookingType: this.nameId,
        BookingDate: this.startTime.time,
        OrderDetail: this.OrderDetail
      }
      this.isShowLoadging = true
      // console.log(filterOrder)
      getCreateFilterOrder(
        filterOrder
      ).then(res => {
        if (res.status) {
          // if (this.btnName === '確定') {
          if (this.btnNameType === '1') {
            this.isShowTwo = true
            this.noScroll()
          } else {
            this.isShowTwo2 = true
            this.noScroll()
          }
          this.isShowLoadging = false
        }
      })
    },
    noShowClick () {
      this.isShowTwo = false
      this.canScroll()
      // this.btnName = '更正'
      this.btnNameType = '2'
      this.OrderDetail = []
    },
    _noShowClick () {
      this.isShowTwo2 = false
      this.canScroll()
      this.OrderDetail = []
    },
    // 獲取寬度
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      if (this.fullWidth <= 767) {
        // document.documentElement.scrollTop = 380
        // this.$refs.refSuccess.scrollTo(0, 500)
        // this.$refs.result.refSuccess.scrollIntoView()
      }
    },
    handleScroll (e) {
      // console.log('e', e.srcElement.scrollTop)
      // const scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrolltop)
      // let top = document.documentElement.scrollTop || document.body.scrollTop
      // document.body.scrollTop = document.documentElement.scrollTop = -525
      // document.documentElement.scrollTop = document.body.scrollTop = 100
      if (this.fullWidth <= 767) {
        // alert('222')
        /*  console.log('scc', document.documentElement.scrollTop)
        this.$refs.refSuccess.scrollTo = 0 */
      }
    },
    isShowClick (E) {
      // const { FilterName, FilterDescription } = E
      // this.OrderDetail.push({ FilterName, FilterDescription })
      // console.log('4', this.OrderDetail)
      // console.log(FilterName, FilterDescription)
      // console.log('1', this.getCheckboxs)
      // console.log('2', this.num)
      // console.log('3', E)
    },
    // 尚未選擇品項與數量
    isFilterWarningClick () {
      this.isFilterShowWarning = false
      this.canScroll()
    },
    // 尚未選擇時間
    noWarningClick () {
      this.isShowTwo3 = false
      this.canScroll()
    }

  }
}
</script>

<style scoped lang="scss">
.content {
  .el-card{
    border-radius: 1rem;
    padding: .5rem 0 1.2rem 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      .title_left {
        display: flex;
        align-items: flex-end;
        h1 {
          font-size: 2rem;
          color: rgba(61, 61, 61, 1);
          font-weight: 700;
          margin-right: .6rem;
        }
        span {
            font-size: 1.2rem;
            font-weight: lighter;
            color: rgba(189, 189, 189, 1);
          }
      }
      .title_right {
        font-size: 1.2rem;
        color: rgba(31, 182, 237, 1);
      }
    }
    .list {
      .el-row:nth-of-type(2n-1) {
         background-color: rgba(249, 249, 250, 1);
      }
      .input-checkbox {
        label {
          display: flex;
          align-items: center;
          padding: 1rem 0;
        }
        span{
          margin-right: .6rem;
        }

      }
      .remmber {
        display: none;
      }
      .remmber[type=checkbox]+span  {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background: url('./../../../assets/icon/round.png') no-repeat;
        background-size: 1.6rem;
      }
      .remmber[type=checkbox]:checked+span {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background: url('./../../../assets/icon/mes.png') no-repeat;
        background-size: 1.6rem;
      }
      .el-row {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        border-radius: 1rem;
        .el-col {
          height: 4.8rem;
          display: flex;
          align-items: center;
          padding-left: 1.5rem;
          span {
            color: rgba(61, 61, 61, 1);
            i {
             margin-right: .8rem;
             color: rgba(31, 182, 237, 1);
            }
          }
          .item {
            display: flex;
            align-items: center;
            img {
              width: 1.4rem;
              height: 1.4rem;
              margin-right: .6rem;
            }
            .name {
              display: flex;
              flex-direction: column;
              span:last-of-type {
                margin-top: .5rem;
                font-size: 1rem;
                color: rgba(134, 134, 134, 1);
              }
            }
            // span:last-of-type {
            //   margin-left: .5rem;
            //   font-size: 1rem;
            //   color: rgba(134, 134, 134, 1);
            // }
          }
          .btn {
            position: relative;
            width: 9.2rem;
            height: 3rem;
            border-radius: .6rem;
            border: .1rem solid rgba(3, 187, 0, 1);
            text-align: center;
            .bg_color {
              position: absolute;
              height: 100%;
              width: 13%;
              background: rgba(3, 187, 0, 0.15)
            }
            span {
              color: rgba(3, 187, 0, 1);
              line-height: 3rem;
            }
            &.red {
              border-color: #B22128;
              overflow: hidden;
              .bg_color {
               width: 0%;
               background-color: #fff;
              }
              span {
                color: #B22128;
              }
            }
          }
          .amount {
            color: rgba(134, 134, 134, 1);
            input {
              width: 4rem;
              height: 2rem;
              border: none;
              font-size: 1.6rem;
              // outline: none;
              background-color: #fff;
              margin-left: .3rem;
              padding-left: .5rem;
            }
            span {

              // padding: .6rem 2rem .6rem .8rem;

            }
          }
        }
      }
    }
    .bottom {
      margin-top: 2rem;
      .tiem {
        display: flex;
        align-items: center;
        border: 1px solid rgba(215, 216, 223, 1);
        border-radius: .6rem;
        font-size: 1.2rem;
        color: rgba(61, 61, 61, 1);
        padding: .7rem .6rem;
        .tex {
          flex: 1;
        }
        .tiems {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            color: rgba(189, 189, 189, 1);
          }
        }
      }
      .btn {
        margin-left: 3rem;
        padding: 1rem;
        font-size: 1.4rem;
        color: #fff;
        cursor: pointer;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10rem;
          height: 3rem;
          border-radius: .6rem;
          background: rgba(31, 182, 237, 1);
        }
      }
    }
  }
@media only screen and (max-width: 992px) {
  .title {
    align-items: flex-end;
    .title_left {
      text-align: center;
      flex-direction: column!important;
       align-items: flex-start!important;
      span {
        margin-top: .6rem;
      }
    }
  }
  .list {
    .el-row {
      flex-wrap: wrap;
      .el-col:nth-of-type(4),.el-col:nth-of-type(5) {
        margin-top: -.8rem;
      }
      .el-col:nth-of-type(5) {
        display: flex;
        justify-content: flex-end;
      }
      .amount {
        margin-right: 2.2rem;
      }
    }
  }
  .bottom {
    padding: 0 10%;
     .row{
      .row_col {
        margin-bottom: 1.5rem;
      }
      .bottom_btn {
        margin-top: 1.5rem;
        margin-right: 1rem;
        margin-left: auto;
        cursor: pointer;
      }
    }
  }
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  /deep/ .el-card__body {
    padding: 2rem 1rem;
  }
  .list {
    .el-row {
      .el-col{
        padding-left: 1.2rem!important;
        span {
          i {
            margin-right: .3rem!important;
            }
          }
      }
    }
  }
  .bottom {
    padding: 0 10%!important;
    .row{
      .bottom_btn {
        margin-top: 1.5rem!important;
        margin-left: auto!important;
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .bottom {
    padding: 0 8%!important;
  }
 /*  .bottom {
    padding: 0 20%!important;

    .row {
      padding: 0 20%!important;
      .el-row {
         box-sizing: border-box;

        }

    }
    } */
}
@media screen and (max-width: 540px) {
   .list {
      .el-row {
        .el-col:nth-of-type(1), {
          width: 45%;
        }
        .el-col:nth-of-type(2){
          width: 55%;
        }
        .el-col:nth-of-type(3){
          width: 100%;
          margin-top: -.8rem;
        }
        .el-col {
          .amount {
            input {
              width: 5rem!important;
            }
          }
        }

      }
   }
   .bottom {
        .btn {
          position: relative;
          margin-bottom: 1rem;
          span {
            position: absolute;
            top: 0;
            left: -2.5rem;

          }

        }
  }
}
@media screen and (max-width: 409px) {
   .list {
      .el-row {
        .el-col:nth-of-type(1), {
          width: 40%;
        }
        .el-col:nth-of-type(2) {
         width: 60%;
        }
        .el-col:nth-of-type(3){
          width: 100%;
          margin-top: -.8rem;
        }

      }
   }
   .bottom {
        .btn {
          position: relative;
          margin-bottom: 1rem;
          span {
            position: absolute;
            top: 0;
            left: -2.5rem;

          }

        }
  }
}
}
</style>
