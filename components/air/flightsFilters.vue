<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <!-- 机场列表 -->
        <el-select
          v-model="airport"
          @change="handleAirport"
          size="mini"
          placeholder="起飞机场"
        >
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 起飞时间列表 -->
        <el-select
          v-model="flightTimes"
          @change="handleFlightTimes"
          size="mini"
          placeholder="起飞时间"
        >
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 航空公司 -->
        <el-select
          v-model="company"
          @change="handleCompany"
          size="mini"
          placeholder="航空公司"
        >
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 机型列表 -->
        <el-select
          v-model="airSize"
          @change="handleAirSize"
          size="mini"
          placeholder="机型"
        >
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        @click="handleFiltersCancel"
        type="primary"
        round
        plain
        size="mini"
      >
        撤销
      </el-button>
    </div>
    <!-- 渲染空的字符串，只需要监听功能 -->
    <span>{{ filter }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小

      airSizeList: [
        // 机型大小的列表
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },

  computed: {
    filter() {
      const newData = this.data.flights.filter((v) => {
        let valid = true
        if (this.company && v.airline_name !== this.company) {
          valid = false
        }
        if (this.airSize && v.plane_size !== this.airSize) {
          valid = false
        }
        if (this.airport && v.org_airport_name !== this.airport) {
          valid = false
        }
        if (this.flightTimes) {
          const arr = this.flightTimes.split(',') // ["6","12"]
          const hours = Number(v.dep_time.split(':')[0])
          if (Number(arr[0]) > hours || hours >= Number(arr[1])) {
            valid = false
          }
        }
        return valid
      })
      this.$emit('getData', newData)
      return ''
    }
  },

  methods: {
    // 选择机场时候触发
    handleAirport(value) {},

    // 选择出发时间时候触发
    handleFlightTimes(value) {},

    // 选择航空公司时候触发
    handleCompany(value) {},

    // 选择机型时候触发
    handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = '' // 机场
      this.flightTimes = '' // 出发时间
      this.company = '' // 航空公司
      this.airSize = '' // 机型大小
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
