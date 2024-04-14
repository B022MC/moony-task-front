<!-- 引入uView基础样式 -->
<!-- // <style lang="scss">
// 	* 注意要写在第一行，同时给style标签加入lang="scss"属性 *
// 	@import "@/uni_modules/uview-ui/index.scss";
// </style> -->

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['GetSystemInfo']),
    // 在 methods 中修改 getLocationFromStorageAndSend 方法
    async getLocationFromStorageAndSend(data) {
        if (data) {
            try {
                const response = await this.$api.getLocation(data);
                if (response[1] && response[1].statusCode === 200) {
                    const locationInfo = response[1].data;
                    const formattedAddresses = locationInfo.result?.formatted_addresses;
                    if (formattedAddresses) {
                        this.currentAddress = formattedAddresses.standard_address;
                        uni.setStorageSync('location', locationInfo.result);
                        const cityData = {
                            city: locationInfo.result.ad_info.city, // 假设 ad_info 总是存在，并且包含城市信息
                            level: 2
                        };
                        const cityResponse = await this.$api.getCityArea(cityData);
                        if (cityResponse[1] && cityResponse[1].data) {
                            uni.setStorageSync('currentCityInfo', cityResponse[1].data[0]); // 假设返回的数据是数组形式
                            console.log("城市信息获取成功：", cityResponse[1].data[0]);
                        } else {
                            const failcityResponse = {id: 2324, pid: 2323, shortname: "重庆", name: "重庆市", merger_name: "中国,重庆,重庆市", level: 2};
                            uni.setStorageSync('currentCityInfo', failcityResponse);
                            console.error("城市信息API返回无效数据：", cityResponse);
                        }
                    } else {
                        console.error('响应数据中缺少预期的 formatted_addresses');
                    }
                } else {
                    console.error('获取当前位置失败:', response);
                }
            } catch (error) {
                console.error('请求失败:', error);
            }
        } else {
            console.error('位置信息不存在');
        }
    },
        getLocation() {
          wx.getLocation({
            type: 'wgs84',
            success: res => {
              const data = {
                lat: res.latitude,
                lng: res.longitude
              };
              this.getLocationFromStorageAndSend(data);
            },
            fail: () => {
              const fallbackLocation = {
              			              "location": {"lat": 30.003799, "lng": 106.237419, "latitude": 0, "longitude": 0},
              			              "address": "重庆市合川区兰海高速",
              			              "formatted_addresses": {"recommend": "重庆移通学院西南", "rough": "重庆移通学院西南", "standard_address": "重庆市合川区假日大道1号"},
              			              "address_component": {"nation": "中国", "province": "重庆市", "city": "重庆市", "district": "合川区", "street": "兰海高速", "street_number": ""},
              			              "ad_info": {"nation_code": "156", "adcode": "500117", "phone_area_code": "023", "city_code": "156500000", "name": "中国,重庆市,重庆市,合川区", "location": {"lat": 29.971968, "lng": 106.27617, "latitude": 0, "longitude": 0}, "nation": "中国", "province": "重庆市", "city": "重庆市", "district": "合川区"},
              			              "address_reference": {"street_number": {"id": "", "title": "", "location": {"lat": 29.932873, "lng": 106.375519, "latitude": 0, "longitude": 0}, "_distance": 24.8, "_dir_desc": "东"}, "crossroad": {"id": "726062", "title": "沙坪大道/学院路(路口)", "location": {"lat": 30.00164, "lng": 106.24123, "latitude": 0, "longitude": 0}, "_distance": 433, "_dir_desc": "西北"}, "town": {"id": "500117001", "title": "合阳城街道", "location": {"lat": 29.990046, "lng": 106.265121, "latitude": 0, "longitude": 0}, "_distance": 0, "_dir_desc": "内"}, "street": {"id": "15943809689769666766", "title": "兰海高速", "location": {"lat": 29.932873, "lng": 106.375519, "latitude": 0, "longitude": 0}, "_distance": 24.8, "_dir_desc": "东"}, "landmark_l2": {"id": "14659425825487293185", "title": "重庆移通学院", "location": {"lat": 30.001548, "lng": 106.239336, "latitude": 0, "longitude": 0}, "_distance": 37, "_dir_desc": "西南"}}
              			            };
			  const failcityResponse = {id: 2324, pid: 2323, shortname: "重庆", name: "重庆市", merger_name: "中国,重庆,重庆市", level: 2};
			  uni.setStorageSync('currentCityInfo', failcityResponse);
              uni.setStorageSync('location', fallbackLocation);
              console.log('获取地理位置失败');
            }
          });
        }
  },
  onLaunch() {
    const isLogged = uni.getStorageSync('isLogged');
    const userInfo = JSON.parse(uni.getStorageSync('userInfo') || '{}');
    this.$store.commit('updateLoginState', isLogged);
    if (isLogged) {
      this.$store.commit('SET_USER_INFO', userInfo);
    }
    this.getLocation();
  },
  onShow() {
    this.GetSystemInfo();
  },
  data() {
    return {
      currentAddress: ''
    };
  }
};
</script>


<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";	// 引入uView基础样式 
	@import '@/static/style/style.scss';
	@import '@/static/style/mixins.scss';
	@import '@/static/style/variables.scss';
	/*每个页面公共css */
	.page {
		background: $default-bg-color;
		color: #303133;
		// padding: 0 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		// font-weight: 400;
		min-height: 100vh;
	}
</style>
