<!-- index.vue -->
<template>
	<view class="page">
		<CommonNav />
		<u-sticky :offset-top="sysNav.top + sysNav.height">
			<view class="">
				<view class="bg-fff p-t-b-20 row f-s-22 top-cate-block">
					<view v-for="(item,index) in topList" :key="index" class="row-center select-box" @click="()=>{handler().openSelect(index)}">
						<text class="m-r-10" :class="{'main-color': current === index }">{{item.label}}</text>
						<u-icon :name="current === index? 'arrow-up' : 'arrow-down'" :color="current === index? '#F56718' : ''" size="9"></u-icon>
					</view>
				</view>
				<!-- 筛选下拉框 -->
				<DropdownMenu ref="dropdown" @mask="()=>handler().closeMask()">
					<!-- 类型 -->
					<view v-if="current===0">
						<DropdownItem :list.sync="typeList" menuType="type" @submit="(e)=>handler().submitType(e)" />
					</view>
					<!-- 区域 -->
					<view v-if="current===1">
						<DropdownItem menuType="area" :list="areaList" @submitArea="(val)=>handler().submitArea(val)" />
					</view>
					<!-- 排序 -->
					<view v-if="current===2">
						<!-- <DropdownItem menuType="sort" :list="sortList" :sortIdx.sync="sortIdx" @selectSort="(val)=>handler().selectSort(val)" /> -->
						<DropdownItem menuType="sort" :list="sortList" :sortIdx="sortIdx" @selectSort="(val)=>handler().selectSort(val)" @updateSortIndex="updateSortIdx" />
					</view>
					<!-- 筛选 -->
					<view v-if="current===3">
						<DropdownItem menuType="filter" :list="filterList" @submitFilter="(arr, status)=>handler().submitFilter(arr, status)" />
					</view>
					
				</DropdownMenu>
			</view>
		</u-sticky>
		
		<JobList :list="jobList"></JobList>
	</view>
</template>

