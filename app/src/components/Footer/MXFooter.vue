<template>
  <div id="footer-container">
    <ul class="list-1">
      <li><a href="javascript:;">购物流程</a></li>
      <li><a href="javascript:;">会员介绍</a></li>
      <li><a href="javascript:;">生活银行/团购</a></li>
      <li><a href="javascript:;">常见问题</a></li>
      <li><a href="javascript:;">购物指南</a></li>
    </ul>
    <ul class="list-2">
      <li><a href="javascript:;">上门自取</a></li>
      <li><a href="javascript:;">211限时达</a></li>
      <li><a href="javascript:;">配送服务查询</a></li>
      <li><a href="javascript:;">配送费收取标准</a></li>
      <li><a href="javascript:;">海外配送</a></li>
    </ul>
    <ul class="list-3">
      <li><a href="javascript:;">活动付款</a></li>
      <li><a href="javascript:;">在线支付</a></li>
      <li><a href="javascript:;">分期付款 </a></li>
      <li><a href="javascript:;">公司转账</a></li>
    </ul>
    <ul class="list-4">
      <li><a href="javascript:;">售后政策</a></li>
      <li><a href="javascript:;">价格保护</a></li>
      <li><a href="javascript:;">退款说明</a></li>
      <li><a href="javascript:;">返修/退换货</a></li>
      <li><a href="javascript:;">取消订单</a></li>
    </ul>
    <ul class="list-5">
      <li><a href="javascript:;">夺宝岛</a></li>
      <li><a href="javascript:;">DIY装机</a></li>
      <li><a href="javascript:;">延保服务</a></li>
      <li><a href="javascript:;">尚品汇E卡</a></li>
      <li><a href="javascript:;">尚品汇通信</a></li>
    </ul>
    <ul class="list-6">
      <div>
        <img src="./image/ewm.jpg">
        <el-button type="text"
                   @click="open">点击查看</el-button>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MXFooter',

  methods: {
    open() {
      const url = require('./image/ewm.jpg')
      this.$MessageBox.alert(`<img src = "${url}" style = "width: 200px; height: 200px;"/>`, '扫码了解更多', {
        dangerouslyUseHTMLString: true,
        center: true
      })
    }
  }
}
</script>

<style scoped lang="less">
#footer-container {
  background-color: rgb(230, 224, 224);
  display: flex;
  padding: 50px 250px;
  justify-content: space-evenly;

  .list-6 {
    div {
      height: 90px;
      width: 100px;
      background-color: rgb(88, 87, 87);
      padding: 5px 0px;
      text-align: center;
      img {
        width: 75px;
        height: 75px;
      }
      /deep/ .el-button {
        margin-top: -12px;
        span {
          color: white;
        }
      }
    }
  }
  .list-1::before {
    content: '购物指南';
    font-weight: bolder;
    font-size: 16px;
  }
  .list-2::before {
    content: '配送方式';
    font-weight: bolder;
    font-size: 16px;
  }
  .list-3::before {
    content: '支付方式';
    font-weight: bolder;
    font-size: 16px;
  }
  .list-4::before {
    content: '售后服务';
    font-weight: bolder;
    font-size: 16px;
  }
  .list-5::before {
    content: '特色服务';
    font-weight: bolder;
    font-size: 16px;
  }
  .list-6::before {
    content: '帮助中心';
    font-weight: bolder;
    font-size: 16px;
  }
}
</style>
