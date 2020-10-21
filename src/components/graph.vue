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
      timeofGraph: 0,
      newRiskValue: 0,
      newRiskTime: '',
      newLink: null,
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
            layout: 'force',
            // circular: {
            //   rotateLabel: true
            // },
            force: {
              repulsion: 0,
              gravity: 0,
              edgeLength: 50
            },
            // symbol: 'image://../../static/btn_host.png',
            symbol: 'circle',
            data: [],
            links: [],
            roam: true,
            lineStyle: {
              color: 'red',
              width: 2,
              opacity: 1
            },
            itemStyle: {
              color: 'green',
              opacity: 0.5
            }
          }
        ]
      }
    }
  },
  methods: {
    drawLine: function () {
      // 图标初始化
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption(this.option1)
      // 计算图1总时长
      if (this.$route.params.time) {
        this.timeofGraph = this.$route.params.time.length * 2000
      }
      // 添加新风险值点
      if (this.option1.xAxis.data) {
        let Index = 0
        setInterval(() => {
          if (Index < this.$route.params.time.length) {
            this.newRiskTime = this.$route.params.time[Index]
            this.newRiskValue = this.$route.params.value[Index]
            // 更新图1
            myChart1.setOption(this.option1)
            Index++
          }
        }, 2000)
      }
    },
    drawTopology: function () {
      // 图2初始化
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption(this.option2)
      // 添加图2点
      if (this.$route.params.ipLoc) {
        this.option2.series[0].data = this.$route.params.ipLoc.map((item, index) => {
          return {
            id: index,
            name: item[0],
            value: item[1],
            symbolSize: 8
          }
        })
      }
      // 计算图2跳数据间隔
      let intervalofTopo = 200
      if (this.$route.params.pairs) {
        intervalofTopo = Math.round(this.timeofGraph / this.$route.params.pairs.length)
        console.log(intervalofTopo)
      }
      // 添加图2攻击路径
      if (this.$route.params.pairs) {
        let tmpSource = [], tmpTarget = []
        for (let i = 0; i < this.$route.params.pairs.length; i++) {
          tmpSource.push(this.$route.params.pairs[i][0])
          tmpTarget.push(this.$route.params.pairs[i][1])
        }
        let Index = 0
        setInterval(() => {
          if (Index < this.$route.params.pairs.length) {
            this.newLink = {
              id: Index,
              name: null,
              source: tmpSource[Index],
              target: tmpTarget[Index]
            }
            myChart2.setOption(this.option2)
            Index++
          }
        }, intervalofTopo)
      }
    }
  },
  mounted() {
    if (this.$route.params) {
      this.drawLine()
      this.drawTopology()
    }
  },
  watch: {
    newRiskValue (newVal, oldVal) {
      // 添加风险值，最多同时显示10条
      this.option1.series[0].data.push(this.newRiskValue)
      if (this.option1.series[0].data.length > 10) {
        this.option1.series[0].data.shift()
      }
    },
    newRiskTime (newVal, oldVal) {
      // 添加时间戳，最多同时显示10条
      this.option1.xAxis.data.push(this.newRiskTime)
      if (this.option1.xAxis.data.length > 10) {
        this.option1.xAxis.data.shift()
      }
    },
    newLink (newVal, oldVal) {
      // 添加新攻击路径
      this.option2.series[0].links.push(this.newLink)
      if (this.option2.series[0].links.length > 15) {
        this.option2.series[0].links.shift()
      }
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
