<template>
  <view class="viewport">
    <view class="logo">
      <image src="/static/images/login/logo.png"></image>
    </view>
    <view class="login">
      <!-- 微信授权登录按钮 -->
      <button class="button wechat" @click="weixinLogin">
        <text class="icon icon-wechat"></text>微信授权登录
      </button>
      <view class="roi">
        <view class="choose" v-if="!roi" @click="xuanze"></view>
        <image src="/static/images/login/choose.png" class="choose1" v-if="roi" @click="xuanze"></image>
        <view class="read">请仔细阅读 <text style="color: #FE6A4A" @click="go($store.state.agreementList.provacy)">《隐私协议》</text>和<text style="color: #FE6A4A" @click="go($store.state.agreementList.user)">《用户协议》</text></view>
      </view>
    </view>
  </view>
</template>


<script>

export default {
	data() {
	    return {
	      roi: false, // 初始未勾选状态
	    };
	  },
  onLoad() {
    this.weixinLogin() // 直接调用微信登录方法
  },
  methods: {

	// 获取用户登录code
		getUserLoginCode(userInfo) {
	      uni.login({
	        provider: "weixin",
	        success: (loginRes) => {
	          this.handleLogin(loginRes.code, userInfo);
	        }
	      });
	    },
    // 微信登录方法
     weixinLogin() {
          if (!this.roi) {
            uni.showToast({
              icon: 'none',
              title: '请勾选协议',
              duration: 2000
            });
            return;
          }
          console.log('开始微信登录流程');
          // 直接请求用户授权
          this.requestUserProfile();
        },
		requestUserProfile() {
		      uni.getUserProfile({
		        desc: '用于完善会员资料',
		        success: (res) => {
		          console.log('授权成功，用户信息:', res.userInfo);
		          // 用户同意授权后，继续获取登录code并处理登录逻辑
		          uni.login({
		            provider: "weixin",
		            success: (loginRes) => {
		              console.log('code返回成功，code:', loginRes.code);
		              this.handleLogin(loginRes.code, res.userInfo); // 处理登录
		            }
		          });
		        },
		        fail: () => {
		          uni.showToast({
		            title: '授权失败，无法继续',
		            icon: 'none'
		          });
		        }
		      });
		    },
		handleLogin(code, userInfo) {
		  console.log('用户信息:', userInfo);
		  let data = {
		    loginType: "weixin",
		    weixin: {
		      code: code,
		      userInfo: userInfo // 后端需要用户信息来创建或更新用户记录
		    }
		  };
		  // 在这里使用了某种方法导致响应以数组形式返回
		  this.$api.phonelogin(data).then((responses) => {
		    // 确保检查responses是否为数组，并且长度足够
		    if (Array.isArray(responses) && responses.length > 1 && responses[1]) {
		      const actualResponse = responses[1]; // 获取实际的响应对象
		      if (actualResponse.data && actualResponse.data.data && actualResponse.data.data.token) {
		        console.log('登录成功，响应:', actualResponse);
				this.isLogged = true; // 更新登录状态
		        uni.setStorageSync('Token', actualResponse.data.data.token); // 保存token
				uni.setStorageSync('userInfo', JSON.stringify(actualResponse.data.data.userInfo));
				uni.setStorageSync('isLogged', true);
				// this.$store.commit('SET_USER_INFO', userInfo); // 使用commit触发mutation更新用户信息
		        uni.showToast({
		          icon: 'success',
		          title: '登录成功',
		          duration: 2000
		        });
		        // 登录成功后的页面跳转
		        uni.reLaunch({
		          url: '/pages/index/index'
		        });
		      } else {
		        console.log('登录失败，响应数据有误:', actualResponse);
		        uni.showToast({
		          icon: 'none',
		          title: '登录失败，请重试',
		          duration: 2000
		        });
		      }
		    } else {
		      console.error('响应格式不正确或响应缺失:', responses);
		    }
		  }).catch(error => {
		    console.error('登录请求失败:', error);
		    uni.showToast({
		      icon: 'none',
		      title: '登录请求失败，请重试',
		      duration: 2000
		    });
		  });
		},
	xuanze() {
		this.roi = !this.roi
	}
  },
}
</script>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20rpx;
}

.logo image {
  width: 220rpx;
  height: 220rpx;
  margin-top: 15vh;
}

.login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  width: 80%;
  height: 80rpx;
  background-color: #06c05f;
  border-radius: 40rpx;
  color: #fff;
  font-size: 28rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rpx;
}

.icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.roi {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
  cursor: pointer;
}

.choose, .choose1 {
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
  border: 1rpx solid #CCCCCC;
  display: flex;
  justify-content: center;
  align-items: center;
}

.choose {
  background-color: #fff;
}

.choose1 {
  background-image: url('/static/images/login/choose.png');
  background-size: cover;
}

.read {
  font-size: 24rpx;
  color: #666;
}

.read text {
  color: #FE6A4A;
  cursor: pointer;
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}

</style>