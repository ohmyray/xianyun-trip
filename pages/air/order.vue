<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <OrderForm />

      <OrderAside :data="$store.state.air.orderDetail" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/orderAside.vue'

export default {
  components: {
    OrderForm,
    OrderAside
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
