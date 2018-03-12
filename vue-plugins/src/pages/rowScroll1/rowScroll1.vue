<!-- 
说明：ul必须设置宽度
 -->
<template>
	<div class="scroll-page">
		<div class="wrapper">
			<ul class="clear" id="firstUl">
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
		mounted () {
			this.setWidth('firstUl')
			// dom生成之后执行，否则获取不到ul元素(如果ul是动态生成的话)
			// this.$nextTick(() => {
			// 	this.setWidth('firstUl')
			// })
		},
		methods: {
			// 计算ul长度(当ul的ID不确定时即动态生成的多个，可以传餐)
            setWidth(cateListsUl){
               let ulWidth = 0;
               let arr = document.getElementById(cateListsUl).querySelectorAll('li');
               for(let i = 0;i < arr.length; i++){
                   ulWidth += arr[i].clientWidth;
               }
               // 每个li的右侧margin值需要加上，margin的rem是0.45，根据main.js中的转换方式转换为px
               // + 10: 在手机上的宽度不够用，会折行，故增加宽度
               document.getElementById(cateListsUl).style.width = ulWidth + arr.length * (document.documentElement.clientWidth/375*20*0.45) + 10 + 'px';
           	},

		},


	})
</script>
<style lang="scss" scoped>
	@import '../../assets/css/mixin';
	.scroll-page {
		margin: 0 0.5rem;
		.wrapper {
			// -webkit-overflow-scrolling:touch;
			li {
				background: pink;
				float: left;
				width: 5rem;
				text-align: center;
				border-bottom: 1px solid #ccc;
				margin-left: .45rem;
			}
		}
	}
	
</style>