import { Message } from 'element-ui'

// 网页启动时候执行该文件
export default (data) => {
  // console.log('axios 已执行~~~')
  // console.log(data)
  // 拦截请求的错误
  data.$axios.onError((error) => {
    console.log(error.response)
    const { statusCode, message } = error.response.data
    // 判断状态如果是400， 展示错误信息
    if (statusCode === 400) {
      console.log('执行axios')
      Message.error(message)
    }
  })
}
