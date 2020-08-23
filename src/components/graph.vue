<template>
  <div>
    <span>图表展示</span>
    <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'graph',
  data () {
    return {
      option: {
        title: { text: '安全度量结果' },
        tooltip: {},
        xAxis: {
          data: this.$route.params.time.slice(0,10)
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: this.$route.params.value.slice(0,10)
        }]
      }
    }
  },
  methods: {
    drawLine(){
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option)
      let Index = 10
      let _this = this
      setInterval(function () {
        _this.option.xAxis.data.shift()
        _this.option.series[0].data.shift()
        let tmp_Time = _this.$route.params.time[Index]
        let tmp_Value = _this.$route.params.value[Index]
        _this.option.xAxis.data.push(tmp_Time)
        _this.option.series[0].data.push(tmp_Value)
        myChart.setOption(_this.option)
        Index++
      }, 1000)
    }
  },
  mounted() {
    if (this.$route.params) {
      this.drawLine()
    }
  }
}
</script>

<style scoped>

</style>
