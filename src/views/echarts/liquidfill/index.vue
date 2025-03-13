<script setup lang="ts">
import { onMounted, reactive, watch, computed, nextTick, ref } from 'vue'
import myEcharts from '../../../utils/myEcharts'
import 'echarts-liquidfill'

const option: any = reactive({
    title: {
        show: true,
        text: '水球图'
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
    roseType: false
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
        children: [
            {
                name: 'left',
                title: '距离容器左侧的距离',
                type: 'input',
                width: 50
            },
            {
                name: 'top',
                title: '距离容器顶部的距离',
                type: 'input',
                width: 50
            },
            {
                name: 'right',
                title: '距离容器右侧的距离',
                type: 'input',
                width: 50
            },
            {
                name: 'bottom',
                title: '距离容器底部的距离',
                type: 'input',
                width: 50
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

const imgPath = 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z'

onMounted(() => {
    option.series = [
        {
            
            name: 'Liquid Fill',
            type: 'liquidFill',
            data: [
                0.6,
                {
                    value: 0.5,
                    direction: 'left',
                    itemStyle: {
                        color: '#fff'
                    }
                },
                0.4,
                0.3
            ],
            color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
            center: ['25%', '50%'],
            radius: '50%',
            amplitude: '8%',// 波浪曲线
            waveLength: '80%',
            phase: 'auto',
            // period: 'auto',
            period: function (value:any, index:any) {
                return 2000 * index + 1000;
            },
            direction: 'right',
            shape: 'circle',// 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow','container'

            waveAnimation: true, // 是否启用波浪滚动动画
            animationEasing: 'linear', // 初始动画的缓动效果
            animationEasingUpdate: 'linear', // 数据更新动画的缓动效果
            animationDuration: 5000, // 初始动画的时长
            animationDurationUpdate: 1000, // 数据更新动画的时长

            outline: { // 轮廓
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'none',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },

            backgroundStyle: {
                // borderWidth: 5,
                // borderColor: 'red',
                // color: 'yellow'
            },

            itemStyle: {
                opacity: 0.95,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            
            label: {
                show: true,
                formatter: function () { // 更改文本 {a}则表示系列名称、{b}数据名称和{c}数据值
                    return 'ECharts\nLiquid Fill';
                },
                color: '#294D99',
                insideColor: '#fff',
                fontSize: 50,
                fontWeight: 'bold',
                align: 'center',
                baseline: 'middle',
                position: 'inside'// 文本位置
            },

            emphasis: {
                itemStyle: {
                    opacity: 0.8
                }
            },
            silent: true
        },
        {
            
            name: 'Liquid Fill',
            type: 'liquidFill',
            data: [
                0.6,
                0.5,
                0.4,
                0.3
            ],
            color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
            center: ['80%', '50%'],
            radius: '50%',
            shape: imgPath,

            outline: { // 轮廓
                show: false,
            },

            backgroundStyle: {
                borderColor: '#156ACF',
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowBlur: 20
            },

            itemStyle: {
                opacity: 0.95,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            
            label: {
                position: ['38%', '40%'],
                formatter: function() {
                    return 'ECharts\nLiquid Fill';
                },
                fontSize: 40,
                color: '#D94854'
            },

            emphasis: {
                itemStyle: {
                    opacity: 0.8
                }
            },
        }
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
                形状:
                <el-radio-group v-model="option.series[0].shape">
                    <el-radio label="circle">circle</el-radio>
                    <el-radio label="rect">rect</el-radio>
                    <el-radio label="roundRect">roundRect</el-radio>
                    <el-radio label="triangle">triangle</el-radio>
                    <el-radio label="diamond">diamond</el-radio>
                    <el-radio label="pin">pin</el-radio>
                    <el-radio label="arrow">arrow</el-radio>
                    <el-radio label="container">container</el-radio>
                </el-radio-group>
            </div>
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>