import request from '../request.js'

// 绑定手机号
export function xxx(data) {
  return request.service({
    path: 'api',
    method: 'post',
    data
  })
}
// 用户登录后的信息
	async userInfo(data) {
		const res = await https({
			url: 'api/user', 
			method: 'get',
			data
		})
		return res
	}
	