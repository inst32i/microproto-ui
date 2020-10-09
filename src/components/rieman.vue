<template>
  <el-card class="el-card">
    <div slot="header" class="zhangTitle">
      <span>黎曼流形计算</span>
    </div>
    <div class="zhangContent">
      <span>黎曼流形详解</span>
    </div>
    <div class="zhangUpload">
      <div class="uploadAndButton">
        <el-upload
          drag
          show-file-list
          action=""
          multiple
          accept="xls,xlsx,xlsm,csv,mp4"
          :http-request="fileget"
          class="uploadBox"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="buttonBox">
          <el-button
            class="caculateBtn"
            type="primary"
            v-show="isCalcBtnShow"
            :disabled="isCalcBtnDisabled"
            @click="handleCalc"
          >
            {{ buttonText }}
          </el-button>
        </div>
      </div>
      <div>
        <el-transfer
          v-model="checkedLabel"
          :data="calculateLabel"
          :titles="['可选数据项','用于计算数据项']"
          class="transferBox"
        >
        </el-transfer>
<!--        <el-checkbox-group-->
<!--          size="medium"-->
<!--          v-model="checkedLabel"-->
<!--          class="labelBox"-->
<!--        >-->
<!--          <el-checkbox-->
<!--            border-->
<!--            v-for="item in calculateLabel"-->
<!--            :label="item"-->
<!--            :key="item"-->
<!--            class="calLabel"-->
<!--          >-->
<!--            {{item}}-->
<!--          </el-checkbox>-->
<!--        </el-checkbox-group>-->
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
      file: null,
	    param: null,
      calculateLabel: [],
      checkedLabel: [],
      buttonText: '计算',
      isCalcBtnShow: false,
      isCalcBtnDisabled: false,
      filePath: ''
    }
  },
  methods: {
    fileget(e){
      this.file = e.file;
      this.param = new FormData();
      this.param.append('pic_file',this.file, this.file.name);
      // console.log(this.file)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/upload',
        headers: {'Content-Type': 'multipart/form-data'},
        data: this.param
      }).then((res)=>{
        // console.log(res)
        this.filePath = res.data.path
        // this.calculateLabel = res.data.labels
        for (let i = 1; i <= res.data.labels.length; i++) {
          this.calculateLabel.push({
            key: i,
            label: res.data.labels[i - 1],
            disabled: false
          })
        }
        this.isCalcBtnShow = true
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleCalc () {
      this.isCalcBtnDisabled = true
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
      }).then((res)=>{
        // console.log(res)
        this.$router.push({
          name: 'graph',
          params: {
            time: res.data.time,
            value: res.data.value
          }
        })
      })
    }
  },
  created () {

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
  .labelBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .uploadBox {
    margin-bottom: 20px;
  }
  .calLabel {
    margin: 10px;
  }
  .uploadAndButton {
    display: flex;
    flex-direction: row;
  }
  .buttonBox {
    margin: 20px;
    /*border: 1px solid red;*/
  }
  .caculateBtn {
    margin-top: 120px;
  }
</style>
