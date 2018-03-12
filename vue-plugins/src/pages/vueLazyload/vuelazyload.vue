<template>
	<div>
		<div class="top">
			你好
		</div>
		<div>
			<img v-lazy="imgUrl">
		</div>
	</div>
	
</template>
<script>
	export default ({
		data () {
			return {
				imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1811457400,1412920344&fm=27&gp=0.jpg'
			}
		}
	})
</script>
<style>
	.top {
		height: 2000px;
		background: pink;
	}
</style>

<!-- 
https://github.com/hilongjw/vue-lazyload

 -->