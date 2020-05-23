import * as types from './mutation-types'
export default {
  getMeProductList ({ commit }, custWaterProdList) {
    commit(types.MC_CUSTWATERPRODLIST, custWaterProdList)
  },
  getMeProduct ({ commit }, custWaterProd) {
    commit(types.MC_CUSTWATERPROD, custWaterProd)
  },
  getUserName ({ commit }, userName) {
    commit(types.MC_USERNAME, userName)
  },
  getUser ({ commit }, userId) {
    commit(types.MC_USER, userId)
  }
}
