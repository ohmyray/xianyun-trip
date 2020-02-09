<template>
  <el-form ref="regFormRef" :model="regForm" :rules="regFormRules" class="form">
    <el-form-item class="form-item">
      <el-input placeholder="用户名手机"> </el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="你的名字"> </el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="确认密码" type="password"> </el-input>
    </el-form-item>

    <el-button @click="handleRegSubmit" type="primary" class="submit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      regForm: {},
      // 表单规则
      regFormRules: {}
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {},

    // 注册
    handleRegSubmit() {
      console.log(this.form)
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
