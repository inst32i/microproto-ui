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
        action="http://localhost:5000/zhang"
        accept="xls,xlsx,xlsm,csv"
        :before-upload="tryUpload"
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
export default {
  name: 'zhang',
  data () {
    return {
      calculateLabel: [],
      checkedLabel: [],
      fakeLabel: ['UDP流量', 'TCP/IP流量', '磁盘占用率']
    }
  },
  methods: {
    // 上传文件方法，建议使用axios异步解决跨域。file为即将上传的文件
    tryUpload (file) {
      // 模拟异步获取标签
      setTimeout(() => {
        this.calculateLabel = this.fakeLabel
      }, 1000)
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
