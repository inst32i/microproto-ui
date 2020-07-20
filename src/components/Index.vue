<template>
  <el-card class="el-card">
    <div slot="header" class="indexTitle">
      <span>网络系统安全量化评估实验系统</span>
    </div>
    <div class="indexContent">
      <span>●本系统基于微分流形与AHP，可以对输入的数据集进行网络安全风险量化度量，并以图形化的方式展示计算结果</span>
      <span>●技术支持团队:北京理工大学计算机学院复杂网络实验室</span>
      <span>●使用方法如下</span>
    </div>
    <el-steps :active="stepActive" :align-center="true">
      <el-step
        title="选择算法"
        icon="el-icon-edit"
        description="在两种算法中选择一种"
      ></el-step>
      <el-step
        title="上传数据"
        icon="el-icon-edit"
        description="上传表格形式的观测数据"
      ></el-step>
      <el-step
        title="选择指标"
        icon="el-icon-edit"
        description="选择几项用于计算的指标"
      ></el-step>
      <el-step
        title="查看报表"
        icon="el-icon-edit"
        description="以图表形式查看计算结果"
      ></el-step>
      <el-step
        title="结果下载"
        icon="el-icon-edit"
        description="将结果保存为本地文件"
      ></el-step>
    </el-steps>
  </el-card>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      stepActive: 1
    }
  },
  methods: {
    setStepByTime: function () {
      setInterval(() => {
        if (this.stepActive === 5) {
          this.stepActive = 0
        } else {
          this.stepActive = this.stepActive + 1
        }
      }, 1000)
    }
  },
  computed: {
  },
  mounted () {
    this.setStepByTime()
  }
}
</script>

<style scoped>
  .indexTitle {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-size: xx-large;
  }
  .indexContent {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-bottom: 20px;
  }
</style>
