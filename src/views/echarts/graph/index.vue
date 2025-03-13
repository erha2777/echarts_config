<script setup lang="ts">
import { onMounted, reactive, watch, nextTick, computed } from 'vue'
import myEcharts from '../../../utils/myEcharts'
import graph from '../../../assets/json/les-miserables.json'

graph.nodes.forEach(function (node: any) {
    node.label = {
        show: node.symbolSize > 30
    };
});

onMounted(() => {

})

// const type1 = function () {
//     // 基于准备好的dom，初始化echarts实例
//     const myChart = echarts.init(document.getElementById('echartsBox') as HTMLElement);
//     let option: any = {
//         title: {
//             text: '互联网工程师学习路径'
//         },
//         tooltip: {},
//         animationDurationUpdate: 1500,
//         animationEasingUpdate: 'quinticInOut',
//         legend: {
//             x: "center",
//             show: true,
//             data: ["运维", "测试", '应用', '实施', '开发'] // 此处不显示根节点学生
//         },
//         series: [
//             {
//                 type: 'graph',
//                 layout: 'force', // 布局
//                 focusNodeAdjacency: true, // 悬停显示
//                 roam: true, // 缩放和平移
//                 draggable: true, // 是否可拖拽
//                 // animation:true,
//                 categories: [ // 节点分类的类目
//                     {
//                         name: '学生',
//                     },
//                     {
//                         name: '运维',
//                     },
//                     {
//                         name: '测试',
//                     },
//                     {
//                         name: '应用',
//                     },
//                     {
//                         name: '实施',
//                     },
//                     {
//                         name: '开发',
//                     }
//                 ],
//                 label: {
//                     show: true,
//                     textStyle: {
//                         fontSize: 12,
//                         color: '#fff'
//                     },
//                 },
//                 force: {
//                     repulsion: 1000
//                 },
//                 tooltip: {
//                     formatter: function (node: any) { // 区分连线和节点，节点上额外显示其他数字
//                         if (!node.value) {
//                             return node.data.name;
//                         } else {
//                             return node.data.name + ":" + node.data.showNum;
//                         }
//                     },
//                 },
//                 lineStyle: {
//                     opacity: 0.9,
//                     width: 1,
//                     curveness: 0.3
//                 },
//                 data: [{
//                     name: '王小二',
//                     category: 0, // 这是种类，运维1测试2应用3实施4开发5
//                     number: 10, // 这是编号 非必须，目的仅为方便编写line
//                     value: 45, // 数据值
//                     symbolSize: 45, //图形大小 
//                     showNum: 25 //节点需要显示的额外内容
//                 }, {
//                     name: '运维1',
//                     number: 1,
//                     category: 1,
//                     value: 40,
//                     symbolSize: 40,
//                     showNum: 35
//                 }, {
//                     name: '测试1',
//                     number: 2,
//                     category: 2,
//                     value: 45,
//                     symbolSize: 45,
//                     showNum: 35
//                 }, {
//                     name: '应用1',
//                     number: 3,
//                     category: 3,
//                     value: 45,
//                     symbolSize: 45,
//                     showNum: 35
//                 }, {
//                     name: '实施1',
//                     number: 4,
//                     category: 4,
//                     value: 45,
//                     symbolSize: 45,
//                     showNum: 35
//                 }, {
//                     name: '开发1',
//                     number: 5,
//                     category: 5,
//                     value: 45,
//                     symbolSize: 45,
//                     showNum: 35
//                 }, {
//                     name: 'JS',
//                     number: 6,
//                     category: 5,
//                     value: 35,
//                     symbolSize: 35,
//                     showNum: 35
//                 }, {
//                     name: 'php',
//                     number: 7,
//                     category: 5,
//                     value: 20,
//                     symbolSize: 20,
//                     showNum: 35
//                 }, {
//                     name: 'java',
//                     number: 8,
//                     category: 5,
//                     value: 45,
//                     symbolSize: 45,
//                     showNum: 35
//                 }],
//                 links: [{
//                     source: '王小二', // 可以用name 可以用number，但name不能重名
//                     target: '运维1',
//                     lineStyle: {
//                         color: 'skyblue'
//                     }
//                 }, {
//                     source: 0,
//                     target: 2,
//                     lineStyle: {
//                         color: 'skyblue'
//                     }
//                 }, {
//                     source: 0,
//                     target: 3,
//                     lineStyle: {
//                         color: 'skyblue'
//                     }
//                 }, {
//                     source: 0,
//                     target: 4,
//                     lineStyle: {
//                         color: 'skyblue'
//                     }
//                 }, {
//                     source: 0,
//                     target: 5,
//                     lineStyle: {
//                         color: 'skyblue'
//                     }
//                 }, {
//                     source: 5,
//                     target: 6,
//                 }, {
//                     source: 6,
//                     target: 7,
//                 }, {
//                     source: 6,
//                     target: 8,
//                 }]
//             }
//         ]
//     };
//     // 绘制图表
//     myChart.setOption(option);
// }

