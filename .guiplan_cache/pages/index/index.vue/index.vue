<template>
    <!--pagesindexindexvuehtmlStart-->

    <div id="defaultId1">
        <view id="id6Tv73p" class="page  index-page">
            <!-- nav -->
            <CommonNav id="id76fpel">
            </CommonNav>
            <!-- 顶部tab -->
            <!-- <u-sticky id="id3JEdRF"  >
         </u-sticky> -->
            <!-- <u-sticky id="idKRThwu"  :offset-top="sysNav.top + sysNav.height" >
               <view id="idHg2zE9" class="bg-fff border-box " >
                  <view id="idSsFBnR" class="top-tab-block m-b-20 p-l-r-30 " >
                     <u-tabs id="idzKkeoA"  :list="topTabList" :current="tabIndex" lineWidth="20" lineHeight="4" lineColor="#F56718" :activeStyle="{color: '#F56718',fontWeight: 'bold', fontSize: '32rpx'}" :inactiveStyle="{color: '#303133', fontSize: '26rpx'}" itemStyle="height: 80rpx;" @change="(item)=>handler().click(item)" >
                     </u-tabs>
                  </view>
               </view>
            </u-sticky> -->
            <!-- 推荐 -->
            <RecomendItem id="idxOv1KV">
            </RecomendItem>
            <u-back-top id="idgvWW3g" :scroll-top="scrollTop" icon="arrow-up" :iconStyle="iStyle" :customStyle="cStyle">
            </u-back-top>
        </view>
    </div>
    <!--pagesindexindexvuehtmlEnd-->

</template>


<script>
    // interfaceCode
    ;;
    // import {mapState} from 'vuex'


    // interfaceCode
    //importStart

    import CommonNav from '@/components/layout/common-nav.vue';
    import RecomendItem from './components/recomend-item.vue';
    //importEnd

    export default {
        components: {
            CommonNav,
            RecomendItem
        },
        data() {
            return {
                // insertData
                // pagesindexindexvueDataStart

                // scrollTop
                scrollTop: 0,
                // iStyle
                iStyle: {
                    "fontSize": "32rpx",
                    "color": "#ffffff"
                },
                // cStyle
                cStyle: {
                    "backgroundColor": "#F56718"
                }
                // pagesindexindexvueDataEnd

            };
        },
        computed: {
            // 如果你使用了Vuex来存储全局状态，这里可以保留
            // ...mapState(['sysNav'])
        },
        methods: {
            // insertMethod
            // pagesindexindexvueMethodStart
            // onPageScroll
            onPageScroll(e) {

                this.scrollTop = e.scrollTop;

            }
            // pagesindexindexvueMethodEnd

        },

        props: {
            // pagesindexindexvuePropsStart

            // pagesindexindexvuePropsEnd


        },
        async mounted() {
            // defaultLoad
            // pagesindexindexvueMountedStart
            // defaultLoad	
            // defaultLoad
            // pagesindexindexvueMountedEnd

        }
    };
</script>

<style lang="scss" scoped>
    .pagesindexindexvuecssStart {}

    .index-page {
        padding-bottom: 30rpx;
        background-color: #FFFFFF;
    }

    .pagesindexindexvuecssEnd {}
</style>