<template>
    <view>
        <!-- 地点 -->
        <view class="place-box row-between m-t-20 m-b-40 p-l-r-30">
            <view class="row-center place-box-left">
                        <u-icon name="reload" size="15" color=""></u-icon>
                        <text class="f-s-22 job-inline m-l-15">{{ currentAddress }}</text>
            </view>
            <view class="row-center place-box-right">
                <u-picker mode="selector" v-model="selectedDistanceIndex" :range="distanceList" @change="onDistanceChange">
                    <view class="picker-display">
                      <text class="f-s-22 m-r-15 job-inline">{{ selectedDistance}}</text>
                      <u-icon name="arrow-down" size="12" color=""></u-icon>
                    </view>
                  </u-picker>
            </view>
        </view>
        <JobList :list="jobList"></JobList>
    </view>
</template>

<script>
	
    import JobList from '@/components/list/job-list.vue'
	// import {mapState} from 'vuex'
    export default {
        components: { JobList },
        data() {
            return {
				selectedDistanceIndex: 0, // 新增，用于v-model双向绑定选中项的索引
				distanceList: ['5公里内', '10公里内', '15公里内', '20公里内'], // 修改为你想要显示的内容
				selectedDistance: '5公里内', // 默认显示的距离
				
				currentAddress: '', // 当前位置
				jobList:[
              	{
              		title:'在家线上学习PS做兼职',
              		level: 0,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司',
              		good: 0,
              		place: '江南'
              	},{
              		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
              		level: 1,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
              		good: 1,
              		place: '江南江南江南江南江南江南江南江南江南江南'
              	},{
              		title:'在家线上学习PS做兼职',
              		level: 0,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司',
              		good: 0,
              		place: '江南'
              	},{
              		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
              		level: 1,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
              		good: 1,
              		place: '江南江南江南江南江南江南江南江南江南江南'
              	},{
              		title:'在家线上学习PS做兼职',
              		level: 0,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司',
              		good: 0,
              		place: '江南'
              	},{
              		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
              		level: 1,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
              		good: 1,
              		place: '江南江南江南江南江南江南江南江南江南江南'
              	},{
              		title:'在家线上学习PS做兼职',
              		level: 0,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司',
              		good: 0,
              		place: '江南'
              	},{
              		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
              		level: 1,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
              		good: 1,
              		place: '江南江南江南江南江南江南江南江南江南江南'
              	},{
              		title:'在家线上学习PS做兼职',
              		level: 0,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司',
              		good: 0,
              		place: '江南'
              	},{
              		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
              		level: 1,
              		money: '200元/天',
              		labels:[
              			{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},{
              				text: '企业直招',
              				blue: 1
              			},{
              				text: '有提成',
              				blue: 0
              			},
              		],
              		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
              		good: 1,
              		place: '江南江南江南江南江南江南江南江南江南江南'
              	},
              ]
            }
        },
         onLoad: function() {
                 this.getLocationFromStorageAndSend();
            },
            methods: {
					// 选择距离事件处理
				    onDistanceChange(event) {
				         const index = event.detail.value; // 获取选中项的索引
				         this.selectedDistance = this.distanceList[index]; // 更新选中的距离
				       },
                    // 从Storage获取位置
                            getLocationFromStorageAndSend() {
                                uni.getStorage({
                                    key: 'location',
                                    success: (res) => {
                                        if (res.data) {
                                            // 成功获取到位置信息，现在发送给后端
                                            // this.getLocation(res.data);
											this.currentAddress = res.data.formatted_addresses.standard_address
                                        } else {
                                            console.error('位置信息不存在');
                                        }
                                    },
                                    fail: (err) => {
                                        console.error('获取存储的位置信息失败', err);
                                    }
                                });
                            },
					 // 调用后端API获取地址
					// getLocation(data) {
					//     this.$api.getLocation(data).then((responses) =>{
					// 		if (responses[1] && responses[1].statusCode === 200) { // 更新此行
					// 			const LocationInfo = responses[1].data; // 更新此行
								
					// 			this.currentAddress = LocationInfo.result.formatted_addresses.standard_address;
					// 			  // 将获取到的 result 存入本地存储
					// 			uni.setStorageSync('location', result);
					// 		  }else{
					// 			  console.error('获取当前位置失败:', responses);
					// 		  }
					// 		  }).catch((error) => {
					// 			console.error('请求失败:', error);
					// 		});
					// },
						  
			}
    }
</script>

<style lang="scss" scoped>
    .select-box {
        padding: 6rpx 20rpx;
        background-color: #eee;
        border-radius: 20rpx;
    }
    
    .place-box {
        color: #999;
        box-sizing: border-box;
        .place-box-left {
            width: 460rpx;
        }
        .place-box-right {
            width: 180rpx;
        }
    }
    
    .near-select-block {
        height: 88rpx;
    }
</style>