<template>
  <el-card class="el-card">
    <div slot="header" class="zhangTitle">
      <span>张氏算法</span>
    </div>
    <div class="zhangContent">
      <span>张氏算法详解</span>
    </div>
    <div class="zhangUpload">
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
      <div>
        <el-checkbox-group
          size="medium"
          v-model="checkedLabel"
        >
          <el-checkbox
            border
            v-for="item in calculateLabel"
            :label="item"
            :key="item"
            class="calLabel"
          >
            {{item}}
          </el-checkbox>
        </el-checkbox-group>
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
      file:null,
	  param:null
    }
  },
  methods: {
	fileget(e){
	this.file = e.file;
	this.param = new FormData();
	this.param.append('pic_file',this.file, this.file.name);
	console.log(this.file)
	axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/upload',
    headers: {'Content-Type': 'multipart/form-data'},
    data: this.param
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
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
    justify-content: space-between;
    align-items: start;
  }
  .uploadBox {
    margin-bottom: 20px;
  }
  .calLabel {
    margin: 0;
  }
</style>
