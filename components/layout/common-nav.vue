<template>
	<view>
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" bgColor="#fff">
			<view class="row-center" slot="left">
				<view class="nav-left" @click="navigateTos('/packageHome/city')">
					<text class="city-text">{{ currentCity||"重庆" }}</text>
					<u-icon name="arrow-down" size="15"></u-icon>
				</view>
				<!-- <view class="m-l-20" style="width: 400rpx;" @click="navigateTos('/packageHome/search')">
					<u-search placeholder="搜索你喜欢的兼职" disabled v-model="keyword" shape="round" :showAction="false" :clearabled="true" height="54"></u-search>
				</view> -->
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name:'commonNav',
		
		data() {
			return {
				keyword: '', // 搜索框绑定字段
				currentCity:'',
			};
		},
		onLoad() {
			this.getLocationFromStorageAndSend()
		},
		methods:{
			getLocationFromStorageAndSend() {
			    uni.getStorage({
			        key: 'location',
			        success: (res) => {
			            if (res.data) {
			                // 成功获取到位置信息，现在发送给后端
			                // this.getLocation(res.data);
							this.currentCity = res.data.address_component.district
			            } else {
			                console.error('位置信息不存在');
			            }
			        },
			        fail: (err) => {
			            console.error('获取存储的位置信息失败', err);
			        }
			    });
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	.u-search {
		width: 550rpx;
	}
	/* #endif */
	
	.nav-left {
		display: flex;
		align-items: center;
		.city-text {
			font-size: 26rpx;
			color: #333;
			margin-right: 20rpx;
		}
	}
	
</style>
