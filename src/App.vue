<template>
  <el-container id="app">
    <el-header style="padding: 0">
      <navbar></navbar>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <myfooter></myfooter>
    </el-footer>
  </el-container>
</template>

<script>
import navbar from './components/navbar'
import myfooter from './components/myfooter'

export default {
  name: 'App',
  components: {
    navbar,
    myfooter
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
</style>
