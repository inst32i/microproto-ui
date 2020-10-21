<template>
  <el-card class="el-card">
    <div slot="header" class="zhangTitle">
      <span>黎曼流形计算</span>
    </div>
    <div class="zhangContent">
      <img src="../../static/introOfReiman.png">
    </div>
    <div class="zhangUpload">
      <div class="labelSelectBox">
        <el-transfer
          v-model="checkedLabel"
          :data="calculateLabel"
          :titles="['可选数据项','用于计算数据项']"
          class="transferBox"
        >
        </el-transfer>
        <el-button
          class="caculateBtn"
          type="primary"
          :loading="isCalcBtnLoading"
          @click="handleCalc"
        >
          {{ buttonText }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import axios from 'axios'
export default {
  name: 'upload',
  data () {
    return {
      calculateLabel: [],
      checkedLabel: [],
      buttonText: '等待数据输入',
      isCalcBtnLoading: true,
      filePath: ''
    }
  },
  methods: {
    handleCalc () {
      this.isCalcBtnLoading = true
      this.buttonText = '计算中，请稍候...'
      // console.log(this.checkedLabel)
      let axiosLabel = []
      for (let i = 0; i < this.checkedLabel.length; i++) {
        axiosLabel.push(this.calculateLabel[this.checkedLabel[i] - 1].label)
      }
      // console.log(axiosLabel)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/calc',
        headers: {'Content-Type': 'multipart/form-data'},
        data: {
          filePath: this.filePath,
          checkedLabels: axiosLabel
        }
      }).then((res) => {
        // console.log(res)
        this.$router.push({
          name: 'graph',
          params: {
            time: res.data.time,
            value: res.data.value,
            ipLoc: res.data.ipLoc,
            pairs: res.data.pairs
          }
        })
      })
    }
  },
  mounted () {
    // 尝试从vuex读取数据
    if (this.$store.state.labels.length !== 0 && this.$store.state.selectLabels.length !== 0 && this.$store.state.filePath !== '') {
      // 添加文件路径
      this.filePath = this.$store.state.filePath
      // 添加所有标签
      this.calculateLabel = this.$store.state.labels.map((item, index) => {
        return {
          key: index + 1,
          label: item,
          disabled: false
        }
      })
      // 加入推荐的标签到已选择标签
      for (let i = 1; i <= this.$store.state.selectLabels.length; i++) {
        let tmpLabel = this.$store.state.selectLabels[i - 1]
        for (let j = 1; j <= this.$store.state.labels.length; j++) {
          if (tmpLabel === this.$store.state.labels[j - 1]) {
            this.checkedLabel.push(j)
            break
          }
        }
      }
      // 改变显示按钮状态
      this.isCalcBtnLoading = false
      this.buttonText = '开始计算'
    }
  }
}
</script>

<style scoped>
  .zhangTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-size: larger;
  }
  .zhangContent {
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-bottom: 20px;
  }
  .zhangUpload {
    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
    align-items: start;
  }
  .caculateBtn {
    height: 40px;
    margin-left: 50px;
  }
  .labelSelectBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
</style>
