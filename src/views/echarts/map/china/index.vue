<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';
import chinaJSON from '../../../../assets/json/china2.json';
const chinaMap = ref();
onMounted(() => {
    drawChina()
})
let regions = [
    {
        name: '新疆维吾尔自治区',
        // name: '新疆',
        itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,
        },
    },
    {
        name: '四川省',
        // name: '四川',
        itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
        },
    },
    {
        name: '陕西省',
        // name: '陕西',
        itemStyle: {
            areaColor: '#fd691b',
            opacity: 1,
        },
    },
    {
        name: '黑龙江省',
        // name: '黑龙江',
        itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
        },
    },
]
let scatter = [
    { name: '北京烤鸭', value: [116.46122, 39.97886, 9] },
    { name: '兰州拉面', value: [103.86615, 36.040129, 9] },
    { name: '新疆烤肉', value: [87.613228, 43.810394, 9] },
    { name: '长沙臭豆腐', value: [112.915204, 28.207735, 9] },
    { name: '西安肉夹馍', value: [108.953445, 34.288842, 9] },
    { name: '云南', value: [102.710002, 25.045806, 9] },
]
function drawChina() {
    var myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
    echarts.registerMap('china', chinaJSON as any) //注册可用的地图
    var option = {
        backgroundColor: '#f4f5f8',
        geo: {
            map: 'china',
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
                    show:true
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
    }
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