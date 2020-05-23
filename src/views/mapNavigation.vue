<template>
  <div class="map-navigation">
    <gmap-map
      :center="centers"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 600px"
      :style="{height:`${h}px`}"
      >
      <gmap-marker
      :position="centers"
      :clickable="true"
      :draggable="true"
      :title = "address"
      @click="center=centers"
    >
     <gmap-info-window>
       {{address}}
      </gmap-info-window>
    </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import Vue from 'vue'
import { setTimeout } from 'timers'
export default {
  name: 'map-navigation',
  data () {
    return {
      centers: { lat: 0, lng: 0 },
      address: '',
      h: document.documentElement.clientHeight
    }
  },
  created () {
    this.address = this.$route.query && this.$route.query.Address
  },
  mounted () {
    setTimeout(() => {
      this.inintMap()
    }, 1000)
    // console.log(this.h)
  },
  computed: {
    google: gmapApi
  },
  watch: {
    '$route' (to, from) {
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  },
  methods: {
    inintMap () {
      if (this.google) {
        const geocoder = new this.google.maps.Geocoder()
        geocoder.geocode({ address: this.address }, (results, status) => {
          // console.log(status)
          if (status === 'OK') {
            this.centers.lat = results[0].geometry.location.lat()
            this.centers.lng = results[0].geometry.location.lng()
            // console.log(results[0].geometry.location.lat())
            // console.log(results[0].geometry.location.lng())
          }
          // if (status === (this.google && this.google.maps.GeocoderStatus.OK)) {
          //   // alert(results[0].geometry.location)
          //   // const { lat, lng } = results[0].geometry.location
          //   // console.log(lat(), lng())
          //   // this.position = {
          //   //   lat: lat(),
          //   //   lng: lng()
          //   // }
          // } else {
          //   alert('Geocode was not successful for the following reason: ' + status)
          // }
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">

</style>
