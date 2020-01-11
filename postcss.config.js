
module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      // 手机以iphone6为主要适配器 375十分之一为基准值
      propList: ['*']
    }
  }
}
