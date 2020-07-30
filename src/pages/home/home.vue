<template>
  <div>
      <div class="box" id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts"
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
      var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var  option = {
          title: { text: '近一周订单数量' },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [230, 180, 300, 500, 400, 1000, 600],
                type: 'line'
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  },
};
</script>
<style scoped>
.box{
    width:1200px;
    height: 500px;
    margin: 20px auto;
}
</style>