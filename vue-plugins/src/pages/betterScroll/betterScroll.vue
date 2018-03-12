<template>
	<div>
		<!-- 第一个滚动 -->
		<div class="wrapper" ref="wrapper">
			<ul >
				<li v-for="item in results">
	                <div>
	                    <p class="item-title">{{item.company}}</p>
	                    <p v-if="item.dueDate" class="item-date">使用有效期至{{item.dueDate | formatDate}}</p>
	                </div>
	                <p class="item-btn" v-if="item.dueDate">查看</p>
	                <p class="item-btn activeStyle" v-else>购买</p>
	            </li>
			</ul>
		</div>
		<!-- 第二个滚动 -->
		<div class="wrapper2" ref="wrapper2">
			<ul >
				<li v-for="item in results">
	                <div>
	                    <p class="item-title">{{item.company}}</p>
	                    <p v-if="item.dueDate" class="item-date">使用有效期至{{item.dueDate | formatDate}}</p>
	                </div>
	                <p class="item-btn" v-if="item.dueDate">查看</p>
	                <p class="item-btn activeStyle" v-else>购买</p>
	            </li>
			</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import {queryCompanyFuzzy} from '../../api/api'
	export default({
		data () {
			return {
				results: [],
				scrollItem: null,
				scrollItem2: null
			}
		},
		created () {
			this.initData()
		},
		methods: {
			// 初始化滚动
			initScroll () {
				// 第一个滚动
				this.scrollItem = new BScroll(this.$refs.wrapper,{
					click: true,
                    preventDefault: true
				})
				// 第二个滚动
				this.scrollItem2 = new BScroll(this.$refs.wrapper2,{
					click: true,
                    preventDefault: true
				})
			},
			// 初始化数据
			initData () {
				queryCompanyFuzzy(this).then(res => {
                    if(res.data.code == '000') {
                        this.results = res.data.data.clientCreditQueryInfoList;
                    }
                })
			}
		},
		watch: {
			results () {
				// dom 形成后初始化
				this.$nextTick(() => {
					this.initScroll()
				})
			}
		}
	})
</script>
<style lang="scss" scoped>
	@import '../../assets/css/mixin';
	.wrapper,.wrapper2 {
    	margin: 0.5rem 0rem 0 0rem;
        height: 16.5rem;  // 需要固定的高
        background: #ffffff;
        overflow:hidden;
        ul {
            background: #abc;
            padding: 0 1rem 1rem 1rem;
        }
        li {
            @include fj;
            @include wh(100%,auto);
            border-bottom: 1px solid #e1e1e1;
            margin-top: .85rem;
            padding-bottom: .9rem;
            box-sizing: border-box;
            div {
                max-width: 11rem;
            }
            .item-title {
                @include sc(0.75rem,#333333);
            }
            .item-date {
                @include sc(0.6rem,#666666);
                margin-top: 0.1rem;
            }
            .item-btn {
                @include sc(0.6rem,#666666);
                @include wh(2.55rem,1.7rem);
                line-height: 1.7rem;
                text-align: center;
                border: 1px solid #666666;
                @include borderRadius(0.1rem);
                padding: 0 0.3rem;
            }
        }
        li:last-child {
            border: none;
            padding-bottom: 3rem;
        }
    }
    .wrapper {
    	margin-bottom: 2rem;
    }
</style>

<!-- 
	官方文档：https://ustbhuangyi.github.io/better-scroll/doc/#better-scroll 是什么

 -->