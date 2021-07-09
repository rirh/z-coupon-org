const user = {
	namespaced: true, // 添加命名空间
	state: {
		userInfo: {}
	},
	mutations: {
		updateUserInfo(state, payload) {
			state.userInfo = payload
		},
	},
	actions: {

	}
}
export default user
