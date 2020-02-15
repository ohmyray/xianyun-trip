<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @getData="getData" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item, index) in dataList"
          :key="index"
          :data="item"
        />
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from 'moment'
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  data() {
    return {
      flightsData: {
        info: {},
        flights: [], // 数组
        options: {}
      },
      cacheFlightsData: {
        info: {},
        flights: [], // 数组
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    }
  },

  computed: {
    dataList() {
      if (!this.flightsData.flights) {
        return []
      }
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
      return arr
    }
  },

  mounted() {
    // 请求机票列表数据
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then((res) => {
      this.flightsData = res.data
      this.cacheFlightsData = { ...res.data }
      this.total = this.flightsData.total
    })
  },

  methods: {
    handleSizeChange(index) {
      this.pageSize = index
    },

    handleCurrentChange(index) {
      this.pageIndex = index
    },

    getData(arr) {
      this.flightsData.flights = arr
      // 总条数
      this.total = arr.length
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
