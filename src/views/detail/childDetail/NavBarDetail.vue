<template>
	<div>
		<nav-bar>
			<div slot="left" class="backImg" @click="backClick">
				<img src="~assets/img/common/back.svg" alt="">
			</div>
			<div slot="center" class="title">
				<div v-for="(item, index) in titles" 
						class="titleItem"
						:class="{active: currentIndex == index}" 
						@click="itemClick(index)">
						{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	
	export default {
		name: 'NavBarDetail',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
			},
			backClick() {
				this.$router.back()
			}
		}
	}
</script>

<style scoped="scoped">
	.title {
		display: flex;
		font-size: 14px;
	}
	
	.titleItem {
		flex: 1;
	}
	
	.active {
		color: var(--color-high-text);
	}
	
	.backImg {
		margin-top: 6px;
	}
</style>
