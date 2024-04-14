<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow f-s-24 c9 p-40 row-between m-b-30" @click="navigateTos('/packageUser/resume/base-info')">
			<view class="">
				<view class="row center">
					<text class="f-s-40 color m-r-20">{{resume.name||'待补充姓名'}}</text>
					<u-icon name="edit-pen" size="20" color=""></u-icon>
				</view>
				<view class="m-t-b-20">{{resume.sex||'无性别'}} | {{resume.age||'无年龄'}} </view>
				<view>手机：{{resume.phone || '待补充手机号'}}</view>
			</view>
			<image src="../../static/images/icon/index/search-more.png" mode="aspectFill" class="user-avatar"></image>
		</view>
		<!-- 自我评价 -->
		<view class="b-r-12 bg-fff box-shadow f-s-32 color p-40 m-b-30" @click="navigateTos('/packageUser/resume/self-evaluate')">
			<view class="row-between">
				自我评价<u-icon name="edit-pen" size="22" color="#999"></u-icon>
			</view>
			<view class="p-t-30 f-s-26">
				{{resume.SelfEvaluations||'不想评价'}}
			</view>
		</view>
		<!-- 教育经历 -->
		<view class="b-r-12 bg-fff box-shadow f-s-32 color p-40 m-b-30">
			<view class="row-between">
				教育经历<u-icon name="plus-circle" size="22" color="#999" @click="navigateTos('/packageUser/resume/add')"></u-icon>
			</view>
			<u-cell :border="true" v-for="(item,index) in 1" :key="index" isLink>
				<view slot="title" class="c9 f-s-24 p-t-30">
					<view class="">2012-04-2020-03</view>
					<view class="color f-s-26 m-t-b-10">北京大学</view>
					<view class="">博士 软件工程</view>
				</view>
			</u-cell>
		</view>
		<!-- 工作经历 -->
		<!-- <view class="b-r-12 bg-fff box-shadow f-s-32 color p-40 m-b-30">
			<view class="row-between">
				工作经历<u-icon name="plus-circle" size="22" color="#999"></u-icon>
			</view>
			<u-cell :border="true" v-for="(item,index) in 2" :key="index" isLink>
				<view slot="title" class="c9 f-s-24 p-t-30">
					<view class="">2012-04至2020-03</view>
					<view class="color f-s-26 m-t-b-10">公司名称</view>
					<view class="b-r-6 bg-F8F8F8 p-20">工作描述工作描述工作描述工作描述</view>
				</view>
			</u-cell>
		</view> -->
		<!-- 工作期望 -->
		<!-- <view class="b-r-12 bg-fff box-shadow f-s-22 c9 p-40 m-b-30">
			<view class="row-between f-s-32 color">
				工作期望<u-icon name="edit-pen" size="22" color="#999"></u-icon>
			</view>
			<view class="m-t-50">
				<view>期望工作类型</view>
				<view class="f-s-26 color p-t-20 p-b-30">长期兼职</view>
				<view>期望工作日期</view>
				<view class="f-s-26 color p-t-20 p-b-30">不限</view>
				<view>可上班时间</view>
				<view class="f-s-26 color p-t-20 p-b-30">每周1天</view>
				<view>是否支持全职上班</view>
				<view class="f-s-26 color p-t-20 p-b-10">是</view>
			</view>
		</view> -->
		<!-- 技能/证书 -->
	<!-- 	<view class="b-r-12 bg-fff box-shadow f-s-32 color p-40 m-b-30">
			<view class="row-between">
				技能/证书<u-icon name="plus-circle" size="22" color="#999"></u-icon>
			</view>
			<u-cell :border="true" v-for="(item,index) in 2" :key="index" isLink>
				<view slot="title" class="row center c9 f-s-24 p-t-30">
					<image src="../../static/images/icon/index/search-more.png" mode="aspectFill" class="skills-icon"></image>
					<view class="m-l-20">
						<view class="f-s-26 color m-b-20">六级</view>
						<view class="">1145454543646</view>
					</view>
				</view>
			</u-cell>
		</view> -->
		<!-- 技能/证书改进版 -->
		<view class="b-r-12 bg-fff box-shadow f-s-32 color p-40 m-b-30">
		    <view class="row-between">
		        技能/证书<u-icon name="plus-circle" size="22" color="#999" @click="navigateTos('/packageUser/resume/certificate')"></u-icon>
		    </view>
		    <view v-for="(skill, index) in resume.skills" :key="index" class="skill-card p-30 m-t-20" @click="navigateTos('/packageUser/resume/certificate')">
		        <view class="row align-center">
		            <image src="../../static/images/icon/skill.png" mode="aspectFill" class="skill-icon m-r-20"></image>
		            <view>
		                <view class="f-s-26 color">{{ skill.name }}</view>
		                <view class="f-s-20 m-t-10">{{ skill.level }}</view>
		            </view>
		        </view>
		        <view class="row m-t-20">
		            <text class="tag" v-for="(tag, tIndex) in skill.tags" :key="tIndex">{{ tag }}</text>
		        </view>
		    </view>
		</view>

		<!-- 更多模块 -->
		<view v-show="show" class="">
			<!-- 擅长语言 -->
			<!-- <view class="b-r-12 bg-fff box-shadow f-s-24 c9 p-40 m-b-30">
				<view class="row-between f-s-32 color">
					擅长语言<u-icon name="edit-pen" size="22" color="#999"></u-icon>
				</view>
				<view class="m-t-50">
					英语
				</view>
			</view> -->
			<!-- 礼仪模特卡 -->
			<view class="b-r-12 bg-fff box-shadow f-s-24 c9 p-40 m-b-30">
				<view class="row-between f-s-32 color">
					礼仪模特卡<u-icon name="edit-pen" size="22" color="#999"></u-icon>
				</view>
				<view class="m-t-50 row-between">
					<view class="">
						<view>体重</view>
						<view class="color m-t-20">{{ '48' || '-'}}</view>
					</view>
					<view class="">
						<view>胸围</view>
						<view class="color m-t-20">{{ '88' || '-'}}</view>
					</view>
					<view class="">
						<view>鞋码</view>
						<view class="color m-t-20">{{ '37' || '-'}}</view>
					</view>
				</view>
			</view>
			<!-- 相关附件 -->
			<!-- <view class="b-r-12 bg-fff box-shadow f-s-24 c9 p-40 m-b-30">
				<view class="row-between f-s-32 color">
					相关附件<u-icon name="edit-pen" size="22" color="#999"></u-icon>
				</view>
				<view class="m-t-50">
					暂无
				</view>
			</view> -->
		</view>
		
		<!-- 展开/收起更多模块 -->
		<view class="show-more-btn c-white row-center" @click="show=!show">
			<u-icon :name="!show? 'arrow-down' : 'arrow-up'" size="15" color="#fff"></u-icon>
			<text class="m-l-15">{{!show?'展开更多模块':'收起更多模块'}}</text>
		</view>
		<!-- 悬浮按钮 -->
		<JobDragButton :x="500" :y="500" />
		
	</view>
