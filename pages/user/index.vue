<template>
	<view class="page user-page">
		<view v-if="isLogged">
					<!-- 用户已登录时显示的内容 -->
					<!-- 用户信息 -->
					<view class="top-block">
						<view class="user-box">
							<u-navbar :safeAreaInsetTop="true" leftIcon=" " :fixed="true" :placeholder="true" bgColor="transparent"></u-navbar>
							<view class="row p-l-r-76 m-t-30">
								<image :src="userInfo.avatar" mode="aspectFill" class="user-avatar m-r-50"></image>
								<view class="">
									<view class="row center">
										<text class="f-s-40 m-r-20">{{ userInfo.name || '默认用户名' }}</text>
										<u-tag text="欢迎" type="warning" shape="circle" @click="navigateTos('/packageUser/real-name')"></u-tag>
									</view>
									<view class="f-s-26 m-t-20">{{ userInfo.phone || '未设置手机号' }}</view>
								</view>
							</view>
						</view>
						
						<view class="my-profile box-shadow row-between bg-fff p-30 m-l-r-30">
							<view class="my-profile-left">
								<LineHead title="我的资料" class="m-b-20" />
								<view class="f-s-24 m-b-20">企业都喜欢完善度比较高的资料哦~</view>
								<view class="my-profile-btn" @click="navigateTos('/packageUser/resume/index')">立即完善</view>
							</view>
							<view class="" style="">
								<!-- <ProgressBar :percent="20" />
								<!-- <ProgressBa2 /> -->
								<!-- <ProgressBar3 /> -->
								<!-- <ProgressBar4 /> -->
								<CircleProgress :percent="20" />
							</view>
						</view>
					</view>
					
					<view class="menu-item box-shadow m-t-30 m-l-30 m-r-30">
						<u-cell title="报名记录" :border="false" isLink url="/packageUser/regist-record/index">
							<u-badge slot="value" :isDot="true" type="error"></u-badge>
						</u-cell>
					</view>
					
					<view class="menu-block box-shadow m-t-30 m-l-30 m-r-30 p-t-b-30 bg-fff">
						<view class="menu-item bottom">
							<u-cell :border="false" isLink>
								<view slot="title" class="" style="width: 160rpx;">
									<button open-type="contact" class="kefu-btn">
										<view class="row-between">
											<text>联系客服</text>
											<text class="tip">欢迎吐槽</text>
										</view>
										</button>
								</view>
								
							</u-cell>
						</view>
						<view class="menu-item bottom">
							<u-cell title="求助反馈" :border="false" isLink url="/packageUser/feedback">
								<text slot="value" class="u-slot-value"></text>
							</u-cell>
						</view>
						<view class="menu-item bottom" @click="logout">
						  <u-cell title="退出登录" :border="false" isLink>
						    <text slot="value" class="u-slot-value"></text>
						  </u-cell>
						</view>
					</view>
		</view>
		
		<!-- 用户未登录时显示的内容 -->
				<view v-else class="unlogged-view">
							<view class="login-prompt">
								<text class="prompt-text">您还未登录，请</text>
								<text class="login-text" @click="navigateToLogin">登录</text>
							</view>
				</view>
			</view>
</template>

