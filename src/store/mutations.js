import * as types from './mutation-types'
export default {
  [types.MC_CUSTWATERPRODLIST] (state, custWaterProdList) {
    state.custWaterProdList = custWaterProdList
  },
  [types.MC_CUSTWATERPROD] (state, custWaterProd) {
    state.custWaterProd = custWaterProd
  },
  [types.MC_USERNAME] (state, userName) {
    state.userName = userName
  },
  [types.MC_USER] (state, userId) {
    state.userId = userId
  }
}
