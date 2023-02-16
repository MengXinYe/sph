<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="type-nav-container">
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="navHide"
             @mouseenter="navShow = true">
          <h2 class="all">全部商品分类</h2>
          <transition name="a">
            <div class="sort"
                 v-show="navShow">
              <div class="all-sort-list2"
                   @click="goSearch">
                <div class="item bo"
                     v-for="(item, index) in categoryList"
                     :key="item.categoryId">
                  <h3 @mouseenter="changeIndex(index)"
                      :class="{ cur: currentIndex == index }">
                    <a :data-categroyName="item.categoryName"
                       :data-catagory1Id="item.categoryId">{{ item.categoryName }}</a>
                  </h3>
                  <div class="item-list clearfix"
                       :style="{display: currentIndex == index? 'block' : 'none' }">
                    <div class="subitem">
                      <dl class="fore"
                          v-for="typeTitle in item.categoryChild"
                          :key="typeTitle.categoryId">
                        <dt>
                          <a :data-categroyName="typeTitle.categoryName"
                             :data-catagory2Id="typeTitle.categoryId">{{ typeTitle.categoryName }}</a>
                        </dt>
                        <dd>
                          <em v-for="type in typeTitle.categoryChild"
                              :key="type.categoryId">
                            <a :data-categroyName="type.categoryName"
                               :data-catagory3Id="type.categoryId">{{ type.categoryName }}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MXTypeNav',
  async created() {
    if (this.$route.meta.typeNavShow) {
      this.navShow = false
    }
  },
  computed: {
    ...mapState({
      // 获取联动列表数据
      categoryList(state) {
        return state.home.categoryList
      }
    })
  },
  data() {
    return {
      currentIndex: -1,
      navShow: true
    }
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
    },
    goSearch(e) {
      const { categroyname, catagory1id, catagory2id, catagory3id } = e.target.dataset
      if (categroyname) {
        const location = { name: 'search' }
        const query = { categoryName: categroyname }
        if (catagory1id) {
          query.category1Id = catagory1id
        } else if (catagory2id) {
          query.category2Id = catagory2id
        } else if (catagory3id) {
          query.category3Id = catagory3id
        }
        // 合并params参数
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    },
    navHide() {
      this.currentIndex = -1
      if (this.$route.meta.typeNavShow) {
        this.navShow = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      a {
        cursor: pointer;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.12px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          .cur {
            background-color: skyblue;
          }
        }
      }
    }

    .a-enter {
      height: 0px;
    }
    .a-enter-to {
      height: 461px;
    }
    .a-enter-active {
      transition: all 0.2s ease-out;
    }
  }
}
</style>
