<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts';

onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
    console.log(myChart);

    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
})

</script>

<template>
    <div class="box flex">
        <div id="echartsBox">
        柱形图
        </div>
        <div class="config">
            配置
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>