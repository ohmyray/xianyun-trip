<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <!-- 乘机人一组信息，循环users -->
        <div
          :key="index"
          v-for="(item, index) in form.users"
          class="member-info-item"
        >
          <el-form-item label="乘机人类型">
            <!-- 需要进行双向数据绑定 -->
            <el-input
              v-model="item.username"
              placeholder="姓名"
              class="input-with-select"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              v-model="item.id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option :checked="true" label="身份证" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span @click="handleDeleteUser(index)" class="delete-user">-</span>
        </div>
      </el-form>

      <el-button @click="handleAddUsers" class="add-member" type="primary"
        >添加乘机人</el-button
      >
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <!-- 循环渲染保险数据 -->
        <div
          v-for="(item, index) in infoData.insurances"
          :key="index"
          class="insurance-item"
        >
          <el-checkbox
            @change="handleInsurance(item.id)"
            :label="
              `${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`
            "
            border
          >
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="form.contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="handleSubmit" type="warning" class="submit"
          >提交订单</el-button
        >
      </div>
    </div>
    <span>{{ allPrice }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 乘机人的列表
        users: [
          {
            username: '',
            id: ''
          }
        ],
        insurances: [],
        contactName: '',
        contactPhone: '',
        captcha: '',
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },

      infoData: {}
    }
  },
  computed: {
    // 总价格，展示在侧边栏组件
    allPrice() {
      if (!this.infoData.seat_infos) {
        return
      }

      let price = 0
      // 单价
      price += this.infoData.seat_infos.org_settle_price
      // 基建燃油费
      price += this.infoData.airport_tax_audlet
      // 保险
      this.infoData.insurances.forEach((v) => {
        // 如果选中的id数组包含了当前的保险id，需要加上保险的价格
        if (this.form.insurances.includes(v.id)) {
          price += v.price
        }
      })
      // 人数的数量
      price *= this.form.users.length
      // 把总价保存到store
      this.$store.commit('air/setAllPrice', price)
      return ''
    }
  },
  mounted() {
    // 请求机票详细信息
    // eslint-disable-next-line camelcase
    const { id, seat_xid } = this.$route.query
    this.$axios({
      url: '/airs/' + id,
      params: {
        seat_xid
      }
    }).then((res) => {
      // 赋值给机票的详细信息
      this.infoData = res.data
      this.$store.commit('air/setOrderDetail', this.infoData)
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: '',
        id: ''
      })
    },

    // 处理保险数据的
    handleInsurance(id) {
      // 先判断数组中是否存在该id
      const index = this.form.insurances.indexOf(id)

      // 有了这个id，说明当前是取消的状态
      if (index > -1) {
        // 删除该id
        this.form.insurances.splice(index, 1)
      } else {
        // 新增
        this.form.insurances.push(id)
      }
    },
    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.form.contactPhone) {
        this.$message.error('手机号码不能为空')
        return
      }
      this.$store
        .dispatch('user/sendCaptcha', this.form.contactPhone)
        .then((res) => {
          this.$message.success('验证码：000000')
        })
    },

    // 提交订单
    handleSubmit() {
      // 自定义表单的验证
      const rules = {
        // 校验用户列表
        users: {
          errMessage: '乘机人信息不能为空',
          validator: () => {
            let valid = true
            this.form.users.forEach((v) => {
              if (!v.username || !v.id) {
                valid = false
              }
            })

            return valid
          }
        },

        // 校验联系人
        contactName: {
          errMessage: '联系人不能为空',
          validator: () => {
            return !!this.form.contactName
          }
        },

        // 校验手机号码
        contactPhone: {
          errMessage: '手机号码不能为空',
          validator: () => {
            return !!this.form.contactPhone
          }
        },

        // 校验验证码
        captcha: {
          errMessage: '验证码不能为空',
          validator: () => {
            return !!this.form.captcha
          }
        }
      }

      // 先假设所有校验都是通过的
      let valid = true
      Object.keys(rules).forEach((v) => {
        if (!valid) return
        const item = rules[v]
        // 执行每个字段下的validator函数
        valid = item.validator()
        if (!valid) {
          this.$message.error(item.errMessage)
        }
      })
      if (!valid) return
      this.$axios({
        url: '/airorders',
        method: 'POST',
        data: this.form,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then((res) => {
        this.$message.success('订单提交成功')
      })
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
