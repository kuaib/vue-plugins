<template>
	<div>
		<!-- 外层不能包裹一个普通的div -->
		<div id="mescroll" class="mescroll">
			<ul class="prodLists">
				<li class="listItem" v-for="item in items">
	    			<img :src="item.img" alt="">
	    			<div>
	    				<h6>{{item.name}}</h6>
	    				<p>建议零售价 ¥{{item.salePrice}}/{{item.packageUnit}}</p>
	    				<p>进货价 暂无</p>
	    			</div>
	    		</li>
			</ul>
	    </div>
	</div>
</template>
<script>
	import '../../assets/plugins/mescroll/mescroll.css'
	import {MeScroll} from '../../assets/plugins/mescroll/mescroll.js'
	import {listScroll} from '../../api/api'
	export default ({
		data() {
	      return {
	        items: [],
	        
	        mescroll: null, // 滚动对象
	        page: {
	        	num: 1,
	        	size: 12
	        }
	      }
	    },
	    // 必须使用mouted，使用created会报错，找不到id="mescroll"
	    mounted() {
	    	// 初始化滚动，不需要初始化数据加载，插件会自动做这个事情
	    	this.initScroll();
	    	this.mescroll.resetUpScroll() //---- 当不需要下拉刷新的时候需要加上这个
	    },
	    methods: {
			initScroll () {
				this.mescroll = new MeScroll("mescroll", { 
					//第一个参数"mescroll"对应上面布局结构div的id
		       		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
		       		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
		     
					// down: {
					// 	callback: this.downCallback, // 下拉刷新的回调
					// 	use: true, // 是否启用下拉刷新（默认true）
					// },
					up: {
						callback: this.upCallback, //上拉加载的回调
						htmlNodata: '<p class="upwarp-nodata">没有更多数据啦</p>',
					},
					down: {
						use: false
					}

				});
			},
			//下拉刷新的回调
			downCallback() {},
			
			//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
			upCallback(page) {
				listScroll(this,page.num,page.size).then(res => {
					if(res.data.code == '000') {
						// 防止下拉刷新的时候数据重复
						if(page.num == 1) {
							this.items = res.data.data.rows
						} else {
							this.items = [...this.items,...res.data.data.rows];
						}
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						//参数data.length:当前页的数据总数
						//mescroll会根据data.length自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
						//列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)
						//如果你需要强制显示无更多数据,则mescroll.endSuccess(0),注意noMoreSize的配置
						//如果不传data.length,则仅隐藏下拉刷新的状态
						this.mescroll.endSuccess(res.data.data.rows.length);
					}
				}).catch(rej => {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态
					this.mescroll.endErr();
				})
			},
	    }
	})
</script>
<style lang="scss" scoped>
	@import '../../assets/css/mixin';
	.prodLists {
		@include fj;
		flex-wrap: wrap;
		margin: 0 .6rem;
		.listItem {
			width: 8rem;
			padding: .5rem 0;
    		border-bottom: 1px solid #ccc;
			img {
				@include wh(8rem,8rem);
			}
			h6 {
				margin-top: .2rem;
				font-size: .6rem;
				font-weight: normal;
				height: 1.6rem;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
				white-space: normal;
				word-break: break-word;
			}
			p {
				font-size: .65rem;
    			color: #ff3939;
    			line-height: 1rem;
			}
		}
	}
</style>

<!-- 
网址参考：http://www.mescroll.com/api.html
注解：1.引入的js文件中增加了export导出、key变量加上了let定义
	 2.如果下拉刷新是重置列表数据,那么down完全可以不用配置
	 3.分页和分页大小必须是一下这个形式
	 	page: {
        	num: 1,
        	size: 10
        }
     4.适用于纵向滚动

 -->