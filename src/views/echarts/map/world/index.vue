<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';
import worldJSON from '../../../../assets/json/world_zh.json';
const chinaMap = ref();
onMounted(() => {
    drawChina()
})

let regions = [
    {
        // name: '新疆维吾尔自治区',
        name: '美国',
        itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,
        },
    },
    {
        // name: '四川省',
        name: '中国',
        itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
        },
    },
    {
        // name: '陕西省',
        name: '俄罗斯',
        itemStyle: {
            areaColor: '#fd691b',
            opacity: 1,
        },
    },
    {
        // name: '黑龙江省',
        name: '英国',
        itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
        },
    },
]
let scatter = [
    {
        name: "北京",
        value: [116.24, 39.55, 100]
    },
    {
        name: "莫斯科",
        value: [37.36, 55.45, 100]
    },
]
function drawChina() {
    var myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
    echarts.registerMap('world', worldJSON as any) //注册可用的地图
    var option = {
        backgroundColor: '#f4f5f8',

        geo: {
            // layoutCenter: ['50%', '50%'],
            map: 'world',
            roam: true, //是否允许缩放，拖拽
            zoom: 1, //初始化大小
            //缩放大小限制
            scaleLimit: {
                min: 1, //最小
                max: 2, //最大
            },
            //设置中心点
            // center: [115.97, 29.71],
            //省份地图添加背景
            regions: regions,
            // 默认状态
            itemStyle: {
                areaColor: '#f4f5f8',
                borderWidth: 1,
                borderColor: '#b8c7d5',
            },
            //高亮状态
            emphasis: {
                label: {
                    show: true
                },
                itemStyle: {
                    areaColor: '#f4f5f8',
                    borderColor: '#b8c7d5',
                }
            },
            // 选中状态
            select: {
                label: false,
                itemStyle: {
                    areaColor: '#f4f5f8',
                    borderColor: '#b8c7d5',
                }
            },
        },
        //配置属性
        series: {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: scatter,
            showEffectOn: 'render',
            rippleEffect: {
                //涟漪特效相关配置
                brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
            },
            hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
            label: {
                //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                formatter: '{b}',
                position: 'right',
                show: true,
            },
            itemStyle: {
                //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
                color: '#ffffff', //散点的颜色
                shadowBlur: 10,
                shadowColor: 20,
                fontSize: '12px',
            },
            zlevel: 1,
        },
    };
    myChart.setOption(option)
}
</script>

<template>
    <div class="box flex">
        <div id="echartsBox">
            中国地图
        </div>
        <div class="config">
            配置
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>