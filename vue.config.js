module.exports = {
    productionSourceMap: false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
        proxy: {
            "/api": {
                //请求路径有/api  才会代理
                target: "http://gmall-h5-api.atguigu.cn",
            },
        },
    },
};