<script>
	import CommonNav from '@/components/layout/common-nav.vue'
	import JobList from '@/components/list/job-list.vue'
	import DropdownMenu from './components/dropdown-menu.vue'
	import DropdownItem from './components/dropdown-item.vue'
	import {mapState} from 'vuex'
	export default {
		components: { CommonNav, JobList, DropdownMenu, DropdownItem },
		data() {
			return {
				jobList: [],
				selectedType: '', // 选中的类型
				selectedCityId: '', // 选中的城市ID
				selectedLevel: 2, // 选中的级别
				currentLat: 0.0, // 当前纬度
				currentLng: 0.0, // 当前经度
				selectedSortDesc: '', // 选中的排序描述
				activeFilters: [], // 当前激活的筛选条件
				current:-1, // 下拉选中索引
				topList:[ // 下拉框菜单
					{
						label: '类型',
						open: false
					},{
						label: '区域',
						open: false
					},{
						label: '排序',
						open: false
					},{
						label: '筛选',
						open: false
					},
				],
				typeList:[],
				sortIdx: 0,
				sortList:[ // 排序下拉框数据
					{label: '综合排序'},
					{label: '最新发布'},
					{label: '离我最近'},
				],
				areaList: [],
				filterList:[ // 筛选下拉框数据
					{
						title: '性别要求',
						children:[
							{label: '不限', check: true},
							{label: '男', check: false},
							{label: '女', check: false},
						]
					},{
						title: '工作周期',
						children:[
							{label: '不限', check: true},
							{label: '长期兼职', check: false},
							{label: '短期兼职', check: false},
							{label: '周末兼职', check: false},
						]
					}
				],
				// jobList:[ // 工作列表
				// 	{
				// 		title:'在家线上学习PS做兼职',
				// 		level: 0,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司',
				// 		good: 0,
				// 		place: '江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
				// 		level: 1,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
				// 		good: 1,
				// 		place: '江南江南江南江南江南江南江南江南江南江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职',
				// 		level: 0,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司',
				// 		good: 0,
				// 		place: '江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
				// 		level: 1,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
				// 		good: 1,
				// 		place: '江南江南江南江南江南江南江南江南江南江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职',
				// 		level: 0,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司',
				// 		good: 0,
				// 		place: '江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
				// 		level: 1,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
				// 		good: 1,
				// 		place: '江南江南江南江南江南江南江南江南江南江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职',
				// 		level: 0,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司',
				// 		good: 0,
				// 		place: '江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
				// 		level: 1,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
				// 		good: 1,
				// 		place: '江南江南江南江南江南江南江南江南江南江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职',
				// 		level: 0,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司',
				// 		good: 0,
				// 		place: '江南'
				// 	},{
				// 		title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
				// 		level: 1,
				// 		money: '200元/天',
				// 		labels:[
				// 			{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},{
				// 				text: '企业直招',
				// 				blue: 1
				// 			},{
				// 				text: '有提成',
				// 				blue: 0
				// 			},
				// 		],
				// 		company: '上海为课网络科技有限公司上海为课网络科技有限公司',
				// 		good: 1,
				// 		place: '江南江南江南江南江南江南江南江南江南江南'
				// 	},
				// ],
				
			}
		},
		computed:{
			...mapState(['sysNav']),
		},
		onLoad() {
			 // 组件创建时调用
			 
			this.getCityAreaFromStorage();
			this.getAllIndustriesWithCategories(); // 调用获取类型列表的API
		},
		methods: {
			updateSortIdx(newIdx) {
							this.sortIdx = newIdx;
						},
			async filterJobs() {
			        const data = {
			            type: this.selectedType, // 需要从UI组件或其他逻辑获取这些值
			            area: {
			                city_id: this.selectedCityId,
			                level: this.selectedLevel
			            },
			            sort: {
			                lat: this.currentLat,
			                lng: this.currentLng,
			                desc: this.selectedSortDesc
			            },
			            filters: this.activeFilters // 这应该是一个数组，包含当前激活的筛选条件
			        };
			       try {
			               const res = await this.$api.filterJobs(data); // 这里的 data 是你调用 API 时传递的参数
			               if (res[1] && res[1].data) {
			                   this.jobList = res[1].data.map(job => ({
			                       title: job.title,
			                       level: this.determineLevel(job.salary), // 假设这是一个方法来决定级别 based on salary
			                       money: job.salary,
			                       labels: this.generateLabels(job), // 假设这是一个方法来生成标签数组
			                       company: job.company || "未知公司", // 使用默认值如果公司名字为空
			                       good: job.good || 0, // 使用默认值
			                       place: job.location || "未知地点" // 使用默认值如果地点为空
			                   }));
			               } else {
			                   console.error("API调用成功，但未返回有效数据",res);
			               }
			           } catch (error) {
			               console.error("调用 filterJobs API 出错:", error);
			           }
			    },
				// 示例方法，根据工资确定级别
				determineLevel(salary) {
				    // 这里可以添加你的逻辑来确定工作的级别
				    return salary.includes("小时") ? 1 : 0;
				},
				
				// 示例方法，生成标签数组
				generateLabels(job) {
				    const labels = [];
				    if (job.description.includes("直招")) {
				        labels.push({ text: '企业直招', blue: 1 });
				    }
				    if (job.description.includes("提成")) {
				        labels.push({ text: '有提成', blue: 0 });
				    }
				    // 根据需要添加更多条件
				    return labels;
				},
			 async getAllIndustriesWithCategories() {
			            try {
			                const res = await this.$api.getAllIndustriesWithCategories();
			                if (res[1].data && res[1].data.length > 0) {
			                    this.typeList = res[1].data;
			                } else {
			                    console.error("未获取到类型数据");
			                }
			            } catch (error) {
			                console.error("调用类型数据API出错", error);
			            }
			        },
			async getCityAreaFromStorage() {
			    try {
			        const location = uni.getStorageSync('location');
			        if (location && location.address_component) {
			            const city = location.address_component.city;
			            const data = { city: city ,
									   level: 3
						};
			            // 假设this.$api.getCityArea是正确定义并返回Promise的
			            const response = await this.$api.getCityArea(data);
			            if(response[1] && response[1].data){
			                // 假设response.data是你提供的数组
			                this.areaList = response[1].data.map(item => {
			                    return { name: item.shortname, city_id: item.id, level: item.level  }; // 或者直接返回item.shortname，根据areaList的期望格式调整
			                });
			            } else {
			                console.error("API调用成功，但未返回数据");
			            }
			        } else {
			            console.error("无法从存储中获取城市信息");
			        }
			    } catch (e) {
			        console.error("获取存储信息或调用API时出错", e);
			    }
				// try {
				//         const cityInfo = uni.getStorageSync('currentCityInfo');
				//         if (cityInfo) {
				//             this.selectedCityId = cityInfo.id; // 假设存储的城市信息中有id字段
				//             this.selectedLevel = cityInfo.level; // 假设存储的城市信息中有level字段
				//             const data = { city: cityInfo.name, level: cityInfo.level };
				//             // const response = await this.$api.getCityArea(data);
				//         } else {
				//             console.error("无法从存储中获取城市信息");
				//             // 可能需要回退到默认值或进行错误处理
				//         }
				//     } catch (e) {
				//         console.error("获取存储信息或调用API时出错", e);
				//     }
				
			},
			handler(){
				return {
					// 遮罩点击事件
					closeMask: ()=>{
						this.handler().closeSelect()
					},
					// 关闭下拉框
					closeSelect:()=>{
						this.$refs.dropdown.show = false
						this.current = -1
					},
					// 点击打开下拉框
					openSelect: (index)=> {
						let idx = this.current
						this.current = index
						this.$refs.dropdown.show = true
						if(idx == index) {
							this.$refs.dropdown.show = false
							this.current = -1
						}
					},
					// 确定类型提交
					submitType:(val)=>{
						console.log('确定类型提交', val);
						this.handler().closeSelect()
					},
					// 选中排序
					selectSort:(val) => {
						console.log('选中排序2', val);
						const {item,index} = val
						this.sortIdx = index
						this.handler().closeSelect()
					},
					// 确定区域提交
					submitArea:(val)=>{
						console.log('确定区域提交', val);
						this.handler().closeSelect()
					},
					// 确定筛选提交
					submitFilter: (arr, status) => {
					    console.log('确定筛选提交', arr, status);
					    this.activeFilters = arr.map(item => ({
					        key: item.key,
					        value: item.value
					    }));
					    this.filterJobs(); // 调用 filterJobs 来更新 jobList
					    this.handler().closeSelect();
					},
					// submitFilter:(arr, status)=>{
					// 	console.log('确定筛选提交', arr, status);
					// 	this.handler().closeSelect()
					// },
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.top-cate-block {
		height: 64rpx;
	}
	
	.select-box {
		width: 25%;
	}
	
	.mask {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: calc(var(--top)*2rpx);
		/* #endif */
		/* #ifdef H5 */
		top: 100rpx;
		/* #endif */
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.3);
		z-index: -1;
		overflow: hidden;
	}
	
</style>
