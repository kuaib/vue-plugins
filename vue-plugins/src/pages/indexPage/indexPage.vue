<template>
	<div class="page">
		<div>
			<p>滚动</p>
			<router-link tag="div" to="/betterScroll" class="item">better scroll</router-link>
			<router-link tag="div" to="/mescroll" class="item">mescroll 滚动分页</router-link>
			<router-link tag="div" to="/lateralScroll" class="item">横向滑动1</router-link>
			<router-link tag="div" to="/lateralScroll2" class="item">横向滑动2</router-link>
		</div>
		<div>
			<p>图片上传</p>
			<router-link tag="div" to="/imgUploadMore" class="item">一次上传多张图片</router-link>
			<router-link tag="div" to="/imgUploadOne" class="item">一次只能上传1张图片</router-link>
			<router-link tag="div" to="/imgUploadDrag" class="item">拖拽上传</router-link>
		</div>
		<div>
			<p>图片懒加载</p>
			<router-link tag="div" to="/vueLazyload" class="item">图片懒加载</router-link>
		</div>
		<div>
			<p>echarts</p>
			<router-link tag="div" to="/echarts" class="item">echarts</router-link>
			<p>复制文本</p>
			<router-link tag="div" to="/copyText" class="item">copyText</router-link>
		</div>
	</div>
</template>
<script>
	export default({
		data () {
			return {

			}
		}
	})
</script>
<style lang="scss" scoped>
	.page {
		padding: .5rem;
	}
	p {
		color: #333;
		font-size: .8rem;
	}
	.item {
		display: inline-block;
		height: 1.5rem;
		line-height: 1.5rem;
		border-radius: .3rem;
		margin-right: .8rem;
		background: #4cd964;
		color: #fff;
		font-size: .7rem;
		padding: 0 .3rem;
		margin-bottom: .5rem;
	}
</style>