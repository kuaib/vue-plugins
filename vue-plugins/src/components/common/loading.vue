<!-- 
组件说明：1. 一般在请求接口加载的时候使用
		2. 加载中的gif图片可以自定义，但图片存放的位置要注意
 -->
<template>
	<div class="loading_page">
		<div class="inner">
			<p v-if="fontText">{{fontText}}</p>
			<!-- <img :src="src" alt=""> -->
			<img src="../../assets/imgs/loading.gif">
		</div>
	</div>
</template>
<script>
	export default ({
		data () {
			return {
				src: '/static/',		// 绑定本地图片路径，图片必须放到static文件夹下
				imgName: 'loading.gif',
			}
		},
		created () {
			// 动态获取图片加载会延迟(页面上展示时，先展示背景，后展示gif图片)
			this.src = this.parentImg ? this.src + this.parentImg : this.src + this.imgName
		},
		props: [
			'parentImg',   // 父组建loadding指定图片名称（必须把图片放到必须放到static文件夹下）
			'fontText',    // 是否显示文字配置
		],

	})
</script>
<style lang="scss" scoped>
	@import '../../assets/css/mixin';
	.loading_page {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 2.2rem;
		background: transparent;
		z-index: 99999999;
		.inner {
			@include borderRadius(0.2rem);
			min-height: 2.5rem;
			min-width: 5rem;
			padding: .6rem;
			text-align: center;
			background: rgba(0,0,0,.5);
			@include center;
			top: 45%;
			transform: translateY('50%');
			img {
				width: 1.5rem;
				margin-top: 0.5rem;
			}
			p {
				@include sc(0.7rem,#fff);
			}
		}

	}
</style>
