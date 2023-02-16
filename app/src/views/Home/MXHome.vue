<template>
  <div id="home-container">
    <MXTypeNav />
    <MXList />
    <MXRecommend />
    <MXRank />
    <MXLike />
    <MXFloor v-for="item in floors" :key="item.id" :listInfo="item" />
    <MXBrand />
  </div>
</template>

<script>
import MXList from '@/views/Home/List/MXList.vue'
import MXRecommend from '@/views/Home/recommend/MXRecommend.vue'
import MXRank from '@/views/Home/Rank/MXRank.vue'
import MXLike from '@/views/Home/Like/MXLike.vue'
import MXFloor from '@/views/Home/floor/MXFloor.vue'
import MXBrand from '@/views/Home/Brand/MXBrand.vue'

import { mapState } from 'vuex'

export default {
  name: 'MXHome',
  components: {
    MXList,
    MXRecommend,
    MXRank,
    MXLike,
    MXFloor,
    MXBrand
  },
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  }
}
</script>

<style>
</style>
