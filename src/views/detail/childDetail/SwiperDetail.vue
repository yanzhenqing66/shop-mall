<template>
	<div class="swiperDetail">
		<swiper>
			<swiper-item v-for="item in topImages">
				<img :src="item" alt="" />
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper'
	 
	export default {
		name: 'SwiperDetail',
		components:{
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default () {
					return []
				}
			}
		}
}
</script>

<style scoped>
</style>
