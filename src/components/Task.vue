<template>
  <div class="tasks" @click="isClickTask">
    <el-card>
      <div class="title">
        <h1>賬號綁定LINE賬戶</h1>
        <span>IB 幣 <span class="nub">50</span></span>
         <p v-if="istask">2019年04月01日至2020年02月01日</p>
      </div>
       <span v-if="istask" class="tex texp">任務完成</span>
      <span class="tex" v-else>任務完成</span>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    istask: { type: Boolean, default: false },
    isClickTask: { type: Function, default: () => {} }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixin.scss';
.tasks {
  margin-bottom: 1.5rem;
  .el-card {
    border-radius: 1rem;
    cursor: pointer;
    /deep/ .el-card__body{
      @include flex(space-between);
    }
    .title {
      h1 {
        line-height: 2.5rem;
        font-size: 1.8rem;
        font-weight: 700;
        color: #EE9702;
      }
      span {
        margin-top: 1.2rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #BDBDBD;
        .nub {
          margin-left: .6rem;
        }
      }
      p {
        line-height: 1.7rem;
        font-size: 1.2rem;
      }
    }
    .tex {
      line-height: 2.5rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: #3D3D3D;
    }
  }
}
@media screen and (min-width:992px) and (max-width:1199px){
  .tasks {
    .el-card{
       /deep/ .el-card__body{
         position: relative;
      }
      .texp {
       position: absolute;
        right: 2rem;
        top: 2.5rem;
      }
    }
  }
}
</style>
