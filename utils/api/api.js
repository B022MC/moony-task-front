import { https } from '../http.js'; // 引入刚刚封装好的https
 
class api {
	//获取位置信息
	async getLocation(data) {
		const res = await https({
			url: '/api/location/reverseGeocode', 
			method: 'POST',
			data
		})
		return res
	}
	// 退出登录----
	// async logout() {
	// 	const res = await https({
	// 		url: 'api/user/logout', 
	// 		method: 'post',
	// 	})
	// 	return res
	// }
	
	// 手机登录
	async phonelogin(data) {
		const res = await https({
			url: '/api/user/login', 
			method: 'post',
			data
		})
		return res
	}
	// 获取用户信息
	async getUserInfo() {
		const res = await https({
			url: '/api/user', 
			method: 'get',
		})
		return res
	}
	// 修改用户信息
	async userInfoChange(data) {
		const res = await https({
			url: '/api/user', 
			method: 'put',
			data
		})
		return res
	}
	// 更改用户头像
	// async changeAvater(data) {
	// 	const res = await https({
	// 		url: 'api/base/upload', 
	// 		method: 'post',
	// 		data
	// 	})
	// 	return res
	// }
	// 字母索引的城市列表
	async city() {
		const res = await https({
			url: '/api/areasByFirstLetter', 
			method: 'get',
			
		})
		return res
	}
	
	// 获取所有行业及其关联类别
	async getAllIndustriesWithCategories() {
		const res = await https({
			url: '/api/industrytypes/categories', 
			method: 'get',
		})
		return res
	}
	
	// 用户简历
	async fetchUserResume(data) {
		const res = await https({
			url: '/api/user/resume', 
			method: 'get',
			data
		})
		return res
	}
	
	 // 获取教育信息
	  async getEducation(data) {
	    const response = await https({
	      url: '/api/educations',
	      method: 'get',
	      data
	    });
	    return response;
	  }
	
	  // 根据用户 ID 获取所有教育信息
	  async getAllEducationsByUserId(data) {
	    const response = await https({
	      url: '/api/users/educations',
	      method: 'get',
	      data
	    });
	    return response;
	  }
	
	  // 创建教育信息
	  async createEducation(data) {
	    const response = await https({
	      url: '/api/educations',
	      method: 'post',
	      data
	    });
	    return response;
	  }
	
	  // 更新教育信息
	  async updateEducation(data) {
	    const response = await https({
	      url: '/api/educations',
	      method: 'put',
	      data
	    });
	    return response;
	  }
	
	  // 删除教育信息
	  async deleteEducation(data) {
	    const response = await https({
	      url: '/api/educations',
	      method: 'delete',
	      data
	    });
	    return response;
	  }

	// 更改用户头像
	async changeAvater(data) {
		const res = await https({
			url: '/api/upload', 
			method: 'post',
			data
		})
		return res
	}
	// 获取省市级区域
	async getCityArea(data) {
		const res = await https({
			url: '/api/areasByCity', 
			method: 'get',
			data
		})
		return res
	}
	// 获取所有省份及其下属城市
	async getProvincesWithCities(data) {
		const res = await https({
			url: '/api/provincesWithCities', 
			method: 'get',
		})
		return res
	}
	// 根据多个条件筛选兼职信息
	async filterJobs(data) {
		const res = await https({
			url: '/api/jobs/filter', 
			method: 'POST',
			data
		})
		return res
	}
}
export default new api()