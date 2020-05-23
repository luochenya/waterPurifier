import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/login'
    redirect: '/customerService'
  },
  {
    path: '/customerService',
    name: 'CustomerService',
    component: () => import('@/views/CustomerService'),
    redirect: '/searchProducts',
    children: [
      {
        path: '/searchProducts', // 我的產品
        name: 'SearchProducts',
        component: () => import('@/views/searchProducts'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/newProductDistributor',
        name: 'NewProductDistributor',
        component: () => import('@/views/NewProductDistributor')
      },
      {
        path: 'Matching',
        name: 'FilterMatching', // 滤芯匹配
        component: () => import('@/views/FilterMatching'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/service', // 聯繫客服
        name: 'ContactCustomerService',
        component: () => import('@/views/ContactCustomerService'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/toView/:id',
        name: 'FilterToView', // 濾心更換履歷
        component: () => import('@/components/filterToView')
      },
      {
        path: '/upload', // 上傳圖片
        name: 'uploadPictures',
        component: () => import('@/views/toUploadPictures')
      },
      {
        path: 'uploadImg', // 裁剪圖片
        name: 'uploadImg',
        component: () => import('@/views/uploadImg'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'apply',
        name: 'ServiceApply', // 服務申請
        component: () => import('@/views/ServiceApply'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'member', // 會員服務
        name: 'memberService',
        component: () => import('@/views/memberService'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'theQuery', // 點數
        name: 'theQuery',
        component: () => import('@/views/theQuery'),
        meta: {
          keepAlive: true
        }

      },
      {
        path: 'vouchers', // 我的兌換
        name: 'meVouchers',
        component: () => import('@/views/MeVouchers'),
        meta: {
          keepAlive: true
        }

      },
      {
        path: 'exchange', // 兌換
        name: 'toExchange',
        component: () => import('@/views/ToExchange'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'exchangeDetails', // 兌換商品詳情
        name: 'toExchangeDetails',
        component: () => import('@/views/ToExchangeDetails'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'personal', // 個人資訊
        name: 'personalInformation',
        meta: { showPersonal: true, keepAlive: true },
        component: () => import('@/views/MemberService/personalInformation')
      },
      {
        path: '/toproduct/:id', // 查找產品
        name: 'Toproduct',
        component: () => import('@/views/toProduct')
      },
      {
        path: 'threeStates', // 查找產品三種狀態
        name: 'ThreeStates',
        component: () => import('@/views/ThreeStates'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'promptbook', // 首次匹配成功提示書
        name: 'PromptBook',
        component: () => import('@/views/PromptBook'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/yourDealer', // 專人到府服務
        name: 'YourDealer',
        component: () => import('@/views/yourDealer')
      },
      {
        path: 'successfulMatch', // 匹配導學
        name: 'SuccessfulMatch',
        component: () => import('@/views/SuccessfulMatch'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'alerts', // 消息通知
        name: 'alerts',
        component: () => import('@/components/Notification'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/personalCenter', // tou
    name: 'PersonalCenterApp',
    component: () => import('@/views/PersonalCenterAp'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/map', // map
    name: 'map-navigation',
    component: () => import('@/views/mapNavigation')
  },
  {
    path: '/meinformation', // map
    name: 'me-information',
    component: () => import('@/views/meInformation')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})
/* var routerList = []
router.beforeEach((to, from, next) => {
  console.log('r', routerList)
  console.log(routerList.indexOf(to.name))
  if (routerList.length && routerList.indexOf(to.name) === routerList.length - 1) { // 后退
    routerList.splice(routerList.length - 1, 1)
    to.meta.keepAlive = true
  } else { // 前进
    routerList.push(to.name)
    to.meta.keepAlive  = false
  }
  next()
}) */
// const routerList = []
// router.beforeEach((to, from, next) => {
//   if (routerList.length && routerList.indexOf(to.name) === routerList.length - 1) {
//     // 后退
//     routerList.splice(routerList.length - 1, 1)
//     to.meta.keepAlive = true
//   } else {
//     // 前进
//     routerList.push(from.name || '/')
//     to.meta.keepAlive = false
//   }
//   next()
// })
export default router
