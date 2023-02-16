<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list"
            v-for="item in getShopCarts"
            :key="item.skuId">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked="item.isChecked"
                   @change="change(item, $event)">
          </li>
          <li class="cart-list-con2">
            <img v-lazy="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)"
               class="mins"
               @click="skuNumChange(item, -1)">-</a>
            <input autocomplete="off"
                   type="text"
                   :value="item.skuNum"
                   minnum="1"
                   class="itxt"
                   @change="skuNumChange(item, $event.target.value - item.skuNum)">
            <a href="javascript:void(0)"
               class="plus"
               @click="skuNumChange(item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;"
               class="sindelet"
               @click="removeOne(item)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               :checked="(allSelect && getShopCarts.length !== 0)"
               @change="changeAllSelect">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;"
           @click="removeMore">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney"> {{ total }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'MXShopCart',
  data() {
    return {}
  },
  mounted() {
    this.getCart()
  },
  computed: {
    ...mapGetters(['getShopCarts']),
    total() {
      let result = 0
      this.getShopCarts.forEach(item => {
        if (item.isChecked) {
          result += item.skuNum * item.skuPrice
        }
      })
      return result
    },
    allSelect() {
      return this.getShopCarts.every(item => item.isChecked === 1)
    }
  },
  methods: {
    getCart() {
      this.$store.dispatch('getShopCart')
    },
    skuNumChange: throttle(function(skuInfo, updateNum) {
      let num = 0
      switch (updateNum) {
        case 1:
          num++
          break
        case -1:
          num = skuInfo.skuNum > 1 ? -1 : 0
          break
        default:
          if (isNaN(updateNum) || updateNum < 0) {
            num = 0
          } else {
            num = Math.floor(updateNum)
          }
          break
      }
      this.$store
        .dispatch('updatedNum', { skuId: skuInfo.skuId, skuNum: num })
        .then(value => {
          this.$message({
            message: value,
            type: 'success',
            duration: 1000
          })
          this.getCart()
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'warning',
            duration: 1000
          })
        })
    }, 1000),
    async change(skuInfo, e) {
      const check = e.target.checked ? 1 : 0
      await this.$store.dispatch('updateCheck', { skuId: skuInfo.skuId, isChecked: check })
      this.getCart()
    },
    async changeAllSelect(e) {
      const check = e.target.checked ? 1 : 0
      if (check) {
        this.getShopCarts.forEach(async item => {
          await this.$store.dispatch('updateCheck', { skuId: item.skuId, isChecked: check })
          this.getCart()
        })
      } else {
        this.getShopCarts.forEach(async item => {
          item.isChecked = 0
          await this.$store.dispatch('updateCheck', { skuId: item.skuId, isChecked: check })
          this.getCart()
        })
      }
    },
    async removeOne(skuInfo) {
      await this.$store.dispatch('updateSku', { skuId: skuInfo.skuId })
      this.getCart()
    },
    async removeMore() {
      this.getShopCarts.forEach(async item => {
        if (item.isChecked) {
          await this.$store.dispatch('updateSku', { skuId: item.skuId })
          this.getCart()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
