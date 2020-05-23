<template>
  <div class="product-distributor" ref="wrapper">
    <dealer-information style="margin-bottom: 2rem" :list="maintenanceDistribution"></dealer-information>
    <service-details  :list="maintenanceDistribution"></service-details>
  </div>
</template>

<script>
import DealerInformation from './components/DealerInformation'
import ServiceDetails from './components/ServiceDetails'
import { getMaintenanceDistribution } from '../../api/api'

export default {
  name: 'new-product-distributor',
  components: {
    DealerInformation,
    ServiceDetails
  },
  data () {
    return {
      maintenanceDistribution: {},
      ProductId: ''
    }
  },
  mounted () {
    this.ProductId = this.$route.query && this.$route.query.CustProdId
    this._getMaintenanceDistribution()
  },
  methods: {
    _getMaintenanceDistribution () {
      const { ProductId } = this
      getMaintenanceDistribution({
        ProductId
      }).then(res => {
        this.maintenanceDistribution = res.data.Data
        // console.log(res.data.Data)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.product-distributor {
    @media screen and (max-width:767px) {
      // margin-top: -3rem;
    }
}
</style>
