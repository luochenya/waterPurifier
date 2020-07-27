<template>
  <div class="MemberBenefits">
    <div class="title">
      <h1>會員權益</h1>
      <span>MEMBER BENEFITS</span>
    </div>
    <el-card class="MemberBenefits_content">
      <div class="MemberBenefits_content_header">
        <div :class="activeStatus == index ? 'active' : ''" v-for="(item, index) in dataFormList" :key="index" @click="titleClick(index)">{{item.title}}</div>
      </div>
      <div class="MemberBenefits_content_content">{{dataFormList[activeStatus].content}}</div>
    </el-card>
 </div>
</template>

<script>
export default {
  name: 'MemberBenefits',
  data () {
    return {
      activeStatus: 0,
      dataFormList: [{
        title: '會員VIP權益說明',
        content: '本團隊尊重用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益，以及我們的隱私權政策.未來會持續更新並公告於官網中本團隊尊重用戶隱私權，為了讓您更加清楚使用時。如何同意、提供、萬集個人有關資料予服務團隊，請詳閱隱私權政策，本文件將告知您有關權益，以及我們的隱私權政策，未來會持續更新並公告於官網中用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益.以及我們的隱私權政策↓未來會持續更新並公告於官網中。'
      }, {
        title: '個人資料注意事項',
        content: '個人資料注意事項本團隊尊重用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益，以及我們的隱私權政策.未來會持續更新並公告於官網中本團隊尊重用戶隱私權，為了讓您更加清楚使用時。如何同意、提供、萬集個人有關資料予服務團隊，請詳閱隱私權政策，本文件將告知您有關權益，以及我們的隱私權政策，未來會持續更新並公告於官網中用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益.以及我們的隱私權政策↓未來會持續更新並公告於官網中。'
      }, {
        title: '櫻花點數商城辦法聲明',
        content: '櫻花點數商城辦法聲明本團隊尊重用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益，以及我們的隱私權政策.未來會持續更新並公告於官網中本團隊尊重用戶隱私權，為了讓您更加清楚使用時。如何同意、提供、萬集個人有關資料予服務團隊，請詳閱隱私權政策，本文件將告知您有關權益，以及我們的隱私權政策，未來會持續更新並公告於官網中用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益.以及我們的隱私權政策↓未來會持續更新並公告於官網中。'
      }, {
        title: '濾心更換建議書',
        content: '濾心更換建議書本團隊尊重用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益，以及我們的隱私權政策.未來會持續更新並公告於官網中本團隊尊重用戶隱私權，為了讓您更加清楚使用時。如何同意、提供、萬集個人有關資料予服務團隊，請詳閱隱私權政策，本文件將告知您有關權益，以及我們的隱私權政策，未來會持續更新並公告於官網中用戶隱私權，為了讓您更加清楚使用時如何同意、提供、莧集個人有關資料予服務團隊，請詳閱隱私權政策.本文件將告知您有關權益.以及我們的隱私權政策↓未來會持續更新並公告於官網中。'
      }]
    }
  },
  methods: {
    titleClick (index) {
      this.activeStatus = index
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixin.scss';
.MemberBenefits {
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
  .MemberBenefits_content {
    .MemberBenefits_content_header {
      display: flex;
      div {
        width: 25%;
        text-align: center;
        font-size:1.3rem;
        color:rgba(134,134,134,1);
        line-height:1.8rem;
        padding: 1rem 0;
        border-bottom: 1px solid #eeeeee;
      }
      .active {
        border-bottom: 1px solid #252427;
        font-weight:600;
        color:rgba(37,36,39,1);
      }
    }
    .MemberBenefits_content_content {
      padding: 2.5rem;
      font-size:1.2rem;
      color:rgba(61,61,61,1);
      line-height:2.5rem;
    }
  }
  @media screen and (min-width:992px) and (max-width:1200px) {}
  @media screen and (max-width: 991px) {}
}
</style>
