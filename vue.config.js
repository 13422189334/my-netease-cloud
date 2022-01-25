module.exports = {
	productionSourceMap:false,
	publicPath:'./',
	devServer: {
			proxy: {
				'/api': {
					target: 'https://music-zlq.vercel.app', //目标接口域名
					changeOrigin: true,             //是否跨域
					secure: true,                   //是否https接口
					pathRewrite: {                  //路径重置
						'^/api': ''
					}
				}
			}
	},
}