<script>
	import { mapState } from 'vuex';
	import ProgressBar from './components/ProgressBar.vue'
	import ProgressBa2 from './components/ProgressBa2.vue'
	import ProgressBar3 from './components/ProgressBar3.vue'
	import ProgressBar4 from './components/ProgressBar4.vue'
	import CircleProgress from './components/circle-progress.vue'
	import LineHead from '@/components/layout/line-head.vue'
	export default {
		components: {ProgressBar, ProgressBa2, ProgressBar3, ProgressBar4, CircleProgress, LineHead},
		data() {
			return {
			}
		},
		
		onShow() {
		  const isLogged = uni.getStorageSync('isLogged');
		  const userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : null;
		
		  this.$store.commit('updateLoginState', isLogged);
		  if (isLogged && userInfo) {
		    this.$store.commit('SET_USER_INFO', userInfo);
		  }
		},
		onLoad() {
		  const token = uni.getStorageSync('Token');
		  if (token) {
		    const isLogged = uni.getStorageSync('isLogged');
		    const userInfoString = uni.getStorageSync('UserInfo');
		    // 确保 userInfoString 不是空字符串
		    if (userInfoString) {
		      try {
		        const userInfo = JSON.parse(userInfoString);
		        // 在这里更新组件的状态或 Vuex store
		        // 例如，更新用户信息状态
		        this.$store.commit('SET_USER_INFO', userInfo);
		      } catch (error) {
		        console.error('解析用户信息时出错:', error);
		        // 可能需要处理解析错误，例如清除无效的本地存储数据
		      }
		    }
		  }
		},
		computed: {
		    // 使用 mapState 辅助函数来获取 Vuex 中的状态
		    ...mapState({
		      // avater_url: state => state.userInfo.avatarUrl,
			  userInfo: state => state.userInfo,
			  isLogged: state => state.isLogged, 
		      // 添加其他需要从 userInfo 获取的状态
		    }),
		  },
		methods: {
			navigateToLogin() {
				// 导航到登录页面的逻辑
				  uni.navigateTo({
				                url: '/pages/login/login'
				});
				console.log('Navigating to Register Page...');
			},
			logout() {
			    // 清除本地存储中的用户信息和token
			    uni.removeStorageSync('Token');
			    uni.removeStorageSync('userInfo');
			    uni.removeStorageSync('isLogged');
			    // 更新 Vuex store 中的状态
			    // this.$store.commit('SET_USER_INFO', {}); // 清空用户信息
			    this.$store.commit('updateLoginState', false); // 设置为未登录状态
			
			    // 提示用户已退出
			    uni.showToast({
			      title: '您已成功退出登录',
			      duration: 2000,
			      icon: 'none'
			    });
			
			    // 导航到登录页面或首页
			    setTimeout(() => {
			      uni.reLaunch({
			        url: '/pages/index/index' // 或其他页面
			      });
			    }, 2000);
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.top-block {
		width: 750rpx;
		height: 600rpx;
		position: relative;
		.user-box {
			width: 750rpx;
			height: 400rpx;
			background: linear-gradient(to right, #E25C41, #E69323);
			border-radius: 0 0 40rpx 40rpx;
			color: #fff;
			.user-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				border: 8rpx solid #FFFFFF;
			}
		}
		
		.my-profile {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 690rpx;
			border-radius: 12rpx;
			box-sizing: border-box;
			color: #999;
			.my-profile-left {
				width: 100%;
				.my-profile-btn {
					width: 180rpx;
					height: 54rpx;
					line-height: 54rpx;
					text-align: center;
					border-radius: 6rpx;
					background: #F56718;
					color: #fff;
					font-size: 24rpx;
				}
			}
			
		}
	}
	
	.menu-block {
		border-radius: 12rpx;
		overflow: hidden;
	}
	
	.menu-item {
		border-radius: 12rpx;
		box-sizing: border-box;
		background: #fff;
		.tip {
			font-size: 24rpx;
			color: #999;
		}
	}
	
	.bottom {
		border-radius: 0;
	}
	
	.kefu-btn {
		border: none;
		background-color: #fff;
		width: 560rpx;
		font-size: 28rpx;
		padding-left: 6rpx !important;
	}
	/deep/button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
		margin-left: 0 !important;
		margin-right: 0 !important;
		padding: 0 !important;
		line-height: 28rpx !important;
}
	
	/deep/button::after {
    content: " ";
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
		margin-left: 0 !important;
		margin-right: 0 !important;
		padding: 0 !important;
}
	.unlogged-view {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 200rpx;
			background-color: #fff;
		}
	
		.login-prompt {
			text-align: center;
		}
	
		.prompt-text, .login-text, .or-text, .register-text {
			margin: 0 10rpx;
		}
	
		.login-text, .register-text {
			color: #E25C41;
			font-weight: bold;
		}
</style>
