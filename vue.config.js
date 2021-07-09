module.exports = {
	chainWebpack: (config) => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
			const compress = args[0].terserOptions.compress
			// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
			compress.drop_console = true
			compress.pure_funcs = [
				'__f__', // App 平台 vue 移除日志代码
				// 'console.debug' // 可移除指定的 console 方法
			]
			return args
		})
		config
			.plugin('define')
			.tap(args => {
				args[0]['process.env'].VUE_APP_USER_HOST =
					'"https://8597e222-5d79-4aba-8825-7d8c02733833.bspapp.com/http"'
				args[0]['process.env'].VUE_APP_COMMENT_HOST =
					'"https://5e516231-7091-404c-898a-eff20ed3f819.bspapp.com/http"'
				return args
			})
	}
}
