import { RouteRecordRaw } from 'vue-router'

const echartsRouter: Array<RouteRecordRaw> = [
    {
        path:'/echartsBar',
        name: 'echartsBar',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/bar/index.vue')
      },
      {
        path:'/echartsLine',
        name: 'echartsLine',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/line/index.vue')
      },
      {
        path:'/echartsPieDefault',
        name: 'echartsPieDefault',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/pie/default/index.vue')
      },
      {
        path:'/echartsPieAnnulus',
        name: 'echartsPieAnnulus',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/pie/annulus/index.vue')
      },
      {
        path:'/echartsPieSchedule',
        name: 'echartsPieSchedule',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/pie/schedule/index.vue')
      },
      {
        path:'/echartsChinaMap',
        name: 'echartsChinaMap',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/map/china/index.vue')
      },
      {
        path:'/echartsWorldMap',
        name: 'echartsWorldMap',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/map/world/index.vue')
      },
      {
        path:'/echartsGraph',
        name: 'echartsGraph',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/graph/index.vue')
      },
      {
        path:'/echartsWordcloud',
        name: 'echartsWordcloud',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/wordcloud/index.vue')
      },
      {
        path:'/echartsLiquidfill',
        name: 'echartsLiquidfill',
        component: () => import(/* webpackChunkName: "echarts" */ '../../views/echarts/liquidfill/index.vue')
      }
]

export default echartsRouter