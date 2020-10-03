<template>
  <div>
    <el-card class="graphCard">
      <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'graph',
  data () {
    return {
      option: {
        title: {
          text: '安全度量结果',
          left: 370
        },
        tooltip: {},
        xAxis: {
          data: this.$route.params.time ? this.$route.params.time.slice(0, 10) : null,
          name: '时间轴',
          nameTextStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              width: 2
            },
            symbol: ['none', 'arrow']
          }
        },
        yAxis: {
          name: '风险值',
          nameTextStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              width: 2
            },
            symbol: ['none', 'arrow']
          }
        },
        series: [{
          name: '销量',
          type: 'line',
          lineStyle: {
            width: 4
          },
          data: this.$route.params.value ? this.$route.params.value.slice(0, 10) : null
        }],
        visualMap: [{
          dimension: 1,
          min: 0,
          max: 1,
          inRange: {
            color: ['green', 'red']
          }
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
      if (this.option.xAxis.data) {
        setInterval(function () {
          if (Index < _this.$route.params.time.length) {
            _this.option.xAxis.data.shift()
            _this.option.series[0].data.shift()
            let tmpTime = _this.$route.params.time[Index]
            let tmpValue = _this.$route.params.value[Index]
            _this.option.xAxis.data.push(tmpTime)
            _this.option.series[0].data.push(tmpValue)
            myChart.setOption(_this.option)
            Index++
          }
        }, 1000)
      }
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
  .graphCard {
    width: 50%;
  }
</style>
