<template>
  <el-menu
    default-active="index"
    class="el-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="index">
      <el-image
        style="width: 40px; height: 40px"
        :src="imgPath"
        fit="fill"
      ></el-image>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="rieman">
      <i class="el-icon-menu"></i>
      <span>黎曼流形</span>
    </el-menu-item>
    <el-menu-item index="graph">
      <i class="el-icon-s-data"></i>
      <span>图表展示</span>
    </el-menu-item>
    <el-menu-item index="input">
      <i class="el-icon-s-promotion"></i>
      <span>输入数据</span>
    </el-menu-item>
    <el-menu-item index="templatecreate">
      <i class="el-icon-s-promotion"></i>
      <span>创建模板</span>
    </el-menu-item>
    <el-menu-item index="manifold">
      <i class="el-icon-s-promotion"></i>
      <span>流形计算</span>
    </el-menu-item>
    <el-menu-item index="ahp">
      <i class="el-icon-s-promotion"></i>
      <span>AHP计算</span>
    </el-menu-item>
    <el-menu-item index="d3mhl">
      <i class="el-icon-s-promotion"></i>
      <span>多层多维多粒度</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      imgPath: require('../assets/bit_logo.png')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      this.$emit('menuSelect', key)
    }
  }
}
</script>

<style scoped>

</style>
