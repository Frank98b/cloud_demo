module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //能够把所有元素的px单位转成rem
            //rootValue：转换px的基准值，例如75px则转换成rem后为2rem
            rootValue: 37.5,
            propList: ['*']
        }
    }
}