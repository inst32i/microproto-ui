<template>
  <el-menu
    default-active="1"
    class="el-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >

    <el-menu-item index="1">
      <el-image
        style="width: 40px; height: 40px"
        :src="imgPath"
        fit="fill"
      ></el-image>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span>张氏算法</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-s-promotion"></i>
      <span>陈氏算法</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-s-data"></i>
      <span>图表展示</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-s-tools"></i>
      <span>参数配置</span>
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
  }
}
</script>

<style scoped>

</style>