const option: any = reactive({
    title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
    },
    tooltip: {},
    legend: {
        // selectedMode: 'single',
        data: graph.categories.map(function (a) {
            return a.name;
        }),
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none', // 图的布局
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        legendHoverLink:false, // 是否启用图例 hover 时的联动高亮，高亮显示有问题
        roam: true, // 是否开启鼠标缩放和平移漫游
        nodeScaleRatio: 0.6, // 鼠标漫游缩放时节点的相应缩放比例
        symbol: 'circle',
        symbolSize:10, // 节点标记的大小
        symbolRotate:0, // 节点标记的旋转角度,正值表示逆时针旋转
        symbolKeepAspect:true, // symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比
        symbolOffset:[0, 0], // 节点标记相对于原本位置的偏移
        edgeSymbol: ['circle', 'arrow'], // 边两端的标记类型
        edgeSymbolSize:10, // 边两端的标记大小
        // cursor:'pointer', // 鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor
        // itemStyle:{}, // 图形的样式
        lineStyle: { // 线的样式
            // type:'dashed',
            color: 'source',
            curveness: 0.3
        },
        label: { // 图形的标签
            position: 'right',
            formatter: '{b}'
        },
        // edgeLabel:{}, // 线的标签、
        // labelLayout:{}, // 标签的统一布局
        emphasis: { // 高亮的样式
            focus: 'adjacency',
            lineStyle: {
                width: 5
            }
        },
        // blur:{}, // 淡出状态的图形样式
        // select:{}, // 选中状态的图形样式
        // selectedMode:false, // 选中模式的配置
        // autoCurveness:false, // 自动计算各边曲率，默认不开启
    }
})

const JsonData = computed(() => {
    let data = JSON.parse(JSON.stringify(option))
    delete data.series.data
    delete data.series.links
    delete data.series.categories
    delete data.legend.data
    return JSON.stringify(data, null, 4).replaceAll('"', '')
})

watch(() => option.series.layout, (newValue, oldValue) => {
    console.log(newValue);
    if (newValue === 'force') {
        delete option.series.circular
        option.series.force = { // 力引导布局的配置
            // initLayout:'circular',
            repulsion: 1000, // 节点之间的斥力因子
            gravity: 0.1, // 节点受到的向中心的引力因子
            edgeLength: 30, // 边的两个节点之间的距离
            layoutAnimation: true, // 是否显示布局的迭代动画
            friction: 0.6 // 减缓节点的移动速度。取值范围 0 到 1
        }
        option.series.draggable = true
    } else if (newValue === 'circular') {
        delete option.series.force
        option.series.circular = {// 环形布局相关配置
            rotateLabel: false
        }
    } else {
        delete option.series.force
        delete option.series.circular
    }
}, {
    deep: true,
    immediate: true
})
watch(() => option, (newValue, oldValue) => {
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
            关系图
        </div>
        <div class="config">
            <div class="config-item">
                layout: <br>
                <el-radio-group v-model="option.series.layout">
                    <el-radio label="none">none</el-radio>
                    <el-radio label="circular">circular</el-radio>
                    <el-radio label="force">force</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                symbol: <br>
                <el-radio-group v-model="option.series.symbol">
                    <el-radio label="circle">circle</el-radio>
                    <el-radio label="rect">rect</el-radio>
                    <el-radio label="roundRect">roundRect</el-radio>
                    <el-radio label="triangle">triangle</el-radio>
                    <el-radio label="diamond">diamond</el-radio>
                    <el-radio label="pin">pin</el-radio>
                    <el-radio label="arrow">arrow</el-radio>
                    <el-radio label="path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z">其他</el-radio>
                    <el-radio label="none">none</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item">
                edgeSymbol:[0] <br>
                <el-radio-group v-model="option.series.edgeSymbol[0]">
                    <el-radio label="circle">circle</el-radio>
                    <el-radio label="rect">rect</el-radio>
                    <el-radio label="roundRect">roundRect</el-radio>
                    <el-radio label="triangle">triangle</el-radio>
                    <el-radio label="diamond">diamond</el-radio>
                    <el-radio label="pin">pin</el-radio>
                    <el-radio label="arrow">arrow</el-radio>
                    <el-radio label="path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z">其他</el-radio>
                    <el-radio label="none">none</el-radio>    
                </el-radio-group>
                edgeSymbol:[1] <br>
                <el-radio-group v-model="option.series.edgeSymbol[1]">
                    <el-radio label="circle">circle</el-radio>
                    <el-radio label="rect">rect</el-radio>
                    <el-radio label="roundRect">roundRect</el-radio>
                    <el-radio label="triangle">triangle</el-radio>
                    <el-radio label="diamond">diamond</el-radio>
                    <el-radio label="pin">pin</el-radio>
                    <el-radio label="arrow">arrow</el-radio>
                    <el-radio label="path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z">其他</el-radio>
                    <el-radio label="none">none</el-radio>
                </el-radio-group>
            </div>
            <div style="height: 400px;overflow: hidden auto;">
                <pre>{{ JsonData }}</pre>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>