</template>

<script>
	import JobDragButton from '@/components/drag-button/drag-button.vue'
	export default {
		components: {JobDragButton},
		data() {
			return {
				show: false,
				resume: null,
			};
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : null;
			if (userInfo) {
			  this.$store.commit('SET_USER_INFO', userInfo);
			}
		},
		mounted() {
		    // 用户ID作为参数
		    this.fetchUserResume();
		},
		methods: {
		    fetchUserResume() {
			
			  const userId = this.$store.state.userInfo.userId;
		      // 假设你有一个获取用户ID的方法或者已经存储了用户ID
		      let data = {
		          userId: this.userId,
		      };
		      this.$api.fetchUserResume(data).then(response => {
		        this.resume = JSON.stringify(response.data);
		      }).catch(error => {
		        console.error('请求用户简历失败:', error);
		      });
		    },
		  },
	}
</script>

<style lang="scss"scoped>
	@import '@/static/style/variables.scss';
	.user-avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}
	// .skills-icon {
	// 	width: 80rpx;
	// 	height: 80rpx;
	// 	border-radius: 6rpx;
	// }
	
	.show-more-btn {
		width: 100%;
		height: 100rpx;
		background: $primary-color;
		border-radius: 12rpx;
	}
	.skill-card {
	    background: #FFFFFF;
	    border-radius: 12rpx;
	    box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	    padding: 20rpx;
	}
	
	.skill-icon {
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	}
	
	.tag {
	    display: inline-block;
	    background-color: #f0f0f0;
	    color: #666;
	    border-radius: 10rpx;
	    padding: 5rpx 10rpx;
	    font-size: 18rpx;
	    margin-right: 10rpx;
	}

</style>
