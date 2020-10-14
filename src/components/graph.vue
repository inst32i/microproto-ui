<template>
  <div class="resultShow">
    <el-card class="graphCard">
      <div id="myChart1" :style="{width: '800px', height: '600px'}"></div>
    </el-card>
    <el-card class="graphCard">
      <div id="myChart2" :style="{width: '800px', height: '600px'}"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'graph',
  data () {
    return {
      option1: {
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
          name: '风险值',
          type: 'line',
          lineStyle: {
            width: 4
          },
          data: this.$route.params.value ? this.$route.params.value.slice(0, 10) : null
        }],
        visualMap: [{
          dimension: 1,
          min: 1,
          max: this.$route.params.value ? Math.max(...this.$route.params.value) : 1,
          inRange: {
            color: ['green', 'red']
          }
        }]
      },
      option2: {
        title: {
          text: '拓扑结构展示',
          left: 370
        },
        tooltip: {},
        series: [
          {
            name: 'IP地址',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true
            },
            data: [],
            links: [],
            roam: true,
            lineStyle: {
              color: 'red',
              width: 3,
              opacity: 1
            }
          }
        ]
      }
    }
  },
  methods: {
    drawLine: function () {
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption(this.option1)
      let Index = 10
      let _this = this
      if (this.option1.xAxis.data) {
        setInterval(function () {
          if (Index < _this.$route.params.time.length) {
            _this.option1.xAxis.data.shift()
            _this.option1.series[0].data.shift()
            let tmpTime = _this.$route.params.time[Index]
            let tmpValue = _this.$route.params.value[Index]
            _this.option1.xAxis.data.push(tmpTime)
            _this.option1.series[0].data.push(tmpValue)
            myChart1.setOption(_this.option1)
            Index++
          }
        }, 500)
      }
    },
    drawTopology: function () {
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      if (this.$route.params.ipLoc) {
        for (let i = 0; i < this.$route.params.ipLoc.length; i++) {
          this.option2.series[0].data.push({
            id: i,
            name: this.$route.params.ipLoc[i][0],
            itemStyle: null,
            value: this.$route.params.ipLoc[i][1],
            symbolSize: 2
          })
        }
      }
      //   console.log(tmpSource)
      //   console.log(tmpTarget)
      //   for (let i = 0; i < this.$route.params.pairs.length; i++) {
      //     links.push({
      //       id: i,
      //       name: null,
      //       source: tmpSource[i],
      //       target: tmpTarget[i]
      //     })
      //   }
      // }
      // console.log(links.length)
      myChart2.setOption(this.option2)
      if (this.$route.params.pairs) {
        let tmpSource = [], tmpTarget = []
        for (let i = 0; i < this.$route.params.pairs.length; i++) {
          tmpSource.push(this.$route.params.pairs[i][0])
          tmpTarget.push(this.$route.params.pairs[i][1])
        }
        let Index = 0
        let _this = this
        setInterval(function () {
          if (Index < _this.$route.params.pairs.length) {
            _this.option2.series[0].links.push({
              id: Index,
              name: null,
              source: tmpSource[Index],
              target: tmpTarget[Index]
            })
            if (_this.option2.series[0].links.length > 5) {
              _this.option2.series[0].links.shift()
            }
            myChart2.setOption(_this.option2)
            Index++
          }
        }, 1000)
      }
    }
  },
  mounted() {
    if (this.$route.params) {
      this.drawLine()
      this.drawTopology()
    }
  }
}
</script>

<style scoped>
  .graphCard {
    width: 900px;
  }
  .resultShow {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
