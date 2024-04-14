<template>
	<view class="page city-page">
		<u-index-list :indexList="indexList" activeColor="#F56718">
			<view slot="header" class="city-head">
				<view class="head-item">
					<view class="f-s-24 head-text bottom-line">当前定位城市</view>
					<view class="city-list p-30 row center flex-wrap">
						<view class="city-item active row-center m-r-30 m-b-20">{{currentCity}}</view>
					</view>
				</view>
				<!-- view class="head-item">
					<view class="f-s-24 head-text bottom-line">热门城市</view>
					<view class="city-list p-30 row center flex-wrap">
						<view 
						  v-for="(item, index) in hotCitys" :key="index" 
						  class="city-item row-center m-r-30 m-b-20" 
						  @click="chooseHotCity(index)"
						  :class="{'active': hotIndex===index}">
						  {{item.name}}
						</view>

					</view>
				</view> -->
			</view>
			<template v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE
				<u-index-anchor :text="indexList[index]" :key="index"></u-index-anchor>
				 #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="city-list p-30 row center flex-wrap">
						<view 
						  v-for="(item1, index1) in item" :key="index1" 
						  class="city-item row-center m-r-30 m-b-20" 
						  @click="chooseCity(item1, index1)"
						  :class="{'active': item1.check===true}">
						  {{item1.shortname}}
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
	
</template>

<script>
	// 索引列表
	// const indexList = () => {
	// 	const indexList = []
	// 	const charCodeOfA = 'A'.charCodeAt(0)
	// 	// indexList.push("↑")
	// 	// indexList.push("☆")
	// 	for (let i = 0; i < 26; i++) {
	// 		indexList.push(String.fromCharCode(charCodeOfA + i))
	// 	}
	// 	// indexList.push('#')
	// 	console.log('indexList--', indexList);
	// 	return indexList
	// }
	export default {
		data() {
			return {
				currentCity: '', // 添加当前定位城市的属性
				hotIndex: -1,
				hotCitys: [],
				indexList: [],
				itemArr: []
			}
		},
		created() {
			this.getLocationFromStorageAndSend(); // 获取当前定位城市
			// this.fetchHotCitys()
			this.fetchCityList()
		},
		onLoad() {
			// console.log(this.itemArr);
		},
		methods:{
			fetchProvinces() {
    let data = { level: 1 }; // 级别1表示获取省份
    this.$api.city(data).then((response) => {
      if (response && response.statusCode === 200) {
        // 假设返回的省份数据是在response.data中
        this.provinces = response.data;
        // 更新省份列的数据
        this.pickerColumns[0] = this.provinces.map(province => province.name);
      } else {
        console.error('获取省份列表失败:', response);
      }
    }).catch((error) => {
      console.error('请求失败:', error);
    });
  },

  // 根据选中的省份获取城市列表
  fetchCities(provinceName) {
    let data = {
      level: 2, // 级别2表示获取市
      city: provinceName // 传递选中的省份名称作为参数
    };
    this.$api.city(data).then((response) => {
      if (response && response.statusCode === 200) {
        // 假设返回的城市数据是在response.data中
        this.cities = response.data;
        // 更新城市列的数据
        this.pickerColumns[1] = this.cities.map(city => city.name);
        // 由于省份变化导致城市数据更新，需要重置城市选择器的选中状态
        this.resetCitySelection();
      } else {
        console.error('获取城市列表失败:', response);
      }
    }).catch((error) => {
      console.error('请求失败:', error);
    });
  },

  // 当省份选择器的选择变化时调用
  onProvinceChange(selectedProvinceName) {
    // 根据选中的省份更新城市数据
    this.fetchCities(selectedProvinceName);
  },
			getLocationFromStorageAndSend() {
			    uni.getStorage({
			        key: 'location',
			        success: (res) => {
			            if (res.data) {
			                // 成功获取到位置信息，现在发送给后端
			                // this.getLocation(res.data);
							this.currentCity = res.data.address_component.city
			            } else {
			                console.error('位置信息不存在');
			            }
			        },
			        fail: (err) => {
			            console.error('获取存储的位置信息失败', err);
			        }
			    });
			},

			    fetchCityList() {
			      let data = {
					  level: 3
				  }; // 如果你需要发送特定的数据，请在这里定义
			    
			      // 使用 this.$api.city 调用 API，并处理响应
			      this.$api.city(data).then((responses) => {
			        // 检查响应数组中的第二个元素是否存在且状态码为200
			        if (responses[1] && responses[1].statusCode === 200) {
			          const cityList = responses[1].data; // 提取响应数据
			          this.indexList = Object.keys(cityList); // 提取索引列表
			          this.itemArr = Object.values(cityList); // 提取城市数组
			        } else {
			          console.error('获取城市列表失败:', responses);
			        }
			      }).catch((error) => {
			        console.error('请求失败:', error);
			      });
			    },
			   chooseHotCity(index) {
			      this.hotIndex = index;
			      this.resetCitySelection();
			    },
			    chooseCity(item, index) {
			      // 假设我们在这里做一些额外的操作，比如关闭页面或显示提示
			      console.log(`选择了城市：${item.name}`);
			      this.resetCitySelection();
			      item.check = true; // 将当前选择的城市设置为选中状态
			    },
			    resetCitySelection() {
			      // 重置所有城市的选择状态
			      this.itemArr.forEach(group => {
			        group.forEach(city => {
			          city.check = false;
			        });
			      });
			    },
				
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';
	
	/deep/.u-index-list__letter__item__index.data-v-7e596c49 {
		font-size: 28rpx;
		text-align: center;
		line-height: 28rpx;
	}
	
	.city-page {
		background: #eee;
	}
	
	.city-head {
		.head-item {
			.head-text {
				padding: 20rpx 30rpx;
				background: rgb(222, 222, 222);
				border-bottom: 1rpx solid #dadbde;
			}
		}
	}
	
	.city-list {
		box-sizing: border-box;
		.city-item {
			width: 200rpx;
			height: 64rpx;
			border-radius: 6rpx;
			border: 1rpx solid #CCC;
			&.active {
				border: 1rpx solid $primary-color;
				color: $primary-color;
			}
		}
		.city-item:nth-child(3n) {
			margin-right: 0;
		}
	}
	
</style>
