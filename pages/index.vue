<template>
  <div class="container">
    <el-carousel :interval="8000" arrow="always" height="700px">
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        :style="
          `background: url(${item.url}) center center no-repeat;
                  background-size: contain contain;`
        "
      >
        <!-- <img :src="item.url" alt="" /> -->
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: tabActive === index }"
            @click="handleTab(index)"
          >
            <i>{{ item.title }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="tabs[tabActive].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // banners 轮播图
      banners: [
        { url: 'http://157.122.54.189:9095/assets/images/th02.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th03.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th01.jfif' }
      ],
      // tab 栏选项
      tabs: [
        { title: '攻略', placeholder: '搜索城市' },
        { title: '酒店', placeholder: '请输入城市搜索酒店' },
        { title: '机票', placeholder: '' }
      ],
      // tab 被激活索引
      tabActive: 0
    }
  }, // -- data end --
  mounted() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      const { data: res } = await this.$axios({
        url: '/scenics/banners'
      })
      console.log(res.data)
      console.log(this.$axios.defaults.baseURL)
      const baseURL = this.$axios.defaults.baseURL
      this.banners = res.data.map((item) => {
        item.url = baseURL + item.url
        return item
      })

      console.log(this.banners)
    },
    handleTab(index) {
      if (index === 2) {
        this.$router.push({ path: 'air' })
      }
      this.tabActive = index
    }
  }
}
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
