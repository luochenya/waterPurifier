<template>
  <div class="contents">
    <div class="title">
      <h1>服務申請</h1>
      <span>Service application</span>
    </div>
    <el-card>
      <div class="top">
        <span></span>
        <div class="name">
          <h1>RO淨水器</h1>
          <p>會員綁定時間：2019年09月01日</p>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="8rem">
        <el-row>
          <el-col :sm="24" :md="12" class="rigth">
            <el-form-item label="型號">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
           <el-col :sm="24" :md="12">
            <el-form-item label="製號">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :md="12" class="rigth">
            <el-form-item label="安裝地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
           <el-col :md="12">
              <el-form-item label="選擇服務">
                <el-select v-model="form.region" placeholder="請選擇您的服務">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="form_textarea">
            <el-form-item label="狀況概述">
              <el-input type="textarea" v-model="form.desc" placeholder="請敘述您的狀況..."></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="希望預約時間" label-width="11rem">
              <el-select v-model="form.region" placeholder="請選擇您希望預約時間" style="width: 98%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
           </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :md="19">
          <div class="btoom-service">
            <div class="left">
              <span></span>
                <div class="name">
                  <h1>客服專線</h1>
                  <p>Customer Service Hot</p>
                </div>
            </div>
            <div class="phone">
             <i class="mcicon-3"></i>
             <span>0800-000-888</span>
           </div>
          </div>
        </el-col>
        <el-col :md="5">
          <div class="btn" @click="clickSubmit">提交</div>
        </el-col>
      </el-row>
    </el-card>
    <guider-two :isDialogShow="isShowError" :error="true" :noShowClick="clickError"></guider-two>
    <guider-two :isDialogShow="isShowSucceed" :succeed="true" :noShowClick="clickSucceed"></guider-two>
  </div>
</template>

<script>
import GuiderTwo from '@/components/PopUp/Guide_2'
export default {
  components: {
    GuiderTwo
  },
  data () {
    return {
      form: {
        name: '',
        region: ''
      },
      isShowError: false,
      isShowSucceed: false
    }
  },
  methods: {
    // 提交
    clickSubmit () {
      // this.isShowError = true
      this.isShowSucceed = true
    },
    clickError () {
      this.isShowError = false
      this.isShowSucceed = true
    },
    clickSucceed () {
      this.isShowSucceed = false
      this.$router.push({ name: 'memberService' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.contents {
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
  .el-card {
    border-radius: 1rem;
    padding: 1rem 0;
    .top {
      display: flex;
      align-items: center;
      span {
         @include bgImg(1.3rem,3.2rem,'./../assets/img/icon_list1.png',1.3rem);
        margin-right: .5rem;
      }
      .name {
        h1 {
          line-height: 2.2rem;
          font-size: 1.6rem;
          font-weight: 700;
          color:#3D3D3D;
        }
        p {
          line-height: 1.7rem;
          font-size: 1.2rem;
          color: #868686;
          font-weight: 500;
        }
      }
    }
    .el-form {
      margin-bottom: 4rem;
      margin-top: 2.6rem;
      .el-row{
        display: flex;
      }
      /deep/ .el-select .el-input .el-select__caret {
        color: #3D3D3D!important;
        font-weight: 700;
      }
      .el-col {
        background:#F9F9FA;
        border-radius: 1rem;
        margin-bottom: 2rem;
        height: 4.8rem;
        padding-top: .25rem;
         /deep/ .el-input__inner {
           border: none;
           padding-left: 0;
           background:#F9F9FA;
         }
         /deep/ .el-form-item__label {
          color: #3D3D3D;
          font-weight: 700;
        }
      }
      .rigth {
        margin-right: 1.5rem;
      }
      .form_textarea {
        height: 10rem;
        position: relative;
        /deep/  .el-textarea__inner{
          margin-top: .5rem;
          border: none;
          background:#F9F9FA;
        }
        &:after {
          content: '限制輸入50字，已輸入0字';
          position: absolute;
          right: 2.4rem;
          bottom: 1.2rem;
          font-size: 1.4rem;
          line-height: 2rem;
          color: #BDBDBD;
        }
        p {
          display: inline-block;
          margin-left: auto;
        }
      }
    }
    .btoom-service {
      display: flex;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        span {
          @include bgImg(2rem,2.8rem,'./../assets/img/CustomerService2x.png',2rem);
          margin-right: .5rem;
        }
        .name {
          h1 {
            line-height: 2.2rem;
            font-size: 1.6rem;
            font-weight: 700;
            color: #3D3D3D;
          }
          p {
            font-size: 1rem;
            color: #BDBDBD;
          }
        }
      }
      .phone {
          margin-left: 2rem;
          line-height: 2.8rem;
          font-size: 2rem;
          font-weight: 500;
          .mcicon-3 {
            margin-right: .6rem;
          }
        }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      background: #1FB6ED;
      border-radius: .6rem;
      color: #fff;
    }
  }
// @media srceen and (min-width:99)
@media screen and (max-width: 992px){
   position: relative;
  .el-form{
    .el-row {
      flex-wrap: wrap;
    }
    .el-col {
      width: 100%;
    }
    .rigth {
      margin-right: 0!important;
    }
    /deep/ .form_textarea{
      height: 15rem!important;
    }
    /deep/ .el-textarea__inner {
      padding-left: 0;
      padding-right: 0;
      height: 10rem!important;
    }
  }
  .btn {
    position: absolute;
    width: 10rem;
    right: 0;
    top: -4rem;
  }
}
@media screen and (max-width: 460px) {
  .btoom-service{
    margin-top: 1.5rem;
    .phone {
      line-height: 2.3rem;
      margin-left: 1.5rem!important;
      font-size: 1.4rem;
      font-weight: 500;
      }
  }
}
}
</style>
