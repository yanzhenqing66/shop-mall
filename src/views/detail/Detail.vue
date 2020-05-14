<template>
	<div class="detail">
		<nav-bar-detail></nav-bar-detail>
		<swiper-detail :topImages="topImages"></swiper-detail>
	</div>
</template>

<script>
	import NavBarDetail from './childDetail/NavBarDetail'
	import SwiperDetail from './childDetail/SwiperDetail'
	import {getDetail} from 'network/detail'
	
	export default {
		name: 'Detail',
		components: {
			NavBarDetail,
			SwiperDetail
		},
		data() {
			return {
				iid: null,
				topImages: []
			}
		},
		created() {
			// 保存传入的 iid
			this.iid = this.$route.params.iid;
			
			// 根据 iid 请求详情数据
			getDetail(this.iid).then(res => {
				console.log(res)
				// 获取顶部轮播数据
				this.topImages = res.result.itemInfo.topImages
			})
		}
	}
</script>

<style scoped>
</style>
