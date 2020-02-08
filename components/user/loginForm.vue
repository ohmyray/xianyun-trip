<template>
  <el-form :model="form"
           ref="form"
           :rules="rules"
           class="form">

    <el-form-item class="form-item">
      <el-input v-model="form.username"
                placeholder="用户名/手机">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.password"
                placeholder="密码"
                type="password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit"
               type="primary"
               @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>

</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit () {
      /* console.log(this.form)

      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.loginForm)
          this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: this.form
          }).then(res => {
            console.log(res)
          })
        }
      }) */

      // valid是全部字段验证通过才会返回true
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            const { data } = res;
            // 把data存到store|vuex
            // this.$store.state.user.userInfo = data;
            // 保存到本地
            // localStorage.setItem("store", JSON.stringify(data));
            // 调用mutations的方法，把data存到store|vuex
            this.$store.commit("user/setUserInfo", data);

            // 跳转到首页
            // this.$router.push("/")
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
