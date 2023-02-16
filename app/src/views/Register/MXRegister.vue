<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html"
             target="_blank">登陆</a>
        </span>
      </h3>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               size="small"
               :label-position="labelPosition"
               label-width="96px"
               class="demo-ruleForm">
        <el-form-item label="手机号:"
                      class="content"
                      prop="phone"
                      required>
          <el-input type="text"
                    v-model="ruleForm.phone"
                    autocomplete="off"
                    placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码:"
                      class="content"
                      prop="code"
                      required>
          <el-input type="text"
                    v-model="ruleForm.code"
                    autocomplete="off"
                    placeholder="输入验证码"></el-input>
          <button @click.prevent="getCode"
                  style="height: 36px; padding: 1px">获取验证码</button>
        </el-form-item>

        <el-form-item label="密码"
                      prop="pass"
                      class="content"
                      required>
          <el-input type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="checkPass"
                      class="content"
                      required>
          <el-input type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <div class="controls">
          <input name="m1"
                 type="checkbox"
                 v-model="agree">
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg" v-show="!agree">请同意协议</span>
        </div>
        <el-form-item class="btn">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MXRegister',
  data() {
    const checkPhone = (rule, value, cb) => {
      if (!value) {
        cb(new Error('输入手机号'))
      } else {
        const regExp = /^1[34578]\d{9}$/
        if (regExp.test(value)) {
          cb()
        } else {
          cb(new Error('输入正确的手机号'))
        }
      }
    }
    const checkbox = (rule, value, cb) => {
      if (!value) {
        cb(new Error('输出验证码'))
      } else {
        value === this.$store.state.user.code ? cb() : cb(new Error('验证码错误'))
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      agree: true,
      ruleForm: {
        phone: '',
        code: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        code: [{ validator: checkbox, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getCode() {
      const { phone } = this.ruleForm
      if (phone) {
        await this.$store
          .dispatch('getCode', phone)
          .then(() => {
            this.ruleForm.code = this.$store.state.user.code
          })
          .catch(e => {
            this.$message.error(e)
          })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.agree) {
          this.$store
            .dispatch('userRegister', { phone: this.ruleForm.phone, code: this.ruleForm.code, password: this.ruleForm.pass })
            .then(() => {
              this.$router.push('/login')
            })
            .catch(e => this.$message.error(e))
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    /deep/ .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
      .el-input {
        display: inline;

        .el-input__icon {
          margin: aut0 0px autp 0px;
        }
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
