<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
				<tab-control 	class="tabControl2"
											:titles="['流行', '新款', '精选']" 
											@tabClick="tabClick" 
											ref="tabControl2" 
											v-show="isTabFixed"></tab-control>
		<scroll class="content" 
						ref="scroll" 
						:probe-type="3" 
						@scroll="contentScroll" 
						:pull-up-load="true" 
						@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
			<recommond-view :recommends="recommends"></recommond-view>
			<feature-view />
			<tab-control :titles="['流行', '新款', '精选']" 
										@tabClick="tabClick" 
										ref="tabControl1"></tab-control>
			<goods-list :goods="goods[currentType].list"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowACtive" />
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import Scroll from "components/common/scroll/Scroll";
	import TabControl from "components/content/tabControl/TabControl";
	import GoodsList from "components/content/goods/GoodsList";
	import BackTop from "components/content/backTop/BackTop";

	import HomeSwiper from "./childComps/HomeSwiper";
	import RecommondView from "./childComps/RecommendView";
	import FeatureView from "./childComps/FeatureView";

	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home";
	import {
		debounce
	} from "common/utils";

	export default {
		name: "Home",
		components: {
			NavBar,
			HomeSwiper,
			RecommondView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					pop: {
						page: 0,
						list: []
					},
					new: {
						page: 0,
						list: []
					},
					sell: {
						page: 0,
						list: []
					}
				},
				currentType: "pop",
				isShowACtive: false,
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			};
		},
		// destroyed() {
		// 	console.log('likai')
		// },
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
		},
		created() {
			// 请求多个数据
			this.getHomeMultidata();
			// 请求商品数据
			this.getHomeGoods("pop");
			this.getHomeGoods("new");
			this.getHomeGoods("sell");
		},
		mounted() {
			// 监听 goodsListItem 图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh)
			this.$bus.$on('goodImgLoad', () => {
				refresh()
			})
		},
		methods: {
			/**
			 * 事件监听相关的方法
			 */

			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = "pop";
						break;
					case 1:
						this.currentType = "new";
						break;
					case 2:
						this.currentType = "sell";
						break;
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			contentScroll(position) {
				// 判断 backTop 是否显示
				this.isShowACtive = (-position.y) > 1000
				
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
				// this.$refs.scroll.scroll.refresh()
			},
			swiperImgLoad() {
				// 获取 tab-control 的位置
				this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
			},

			/**
			 * 网络请求相关的方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				});
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					// 完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				});
			}
		}
	};
</script>

<style scoped>
	#home {
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;

		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	
	.tabControl2 {
		position: relative;
		z-index: 9;
	}

	/* .tab-control {
		position: sticky;
		top: 44px;
		z-index: 9;
	} */

	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}


	/* .content {
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>
