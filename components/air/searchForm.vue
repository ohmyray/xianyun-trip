<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          @blur="handleDepartBlur"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          @blur="handleDestBlur"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          @change="handleDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button
          @click="handleSubmit"
          icon="el-icon-search"
          style="width:100%;"
          type="primary"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  data() {
    return {
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      form: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 到达城市
        destCode: '', // 到达城市代码
        departDate: '' // 日期字符串
      },
      // 出发城市列表
      departData: [],
      // 到达城市列表
      destData: []
    }
  },
  mounted() {},
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) return
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        const { data } = res.data
        const newData = data.map((val) => {
          val.value = val.name.replace('市', '')
          return val
        })
        this.departData = newData
        cb(this.departData)
      })
      // eslint-disable-next-line standard/no-callback-literal
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }])
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) return
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        const { data } = res.data
        console.log(data)
        const newData = data.map((val) => {
          val.value = val.name.replace('市', '')
          return val
        })
        this.destData = newData
        cb(this.departData)
      })
      // eslint-disable-next-line standard/no-callback-literal
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }])
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 出发城市失去焦点事件
    handleDepartBlur() {
      if (this.departData.length === 0) {
        return
      }
      this.form.departCity = this.departData[0].value
      this.form.departCode = this.departData[0].sort
    },

    // 目标城市失去焦点事件
    handleDestBlur() {
      if (this.destData.length === 0) {
        return
      }
      this.form.destCity = this.destData[0].value
      this.form.destCode = this.destData[0].sort
    },

    // 确认选择日期时触发
    handleDate(value) {
      console.log(value)
      // this.form.departDate = moment(value).format('YYYY-MM-DD')
      this.form.departDate = value
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      // 表单验证数据
      const rules = {
        depart: {
          value: this.form.departCity,
          message: '请选择出发城市'
        },
        dest: {
          value: this.form.destCity,
          message: '请选择到达城市'
        },
        departDate: {
          value: this.form.departDate,
          message: '请选择出发时间'
        }
      }

      let valid = true // 表单验证结果

      Object.keys(rules).forEach((v) => {
        // 只要有一个结果不通过，就停止循环
        if (!valid) return
        const item = rules[v]

        // 数据字段为空
        if (!item.value) {
          valid = false

          this.$confirm(item.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        }
      })

      // 不通过验证，不需要往下执行
      if (!valid) return

      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    }
  }
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
