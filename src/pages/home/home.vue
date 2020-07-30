<template>
    <div>
         <div style="width:1000px;height:500px" ref="chart"></div>
    </div>
</template>
<script>
export default {
   data () {
　　return {};
　},
　methods: {
　　initCharts () {
　　let myChart = this.$echarts.init(this.$refs.chart);
　　console.log(this.$refs.chart)
　　// 绘制图表
　　myChart.setOption({
　　title: { text: '近一周订单数量' },
　　 xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [200, 400, 800,600,1000],
        type: 'line'
    }]
　　});
　　}
　  },
　  mounted () {
　　this.initCharts();
　}
}
</script>