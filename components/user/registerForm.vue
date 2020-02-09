<template>
  <el-form ref="regFormRef" :model="regForm" :rules="regFormRules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="regForm.username" placeholder="用户名手机"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="regForm.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="regForm.nickname" placeholder="你的名字"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="regForm.password"
        placeholder="密码"
        type="password"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input
        v-model="regForm.checkPassword"
        placeholder="确认密码"
        type="password"
      >
      </el-input>
    </el-form-item>

    <el-button @click="handleRegSubmit" type="primary" class="submit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 确认密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      regForm: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        checkPassword: ''
      },
      // 表单规则
      regFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if (!this.regForm.username) {
        this.$confirm('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return false
      }

      if (this.regForm.username.length !== 11) {
        this.$confirm('手机号码格式错误', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return false
      }

      this.$store
        .dispatch('user/captcha', { tel: this.regForm.username })
        .then(({ data: res }) => {
          this.$message.success('模拟手机验证码为：' + res.code)
        })
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.regForm)
      this.$refs.regFormRef.validate((valid) => {
        if (valid) {
          // 注册提交
          const { checkPassword, ...props } = this.regForm
          console.log(props)
          this.$store.dispatch('user/register', props).then((res) => {
            console.log(res.data)
            // 注册后自动登录
            this.$store.commit('user/setUserInfo', res.data)
            this.$message.success('注册成功~~~')
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
