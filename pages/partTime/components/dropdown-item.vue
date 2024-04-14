<!-- dropdown.vue -->
<template>
	<view>
		<scroll-view scroll-y="true" class="type-box">
			<!-- 类型 -->
			<view v-if="menuType==='type'" class="">
				<view class="p-30">
					<view class="type-item m-b-20" :class="{'active': isAllType}" @click="selectAll()">全部</view>
					<view v-for="(v,i) in newList" :key="i" class="">
						<view class="m-b-10 f-s-28">{{v.title}}</view>
						<view class="type-list m-b-20 row center">
							<view 
								class="type-item m-b-20" 
								v-for="(item,index) in v.children" :key="index" 
								:class="{'active': item.check===true}" 
								@click="select(item, index)">
								{{item.label}}
							</view>
						</view>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn job-button primary" @click="submit()">确定</view>
				</view>
			</view>
			<!-- 区域 -->
			<view v-if="menuType==='area'" class="">
				<view class="p-30">
					<view class="type-item m-b-20" :class="{'active': areaIdx===-1}" @click="selectAllArea()">全{{ cityName }}</view>
					<view class="type-list m-b-20 row center">
						<view class="type-item m-b-20" 
							v-for="(areaItem,areaIndex) in newList" :key="areaIndex" 
							:class="{'active': areaIdx===areaIndex}" 
							@click="selectArea(areaIndex)">
							{{areaItem.name}}
						</view>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn job-button primary" @click="submitArea()">确定</view>
				</view>
			</view>
			<!-- 排序 -->
			<view v-if="menuType==='sort'" class="">
				<view class="sort-box">
					<view 
						v-for="(sortItem,sortIndex) in newList" :key="sortIndex" 
						class="sort-item p-t-b-30 f-s-26" :class="{'color main': sortIdx===sortIndex}"
						@click.stop="selectSort(sortItem, sortIndex)">
						{{sortItem.label}}
					</view>
				</view>
			</view>
			<!-- 筛选 -->
			<view v-if="menuType==='filter'" class="">
				<view class="p-30">
					<view v-for="(filterItem,filterIndex) in newList" :key="filterIndex" class="">
						<view class="m-b-10 f-s-28">{{filterItem.title}}</view>
						<view class="type-list m-b-20 row center">
							<view class="type-item m-b-20" 
								v-for="(filterItem2,filterIndex2) in filterItem.children" :key="filterIndex2" 
								:class="{'active': filterItem2.check===true}" 
								@click="selectFilter(filterItem, filterItem2, filterIndex2)">
								{{filterItem2.label}}
							</view>
						</view>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn reset-btn job-button normal m-r-20" @click="resetFilter()">重置</view>
					<view class="type-btn submit-btn job-button primary" @click="submitFilter()">确定</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'dropdown-item',
		props: {
        menuType: {
            type: String,
            default: 'type'
        },
        sortIdx: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default: () => []
        }
		},
		data() {
			return {
				localSortIdx: 0, // 本地排序索引
				selectedSortDesc: '', // 排序描述
				currentLat: 0.0,      // 当前纬度
				currentLng: 0.0,       // 当前经度
				newList:[],
				isAllType: true, // 是否选中全部类型
				typeIndex: -1, // 类型选中索引
				areaIdx: -1, // 区域选中索引
				cityName: '重庆市', // 默认值为重庆市
			};
		},
		watch:{
			sortIdx(newValue) {
			            this.localSortIdx = newValue; // 同步父组件的更新
			        },
			list(){
				this.newList = this.list
			}
		},
		created() {
			this.localSortIdx = this.sortIdx; // 初始化本地排序索引
			this.newList = this.list
			this.getCityFromStorage(); // 调用方法获取存储中的城市信息
		},
		methods: {
			moveHandle() {},
			// 从存储获取城市信息
			        getCityFromStorage() {
			            try {
			                const location = uni.getStorageSync('location'); // 假设使用uni-app的同步获取本地存储方法
			                if (location && location.address_component && location.address_component.city) {
			                    this.cityName = location.address_component.city; // 更新cityName
			                } else {
			                    console.error("无法从存储中获取城市信息");
			                }
			            } catch (e) {
			                console.error("获取存储信息时出错", e);
			            }
			        },
			// 选中全部类型
			selectAll(){
				// this.$emit('select-all')
				this.isAllType = true
				if(this.isAllType===true) {
					this.newList.forEach((v=>{
						v.children.forEach((t, i)=>{
							t.check = false
						})
					}))
				}
			},
			// 选中类型
			select(item, index) {
				item.check = !item.check
				this.isAllType = item.check===true? false: true
				this.newList.forEach((v=>{
					v.children.forEach((t, i)=>{
						if( item.label !== t.label ) {
							t.check = false
						}
					})
				}))
				// this.$emit('select', {item, index})
			},
			// 选中类型提交
			submit() {
				let selectData = {}
				this.newList.forEach((v=>{
					v.children.forEach(t=>{
						if(t.check === true) {
							selectData = t
						}
					})
				}))
				this.$emit('submit', selectData)
			},
			// 选中全部区域
			selectAllArea() {
			            this.areaIdx = this.areaIdx === -1 ? -2 : -1; // 切换全选状态
			        },
			// 选中区域
			selectArea(index) {
			            this.areaIdx = index === this.areaIdx ? -1 : index;
			        },
			// selectArea(index) {
			// 	let i = this.areaIdx
			// 	this.areaIdx = i===index ? -1 : index
			// },
			// 确定区域提交
			submitArea() {
			    let selectData = {};
			    if (this.areaIdx === -1) {
			        // 全选状态，使用areaList第一个元素的city_id减1
			        selectData = {
			            city_id: this.newList[0].city_id - 1, // 确保this.newList[0].city_id存在且是数值
			            level: 2
			        };
			    } else {
			        // 使用选中区域的信息
			        selectData = {
			            city_id: this.newList[this.areaIdx].city_id,
			            level: this.newList[this.areaIdx].level
			        };
			    }
			    this.$emit('submitArea', selectData);
			},
			// submitArea(){
			// 	// console.log('确定区域提交');
			// 	const { areaIdx, newList } = this
			// 	let selectData = {}
			// 	selectData = newList[areaIdx]
			// 	this.$emit('submitArea', selectData)
			// },
			// 选中排序
			selectSort(sortItem, index) {
			            this.localSortIdx = index; // 使用本地数据属性
			            this.$emit('updateSortIndex', index); // 通知父组件更新 sortIdx
			
			            switch (sortItem.label) {
			                case '综合排序':
			                    this.selectedSortDesc = '';
			                    this.currentLat = 0.0;
			                    this.currentLng = 0.0;
			                    break;
			                case '最新发布':
			                    this.selectedSortDesc = 'date_asc';
			                    break;
			                case '离我最近':
			                    this.currentLat = 48.8566;
			                    this.currentLng = 2.3522;
			                    break;
			                default:
			                    console.error('未知的排序选项');
			            }
			            this.filterJobs(); // 调用筛选方法
			        },
			        filterJobs() {
			            const params = {
			                sortDesc: this.selectedSortDesc,
			                latitude: this.currentLat,
			                longitude: this.currentLng
			            };
			            console.log('进行排序和筛选', params);
			        },

			// 选中筛选
			selectFilter(v, item, index) {
				if(v.multiple) { // 多选
					item.check = !item.check
				} else {
					item.check = true
					v.children.forEach((t, i)=>{
						if( item.label !== t.label ) {
							t.check = false
						}
					})
				}
			},
			// 重置筛选
			resetFilter(){
				this.newList.forEach(item=>{
					item.children.forEach((v, i)=>{
						v.check = i===0 ? true : false
					})
				})
			},
			// 确定筛选提交
			submitFilter(){
				this.$emit('submitFilter', this.newList,)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.type-box {
		min-height: 300rpx;
		max-height: 800rpx;
		overflow-y: auto;
		.type-list {
			box-sizing: border-box;
			width: 100%;
			flex-wrap: wrap;
		}
		.type-item {
			width: 22%;
			border: 1rpx solid #e5e5e5;
			background: #eee;
			font-size: 22rpx;
			text-align: center;
			padding: 15rpx 0;
			border-radius: 3rpx;
			margin-right: 22rpx;
			&.active {
				border: 1rpx solid #F56718;
				color: #F56718;
				background-color: #fdf6ec;
			}
		}
		.type-item:nth-child(4n) {
			margin-right: 0;
		}
		.type-bottom-btn {
			height: 120rpx;
			position: sticky;
			bottom: 0;
			left: 0;
			
			.type-btn {
				font-size: 32rpx;
				height: 76rpx;
				border-radius: 6rpx;
			}
			
			.reset-btn {
				width: 160rpx;
			}
			
			.submit-btn {
				width: 500rpx;
			}
		}
		
	}
	
	.sort-box {
		.sort-item {
			text-align: center;
		}
	}
	
</style>
