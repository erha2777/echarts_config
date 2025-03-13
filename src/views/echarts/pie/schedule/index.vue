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

const schedule = ref(40)

onMounted(() => {
    option.title = {
        text: '已完成',
        subtext: 100 - (100 - schedule.value) + '%',
        top: '40%',
        left: 'center',
        textStyle: {
            fontSize: 20
        },
        subtextStyle: {
            fontSize: 80,
            fontWeight: 700
        },
        itemGap: 40
    }
    option.series = [
        {
            type: 'pie',
            center: ["50%", "50%"],
            radius: ["52%", "75%"],
            startAngle: 90,
            hoverAnimation: false,
            clockwise: false,
            labelLine: {
                show: false
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis:{
                disabled:true
            },
            data: [
                {
                    value: 100,
                    itemStyle: {
                        color: '#c8c8c8'
                    }
                }
            ]
        },
        {
            type: 'pie',
            center: ["50%", "50%"],
            radius: ["52%", "75%"],
            startAngle: 90,
            hoverAnimation: false,
            clockwise: false,
            labelLine: {
                show: false
            },
            itemStyle: {
                borderRadius: '15%',
            },
            data: [
                {
                    value: 100 - schedule.value,
                    itemStyle: {
                        color: 'transparent'
                    }
                },
                {
                    value: 100 - (100 - schedule.value),
                }
            ]
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

</script>

<template>
    <div class="box flex">
        <div id="echartsBox">
            饼图
        </div>
        <div class="config">
            <h3>配置 <el-link type="primary" @click="drawer = true">详细配置</el-link></h3>
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
                圆环背景半径: <br>
                radius[0]<el-input v-model="option.series[0].radius[0]" style="width: 240px;" class="m5" size="small"></el-input><br>
                radius[1]<el-input v-model="option.series[0].radius[1]" style="width: 240px;" class="m5" size="small"></el-input>
            </div>
            <div class="config-item">
                圆环内容半径: <br>
                radius[0]<el-input v-model="option.series[1].radius[0]" style="width: 240px;" class="m5" size="small"></el-input><br>
                radius[1]<el-input v-model="option.series[1].radius[1]" style="width: 240px;" class="m5" size="small"></el-input>
            </div>
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>