<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="row-between" @click="selectAvatar">
			    <view class="f-s-28 color">
			        个人头像
			    </view>
			    <view class="row center">
			        <!-- 如果userInfo.avatar存在，则显示上传的头像，否则显示默认图标 -->
			        <image v-if="userInfo.avatar" :src="userInfo.avatar" class="user-avatar" mode="aspectFill"></image>
			        <image v-else src="../../static/images/icon/index/search-more.png" class="user-avatar" mode="aspectFill"></image>
			        <u-icon name="arrow-right" size="15" color=""></u-icon>
			    </view>
			</view>
			<view class="p-b-30">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="姓名" :required="true" prop="name" borderBottom ref="item1">
						<u--input v-model="userInfo.name" border="none" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="性别" :required="true" prop="sex" borderBottom ref="item1">
						<u-radio-group v-model="sexvalue" placement="row" @change="sexChange">
							<u-radio :customStyle="{margin: ' 0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in sexlist" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="所在城市" :required="true" prop="city" borderBottom ref="item1"
						@click="cityShow = true; hideKeyboard()">
						<u--input v-model="userInfo.city" disabled disabledColor="#ffffff" placeholder="请选择所在城市"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="出生年月" :required="true" prop="birthday" borderBottom
						@click="showBirthday = true; hideKeyboard()" ref="item1">
						<u--input v-model="userInfo.birthday" disabled disabledColor="#ffffff"
							placeholder="请选择出生年月" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="身高" :required="false" prop="height" borderBottom ref="item1">
						<u--input v-model="userInfo.height" border="none" placeholder="请输入您的身高"></u--input>
						<text slot="right">CM</text>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="教育状态" :required="true" prop="edu" borderBottom ref="item1">
						<u-radio-group v-model="eduvalue" placement="row" @change="eduChange">
							<u-radio :customStyle="{margin: '0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in edulist" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="最高学历" :required="true" prop="eduGrade" borderBottom
						@click="showEduGrade = true; hideKeyboard()" ref="item1">
						<u--input v-model="userInfo.eduGrade" disabled disabledColor="#ffffff"
							placeholder="请选择最高学历" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<!-- <u-calendar :show="showBirthday" @confirm="calendarConfirm" @close="calendarClose" confirmDisabledText="请选择出生年月" color="#F56718"></u-calendar> -->
				<u-action-sheet :show="showEduGrade" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showEduGrade = false" @select="eduGradeSelect">
				</u-action-sheet>
				<!-- <u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
					@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker> -->
				<u-datetime-picker
				    :show="showBirthday"
				    :value="birthday"
				    mode="date"
				    :min-date="minDate"
				    :max-date="maxDate"
				    closeOnClickOverlay
				    @confirm="birthdayConfirm"
				    @cancel="birthdayClose"
				    @close="birthdayClose">
				</u-datetime-picker>
				<u-picker :show="cityShow" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cityShow=false"
					@change="changeHandler"></u-picker>
			</view>
		</view>
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="p-b-30">
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="手机号" :required="true" prop="phone" borderBottom ref="item1">
						<u--input v-model="userInfo.phone" border="none" placeholder="请输入您的手机号"></u--input>
					</u-form-item>
					<u-form-item label="邮箱" prop="email" borderBottom ref="item1">
						<u--input v-model="userInfo.email" border="none" placeholder="请输入您的邮箱"></u--input>
					</u-form-item>
					<u-form-item label="QQ号" prop="qq" borderBottom ref="item1">
						<u--input v-model="userInfo.qq" border="none" placeholder="请输入您的QQ号"></u--input>
					</u-form-item>
					<u-form-item label="微信" prop="wx" borderBottom ref="item1">
						<u--input v-model="userInfo.wx" border="none" placeholder="请输入您的微信号"></u--input>
					</u-form-item>
				</u--form>
			</view>
		</view>
		<view class="p-t-b-30 f-s-22 c9 m-b-50">
			注：需填写打<text class="main-color">*</text>号的内容才能保存该模块
		</view>
		<u-button text="保存" shape="circle" color="#F56718" size="large" @click="submit"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minDate: new Date(1980, 0, 1).getTime(), // 从1980年1月1日开始
				maxDate: new Date().getTime(), // 直到当前日期
				labelStyle: {
					fontSize: '26rpx',
					color: '#999',
					width: '200rpx',
					marginLeft: '10rpx'
				},
				// 基本案列数据
				sexlist: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				sexvalue: '男',
				// 基本案列数据
				edulist: [{
						name: '在读',
						disabled: false
					},
					{
						name: '已毕业',
						disabled: false
					}
				],
				eduvalue: '在读',
				showBirthday: false,
				userInfo: {
					name: '',
					avatar:'',
					sex: '男',
					city: '',
					birthday: '',
					edu: '在读',
					edu_grade: '',
					height: '',
					phone:'',
					email:'',
					wechat_id:''
				},
				showEduGrade: false,
				birthday: Number(new Date()),
				cityShow: false,
				columns: [[], []], // 初始化，准备填充省份和城市数据
				actions: [{
						name: '初中',
					},
					{
						name: '高中',
					},
					{
						name: '本科',
					},
					{
						name: '研究生',
					},
					{
						name: '博士',
					},
				],
				rules: {
					name: [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					sex: {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
					city: {
						type: 'string',
						max: 30,
						required: true,
						message: '请选择所在城市',
						trigger: ['blur', 'change']
					},
					birthday: {
						type: 'string',
						required: true,
						message: '请选择生日',
						trigger: ['change']
					},
					edu: {
						type: 'string',
						max: 5,
						required: true,
						message: '请选择教育状态',
						trigger: ['blur', 'change']
					},
					eduGrade: {
						type: 'string',
						max: 5,
						required: true,
						message: '请选择最高学历',
						trigger: ['blur', 'change']
					},
					phone: {
						type: 'string',
						max: 11,
						required: true,
						message: '请输入您的手机号',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		mounted() {
			this.loadUserInfo();
		    this.initAreaDataFromAPI();
		},
		methods: {
			loadUserInfo() {
			            try {
			                // 从localStorage获取用户信息，这里假设存储时的key为'userInfo'
			                const localUserInfo = uni.getStorageSync('userInfo');
			                if (localUserInfo) {
			                    // 如果成功获取到，则更新userInfo数据
			                    this.userInfo = JSON.parse(localUserInfo);
			                } else {
			                    console.log('未找到存储的用户信息');
			                }
			            } catch (e) {
			                console.error('加载用户信息失败:', e);
			            }
			        },
			loadUserInfo() {
            try {
                // 从localStorage获取用户信息，这里假设存储时的key为'userInfo'
                const localUserInfo = uni.getStorageSync('userInfo');
                if (localUserInfo) {
                    // 如果成功获取到，则更新userInfo数据
                    this.userInfo = JSON.parse(localUserInfo);
                } else {
                    console.log('未找到存储的用户信息');
                }
            } catch (e) {
                console.error('加载用户信息失败:', e);
            }
        },
			async changeAvatar(filePath) {
			  try {
			    const uploadResult = await uni.uploadFile({
			      url: 'http://47.108.74.228:50002/api/upload', // 您的API端点地址
			      filePath: filePath,
			      name: 'file', // 后端接收文件的字段名
			      // formData: {}, // 如果需要其他表单数据
			      success: (uploadRes) => {
			        // 这里处理上传成功的回调
			        const data = JSON.parse(uploadRes.data); // 假设响应是JSON格式
			        if (uploadRes.statusCode === 200 && data) {
			          this.userInfo.avatar = 'http://' + data.data; // 更新用户头像URL.
					  console.log("Avatar URL:", this.userInfo.avatar);

			          uni.showToast({
			            title: '头像上传成功',
			            icon: 'success'
			          });
			        } else {
			          uni.showToast({
			            title: '上传失败',
			            icon: 'none'
			          });
			        }
			      },
			      fail: (uploadErr) => {
			        console.error("上传头像失败:", uploadErr);
			        uni.showToast({
			          title: '上传异常',
			          icon: 'none'
			        });
			      }
			    });
			  } catch (error) {
			    console.error("上传头像失败:", error);
			    uni.showToast({
			      title: '上传异常',
			      icon: 'none'
			    });
			  }
			},
			selectAvatar() {
				uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					// 直接传递文件路径进行上传
					this.changeAvatar(tempFilePaths[0]);
				}
			});
			},

			// 初始化省市数据
			async initAreaDataFromAPI() {
			  try {
			    const res = await this.$api.getProvincesWithCities();
			    // 由于我们感兴趣的数据在res数组的第二个元素的data属性中
			    // 我们需要相应地调整我们的数据引用
			    const data = res[1]?.data;
			    
			    if (data && data.length > 0) {
			      this.columns[0] = data.map(provinceItem => provinceItem.province?.shortname).filter(name => name != null);
			      this.columns[1] = data[0].cities.map(city => city.shortname);
			      // 保存完整的省市数据以备后用
			      this.provincesWithCities = data;
			    }
			  } catch (error) {
			    console.error("初始化省市数据失败:", error);
			  }
			},
			// 选择性别
			sexChange(n) {
				console.log('sexChange', n);
				this.userInfo.sex = n
			},
			// 选择教育状态
			eduChange(n) {
				console.log('eduChange', n);
				this.userInfo.edu = n
			},
			// 选择最高学历
			eduGradeSelect(e) {
				this.userInfo.eduGrade = e.name
				this.$refs.form.validateField('eduGrade')
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.form.validateField('birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.form.validateField('birthday')
			},
			calendarConfirm(e) {
				console.log('e', e);
				this.showBirthday = false
				this.userInfo.birthday = `${e[0]} / ${e[e.length - 1]}`
				this.$refs.form.validateField('birthday')
			},
			calendarClose() {
				this.showBirthday = false
				this.$refs.form.validateField('birthday')
			},
			// 选择城市
			changeHandler(e) {
			    const { columnIndex, value } = e;
			    if (columnIndex === 0) {
			        const provinceName = value[0];
			        const provinceData = this.provincesWithCities.find(province => province.province.shortname === provinceName);
			        if (provinceData && provinceData.cities) {
			            this.columns[1] = provinceData.cities.map(city => city.shortname);
			            this.$nextTick(() => {
			                this.$refs.uPicker.setColumnValues(1, this.columns[1]);
			            });
			            // 重置城市选择
			            this.userInfo.city = '';
			        } else {
			            this.columns[1] = [];
			            // 同样需要重置城市选择
			            this.userInfo.city = '';
			        }
			    }
			},



			// 回调参数为包含columnIndex、value、values
			confirm(e) {
			    console.log('confirm', e)
			    const { value } = e;
			    this.cityShow = false;
			
			    // 假设value数组的最后一个元素是用户选择的城市
			    const city = value[value.length - 1];
			    this.userInfo.city = city;
			
			    // 打印最终选择的城市信息，用于调试
			    console.log('选择的城市:', this.userInfo.city);
			},

			 // 表单提交处理函数
			        async submit() {
			            // 首先进行表单验证
			            this.$refs.form.validate().then(async (valid) => {
			                if (valid) {
			                    try {
			                        const response = await this.$api.userInfoChange(this.userInfo);
			                        if (response[1] && response[1].statusCode === 200) {
			                            uni.showToast({
			                                title: '更新成功',
			                                icon: 'success'
			                            });
										// 调用获取用户信息
										this.updateUserInfo();
			                        } else {
			                            uni.showToast({
			                                title: '更新失败',
			                                icon: 'none'
			                            });
			                        }
			                    } catch (error) {
			                        console.error('更新用户信息失败:', error);
			                        uni.showToast({
			                            title: '网络或服务器错误',
			                            icon: 'none'
			                        });
			                    }
			                } else {
			                    uni.showToast({
			                        title: '请检查输入项',
			                        icon: 'none'
			                    });
			                }
			            }).catch((errors) => {
			                console.log('表单验证失败:', errors);
			                uni.showToast({
			                    title: '校验失败',
			                    icon: 'none'
			                });
			            });
			        },
			// 更新用户信息
			async updateUserInfo() {
			    try {
			        const response = await this.$api.getUserInfo();
			        if (response[1] && response[1].statusCode === 200) {
			            const updatedUserInfo = response[1].data.data;
			            uni.setStorageSync('userInfo', JSON.stringify(updatedUserInfo));
			            console.log('用户信息已更新并保存到本地');
			        } else {
			            console.error('获取用户信息失败');
			        }
			    } catch (error) {
			        console.error('获取用户信息异常:', error);
			    }
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
	}	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';
	/deep/.u-radio-group--row {
		align-items: flex-end;
		justify-content: flex-end;
	}

	.user-avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
</style>
