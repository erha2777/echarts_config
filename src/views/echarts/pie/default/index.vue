<script setup lang="ts">
import { onMounted, reactive, watch, computed, nextTick, ref } from 'vue'
import myEcharts from '../../../../utils/myEcharts'
import configComponent from '../../../../components/configComponent.vue'

const option: any = reactive({
    title: {
        show: true,
        text: '饼图'
    },
    legend: {
        show: true,
    },
    grid: {
        top: 60,
        right: '10%',
        bottom: 60,
        left: '10%'
    },
    tooltip: {
        show: true,
        trigger: 'item'
    },
    // axisPointer: {
    //     show: true,
    //     type:'shadow'
    // },
    series: [
        {
        },
    ],
    toolbox: {
        right: 10,
        show: true,
        feature: {
            saveAsImage: {
                title: '保存为图片'
            },
            restore: {
                title: '还原'
            },
            dataView: {
                title: '数据视图'
            },
        },
    },
})
const config = reactive({
    roseType:false
})


const configList: any = reactive([
    {
        name: 'title',
        dataName: 'show',
        title: '标题',
        type: 'radio',
        radioList: [
            {
                label: '是',
                value: true
            },
            {
                label: '否',
                value: false
            }
        ],
        children: [
            {
                name: 'text',
                title: '标题文字',
                type: 'input',
                placeholder: '请输入标题'
            }
        ]
    },
    {
        name: 'legend',
        dataName: 'show',
        title: '图例组件',
        type: 'radio',
        radioList: [
            {
                label: '是',
                value: true
            },
            {
                label: '否',
                value: false
            }
        ],
        children:[
            {
                name: 'left',
                title: '距离容器左侧的距离',
                type: 'input',
                width:50
            },
             {
                name: 'top',
                title: '距离容器顶部的距离',
                type: 'input',
                width:50
            },
             {
                name: 'right',
                title: '距离容器右侧的距离',
                type: 'input',
                width:50
            },
             {
                name: 'bottom',
                title: '距离容器底部的距离',
                type: 'input',
                width:50
            }
        ]
    },
    {
        name: 'grid',
        dataName: ['top', 'right', 'bottom', 'left'],
        title: '直角坐标系内绘图网格',
        type: 'input',
    },
    
    {
        name: 'tooltip',
        dataName: 'show',
        title: '提示框组件',
        type: 'radio',
        radioList: [
            {
                label: '是',
                value: true
            },
            {
                label: '否',
                value: false
            }
        ],
        children: [
            {
                name: 'trigger',
                title: '触发类型',
                type: 'radio',
                radioList: [
                    {
                        label: 'item',
                        value: 'item'
                    },
                    {
                        label: 'axis',
                        value: 'axis'
                    },
                    {
                        label: 'none',
                        value: 'none'
                    }
                ],
            }
        ]
    },
    {
        name: 'toolbox',
        dataName: 'show',
        title: '工具栏',
        type: 'radio',
        radioList: [
            {
                label: '是',
                value: true
            },
            {
                label: '否',
                value: false
            }
        ]
    },
    // {
    //     name: 'axisPointer',
    //     dataName: 'show',
    //     title: '坐标轴指示器',
    //     type: 'radio',
    //     radioList: [
    //         {
    //             label: '是',
    //             value: true
    //         },
    //         {
    //             label: '否',
    //             value: false
    //         }
    //     ]
    // },
])

const jsonStringify = computed(() => {
    let data = JSON.parse(JSON.stringify(option))
    let arr = Object.keys(data)
    arr.forEach(v => {
        if (data[v].show !== undefined && !data[v].show) {
            delete data[v]
        }
    })
    return JSON.stringify(data, null, 4)
})
const configZhCN = ref(false)
const drawer = ref(false)
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
    option.series = [
        {
            name: '2021',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            type: 'pie',
            radius: '50%',
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
    ]
    // 绘制图表
    // myChart.setOption(option);
    myEcharts('echartsBox', option)
})
watch(option, (newValue, oldValue) => {
    nextTick(() => {
        myEcharts('echartsBox', option)
    })
}, {
    deep: true,
    immediate: true
})
watch(() => config.roseType, (newValue, oldValue) => { // 南丁格尔图
    option.series.forEach((v: any) => {
        v.roseType = newValue
    })
}, {
    deep: true,
    immediate: true
})
</script>

<template>
    <div class="box flex">
        <div id="echartsBox">
            饼图
        </div>
        <div class="config">
            <h3>配置 <el-link type="primary" @click="drawer = true">详细配置</el-link>
            </h3>
            基础配置：
            <div class="config-item">
                title:
                <el-radio-group v-model="option.title.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                legend:
                <el-radio-group v-model="option.legend.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                grid: <br>
                top:<el-input v-model="option.grid.top" style="width: 50px;" class="m5" size="small"></el-input>
                right:<el-input v-model="option.grid.right" style="width: 50px;" class="m5" size="small"></el-input>
                bottom:<el-input v-model="option.grid.bottom" style="width: 50px;" class="m5" size="small"></el-input>
                left:<el-input v-model="option.grid.left" style="width: 50px;" class="m5" size="small"></el-input>
            </div>
            <div class="config-item">
                tooltip:
                <el-radio-group v-model="option.tooltip.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                toolbox:
                <el-radio-group v-model="option.toolbox.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
            option:
            <div style="height: 400px;overflow: hidden auto;">
                <pre>{{ jsonStringify }}</pre>
            </div>
        </div>
    </div>
    <el-drawer custom-class="bh-drawer" v-model="drawer" title="详细配置" direction="rtl"
        :before-close="() => { drawer = false }">
        <div class="detailConfig">
            <div class="config-item">
                中文解释:
                <el-radio-group v-model="configZhCN">
                    <el-radio :label="true" size="large">是</el-radio>
                    <el-radio :label="false" size="large">否</el-radio>
                </el-radio-group>
            </div>
            基础配置：
            <config-component :zhCN="configZhCN" :parentNode="option" :config-list="configList"></config-component>
            series配置：
            <div class="config-item">
                南丁格尔图:
                <el-radio-group v-model="config.roseType">
                    <el-radio label="radius">radius</el-radio>
                    <el-radio label="area">area</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>