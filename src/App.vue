<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref(location.hash.slice(2, location.hash.length))
const isCollapse = ref(false)
</script>

<template>
  <el-container>
    <el-header class="header flex_sb_c">
      <div class="logo" @click="isCollapse = !isCollapse" :style="{ width: isCollapse ? '64px' : '200px' }">
        <img src="./assets/logo.png" width="30">
        <span class="ml5" v-show="!isCollapse">这是logo</span>
      </div>
      <div>这是用户选项</div>
    </el-header>
    <el-container class="main">
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="bh-menu" :default-active="activeIndex"
          text-color="#fff" :collapse="isCollapse" :collapse-transition="false" height="100%" router>

          <el-menu-item index="home">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="echarts">
            <template #title>
              <el-icon>
                <Histogram />
              </el-icon>
              <span>echarts</span>
            </template>
            <el-menu-item index="echartsBar">柱形图</el-menu-item>
            <el-menu-item index="echartsLine">折线图</el-menu-item>
            <el-sub-menu index="echartsPie">
              <template #title>饼图</template>
              <el-menu-item index="echartsPieDefault">普通饼图</el-menu-item>
              <el-menu-item index="echartsPieAnnulus">环形图</el-menu-item>
              <el-menu-item index="echartsPieSchedule">进度环形图</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="echartsMap">
              <template #title>地图</template>
              <el-menu-item index="echartsChinaMap">中国地图</el-menu-item>
              <el-menu-item index="echartsWorldMap">世界地图</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="echartsGraph">关系图</el-menu-item>
            <el-menu-item index="echartsWordcloud">词云图</el-menu-item>
            <el-menu-item index="echartsLiquidfill">水球图</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <span>待定</span>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <el-icon>
              <setting />
            </el-icon>
            <span>待定</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@import './styles/layout.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f8fafb;
}
</style>
