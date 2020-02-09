<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    class="form"
  >
    <el-form-item class="form-item" prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名/手机">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="loginForm.password" placeholder="密码" type="password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button @click="handleLoginSubmit" type="primary" class="submit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.username !== '') {
          this.$refs.loginFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      // 表单数据
      loginForm: {
        username: '', // 登录用户名/手机
        password: '' // 登录密码
      },
      // 表单规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名/手机', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      console.log(this.loginForm)
      // valid是全部字段验证通过才会返回true
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // console.log(111)
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'POST',
          //   data: this.loginForm
          // }).then((res) => {
          //   console.log(res)
          // })
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            // console.log(res.data)
            this.$message({
              message: '登录成功，正在跳转~~~',
              type: 'success'
            })
            this.$router.push({ path: '/' })
          })
        }
        // console.log(222)
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
