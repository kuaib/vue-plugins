<template>
	<div>
		<div id="chartDetail"></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default({
		data () {
			return {
				dataX: ['1月','2月','3月','24月','5月','6月','7月','8月','9月','10月','11月','12月'],
				dataYAmount: [8560, 15660, 14000, 12110, 14110, 18110, 15110, 14230, 15110, 14110, 19110, 16110],
				dataYNum: [8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
			}
		},
		mounted() {
			this.initCharts()
		},
		methods: {
			// 初始化echarts
			initCharts () {
				// 基于准备好的dom，初始化echarts实例
		        this.chartDetail = echarts.init(document.getElementById('chartDetail'));
		        console.log(this.chartDetail)

		        // 指定图表的配置项和数据
		        this.option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            }
				        }
				    },
				    // 图标上方的备注信息
				    legend: {
				        data:['订单总额','订单量']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: this.dataX,
				            axisPointer: {
				                type: 'shadow'
				            }
				        }
				    ],
				    // 控制图的大小，调整下面这些值就可以，
				    grid: {
			            x: 50,
			            x2: 50,
			            y2: 90,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
			        },
				    yAxis: [
				        {
				            type: 'value',
				            name: '订单总额(元)',
				            axisLabel: {
				                formatter: '{value}'
				            },
				        },
				        {
				            type: 'value',
				            name: '订单量(件)',
				            axisLabel: {
				                formatter: '{value}'
				            }
				        }
				    ],
				    series: [
				        {
				            name: '订单总额',
				            type: 'bar',
				            data: this.dataYAmount,
				            itemStyle:{
	                            normal:{
	                                color:'#34CA82'
	                            }
	                        }
				        },
				        {
				            name: '订单量',
				            type: 'line',
				            yAxisIndex: 1,
				            data: this.dataYNum,
				            itemStyle:{
	                            normal:{
	                                color:'#229fea'
	                            }
	                        }
				        }
				    ]
				};
				
		        // 使用刚指定的配置项和数据显示图表。
		        this.chartDetail.setOption(this.option);
			},

			// 更改数据时，刷新表格
			refreshData(){
			    if(!this.chartDetail){
			        return;
			    }
			    var option = this.chartDetail.getOption();
			    option.series[0].data = this.dataYAmount;  	// 改变y轴(订单总额)
			    option.series[1].data = this.dataYNum;  	// 改变y轴(订单量 数组)
			    option.xAxis[0].data = this.dataX;		    // 改变x轴(订单总额 数组)
			    this.chartDetail.setOption(option);    
			},
		}
	})
</script>
<style>
	/*必须设置宽高*/
	#chartDetail {
		width: 100%;
		height: 360px;
		overflow: auto;
	}
</style>