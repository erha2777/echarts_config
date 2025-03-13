<script setup lang="ts">
import { onMounted, reactive, watch, computed, nextTick, ref } from 'vue'
import myEcharts from '../../../utils/myEcharts'
import configComponent from '../../../components/configComponent.vue'

const option: any = reactive({
    title: {
        show: true,
        text: '折线图'
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
    xAxis: {
        show: true,
        axisLine: {
            show: true
        },
        axisTick: {
            show: true
        },
        minorTick: {
            show: false
        },
        axisLabel: {
            show: true
        },
        splitLine: {
            show: false
        },
        minorSplitLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        axisPointer: {
            show: true
        }
    },
    yAxis: {
        show: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        minorTick: {
            show: false
        },
        axisLabel: {
            show: true
        },
        splitLine: {
            show: true
        },
        minorSplitLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        axisPointer: {
            show: false
        }
    },
    tooltip: {
        show: true,
        trigger: 'none'
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
            dataZoom: {
                title: {
                    zoom: '区域缩放',
                    back: '区域缩放还原'
                }
            },
            magicType: {
                type: ['line', 'bar', 'stack'],
                title: {
                    line: '切换为折线图',
                    bar: '切换为柱状图',
                    stack: '切换为堆叠',
                    tiled: '切换为平铺',
                }
            },
            brush: {
                title: {
                    rect: '矩形选择',
                    polygon: '圈选',
                    lineX: '横向选择',
                    lineY: '纵向选择',
                    keep: '保持选择',
                    clear: '清除选择'
                }
            }
        },
    },
    brush: {
        toolbox: ['rect', 'polygon', 'keep', 'clear']
    }
})
const config = reactive({
    smooth: 0,
    areaStyle: 0,
    step: 0
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
    },
    {
        name: 'grid',
        dataName: ['top', 'right', 'bottom', 'left'],
        title: '直角坐标系内绘图网格',
        type: 'input',
    },
    {
        name: 'xAxis',
        dataName: 'show',
        title: 'X 轴',
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
                name: 'axisLine',
                dataName: 'show',
                title: '坐标轴轴线',
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
            },
            {
                name: 'axisTick',
                dataName: 'show',
                title: '坐标轴刻度',
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
            },
            {
                name: 'minorTick',
                dataName: 'show',
                title: '坐标轴次刻度线',
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
            },
            {
                name: 'axisLabel',
                dataName: 'show',
                title: '坐标轴刻度标签',
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
            },
            {
                name: 'splitLine',
                dataName: 'show',
                title: '分隔线',
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
            },
            {
                name: 'minorSplitLine',
                dataName: 'show',
                title: '次分隔线',
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
            },
            {
                name: 'splitArea',
                dataName: 'show',
                title: '分隔区域',
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
            },
            {
                name: 'axisPointer',
                dataName: 'show',
                title: '坐标轴指示器',
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
            }
        ]
    },
    {
        name: 'yAxis',
        dataName: 'show',
        title: 'Y 轴',
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
                name: 'axisLine',
                dataName: 'show',
                title: '坐标轴轴线',
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
            },
            {
                name: 'axisTick',
                dataName: 'show',
                title: '坐标轴刻度',
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
            },
            {
                name: 'minorTick',
                dataName: 'show',
                title: '坐标轴次刻度线',
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
            },
            {
                name: 'axisLabel',
                dataName: 'show',
                title: '坐标轴刻度标签',
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
            },
            {
                name: 'splitLine',
                dataName: 'show',
                title: '分隔线',
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
            },
            {
                name: 'minorSplitLine',
                dataName: 'show',
                title: '次分隔线',
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
            },
            {
                name: 'splitArea',
                dataName: 'show',
                title: '分隔区域',
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
            },
            {
                name: 'axisPointer',
                dataName: 'show',
                title: '坐标轴指示器',
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
            }
        ]
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
    return JSON.stringify(option, null, 4)
})
const configZhCN = ref(false)
const drawer = ref(false)
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
    option.series = [
        {
            name: '2021',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            smooth: 0,
            step: 0
        },
        {
            name: '2022',
            data: [200, 110, 150, 80, 130, 120, 70],
            type: 'line',
            smooth: 0,
            step: 0
        },
    ]
    option.tooltip.trigger = 'axis'
    option.xAxis.type = 'category'
    option.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
watch(() => config.smooth, (newValue, oldValue) => { // 是否开启平滑
    option.series.forEach((v: any) => {
        v.smooth = newValue
    })
}, {
    deep: true,
    immediate: true
})
watch(() => config.areaStyle, (newValue, oldValue) => { // 是否开启堆叠图
    option.series.forEach((v: any) => {
        if (newValue) {
            v.areaStyle = {}
            v.stack = 'Total'
            v.emphasis = {
                focus: 'series'
            }
        } else {
            delete v.areaStyle
            delete v.stack
            delete v.emphasis
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => config.step, (newValue, oldValue) => { // 阶梯线图
    option.series.forEach((v: any) => {
        v.step = newValue
    })
}, {
    deep: true,
    immediate: true
})
</script>

<template>
    <div class="box flex">
        <div id="echartsBox">
            折线图
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
                xAxis:
                <el-radio-group v-model="option.xAxis.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                yAxis:
                <el-radio-group v-model="option.yAxis.show">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
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
            option:
            <div class="config-item">
                -平滑:
                <el-radio-group v-model="config.smooth">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <br>
                -堆叠柱形图:
                <el-radio-group v-model="config.areaStyle">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <br>
                -阶梯线图:
                <el-radio-group v-model="config.step">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </div>
            <!-- <div style="height: 400px;overflow: hidden auto;">
                <pre>{{ jsonStringify }}</pre>
            </div> -->
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>