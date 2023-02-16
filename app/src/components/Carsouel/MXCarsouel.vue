<template>
  <div class="swiper-container"
       ref="mySwiper">
    <!-- swiper-wrapper里面每一个slider即为一张图片 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="item in imgs"
           :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'MXCarsouel',
  props: ['imgList'],
  data() {
    return {
      imgs: this.imgList.length > 0 ? this.imgList : ''
    }
  },
  watch: {
    imgs: {
      handler() {
        this.$nextTick(() => {
        // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            speed: 300,
            autoplay: {
              delay: 2000
            },

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
