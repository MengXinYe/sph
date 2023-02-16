<template>
  <div id="app-container">
    <MXHeader></MXHeader>
    <router-view></router-view>
    <MXFooter v-show="$route.meta.footerShow"></MXFooter>
  </div>
</template>

<script>
import MXHeader from '@/components/Header/MXHeader.vue'
import MXFooter from '@/components/Footer/MXFooter.vue'

export default {
  mounted() {
    this.$store.dispatch('getCategoryList')
    this.$store.dispatch('getBanner')
    this.$store.dispatch('getFloor')
  },
  components: {
    MXHeader,
    MXFooter
  }
}
</script>

<style lang="less">
a:link:hover {
  text-decoration: none;
}
body {
  padding-right: 0 !important;
}
</style>
