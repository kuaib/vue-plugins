<!-- 
说明：li不能设置浮动，元素之间存在默认空隙
 -->
<template>
	<div class="scroll-page">
		<div class="wrapper">
			<ul class="clear">
				<li>水果</li>
				<li>熟食</li>
				<li>饮料</li>
				<li>酒品</li>
				<li>日用</li>
				<li>化妆品</li>
				<li>蔬菜</li>
				<li>零食</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default ( {
		data () {
			return {

			}
		},
	})
</script>
<style lang="scss" scoped>
	@import '../../assets/css/mixin';
	.scroll-page {
		margin: 0 0.5rem;
		.wrapper {
			ul {
				white-space: nowrap;
			    -webkit-overflow-scrolling: touch;
			    // overflow: hidden;
			    // overflow-x: auto;
			}
			li {
				background: pink;
				// float: left;
				display: inline-block;
				width: 5rem;
				text-align: center;
				border-bottom: 1px solid #ccc;
				margin-left: .45rem;
			}
		}
	}
	
</style>