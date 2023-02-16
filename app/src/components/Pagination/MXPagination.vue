<template>
  <div class="pagination">
    <button v-show="pageNum > 1"
            @click="goPage(pageNum - 1)">上一页</button>
    <button v-show="startAndEnd[0] > 1"
            @click="goPage(1)">1</button>
    <button v-show="startAndEnd[0] > step"
            :disabled="true">···</button>

    <button v-for="(item, index) in middleShow"
            :key="index"
            @click="goPage(item)"
            :class="{active: item === pageNum}">{{ item }}</button>

    <button v-show="pages - startAndEnd[1] >= step"
            :disabled="true">···</button>
    <button v-show="startAndEnd[1] !== pages"
            @click="goPage(pages)">{{ pages }}</button>
    <button v-show="pageNum < pages"
            @click="goPage(pageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'MXPagination',
  props: ['onceShowNum', 'total', 'pageNum', 'continue'],
  computed: {
    pages() {
      return Math.ceil(this.total / this.onceShowNum)
    },
    startAndEnd() {
      let start = 0
      let end = 0
      if (this.continue > this.pages) {
        start = 1
        end = this.pages
      } else {
        start = this.pageNum - parseInt(this.continue / 2)
        end = this.pageNum + parseInt(this.continue / 2)
        if (start < 1) {
          start = 1
          end = this.continue
        }
        if (end > this.pages) {
          end = this.pages
          start = this.pageNum - this.continue + 1
        }
      }

      return [start, end]
    },
    middleShow() {
      const arr = []
      for (let i = this.startAndEnd[0]; i <= this.startAndEnd[1]; i++) {
        arr.push(i)
      }
      return arr
    },
    step() {
      return parseInt(this.continue / 2)
    }
  },
  methods: {
    goPage(page) {
      this.$emit('goPage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &:active {
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
