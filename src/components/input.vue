<template>
  <div>
    <iframe src="http://localhost:8000/input" width="100%" height="800px" class="iframeStyle"></iframe>
    <div class="upload">
      <div class="tips">上传行为数据</div>
      <el-upload
        drag
        show-file-list
        action=""
        multiple
        accept="xls,xlsx,xlsm,csv"
        :http-request="fileget"
        class="uploadFrame"
      >
        <div class="uploadText">Drag & drop files here ...</div>
      </el-upload>
      <div class="loadingTips">{{textTips}}</div>
    </div>
  </div>
  </template>

<script>
import axios from "axios"

export default {
  name: 'input',
  data () {
    return {
      file: null,
      param: null,
      textTips: '请上传观测数据'
    }
  },
  methods: {
    fileget (e) {
      this.file = e.file
      this.param = new FormData()
      this.param.append('pic_file', this.file, this.file.name)
      // console.log(this.file)
      this.textTips = '数据上传中，请稍候...'
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/upload',
        headers: {'Content-Type': 'multipart/form-data'},
        data: this.param
      }).then((res) => {
        // console.log(res)
        this.$store.commit('editLabels', res.data.labels)
        this.$store.commit('editselectLabels', res.data.selectLabels)
        this.$store.commit('editFilePath', res.data.path)
        this.textTips = '数据上传完成！'
      }).catch((error) => {
        this.textTips = '数据上传失败！'
      })
    }
  }
}
</script>

<style scoped>
  .iframeStyle {
    border: medium none;
  }

  .upload {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tips {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: #C5D1C3;
    font-size: 30px;
    font-weight: bold;
    color: black;
    width: 822px;
    margin-bottom: 20px;
  }

  .uploadFrame {
    border: 1px dashed #DDDDDD;
  }

  /deep/.uploadFrame .el-upload-dragger {
    width: 800px !important;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uploadText {
    font-size: 25px;
    color: #A8A8A8;
  }

  .loadingTips {
    margin-top: 20px;
    font-size: 25px;
  }
</style>
