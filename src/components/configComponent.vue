<script lang="ts">
export default {
    name: 'config-component'
}
</script>
<script setup lang="ts">
import configComponent from './configComponent.vue'
import { ref } from 'vue'

// defineProps<{ configList: Array<any>,parentNode:any,level:String }>()
// defineProps({ // 非ts专有声明
//     configList: {
//         type: Array<any>,
//         default:()=>{
//             return []
//         }
//     },
//     option: {
//         type: Array<any>,
//         default:()=>{
//             return []
//         }
//     }
// })

interface Props {
    configList?: Array<any>
    parentNode?: any
    level?: any
    zhCN: Boolean | null | undefined
}
const props = withDefaults(defineProps<Props>(), {
    configList: () => [],
    parentNode: () => { },
    level: '',
    zhCN: () => false
})

</script>

<template>
    <template v-for="item in configList">
        <div class="config-item">
            <template v-if="zhCN">
                <span class="mr10">{{ level }}{{ (item.title) }}:</span>
            </template>
            <template v-else>
                <span class="mr10">{{ level }}{{ item.name }}:</span>
            </template>
            <template v-if="Array.isArray(item.dataName)">
                <template v-for="v in item.dataName">
                    {{ v }}:
                    <el-input class="mr10" style="width:50px" size="small" v-model="parentNode[item.name][v]"
                        :placeholder="item.placeholder ? item.placeholder : ''" />
                </template>
            </template>
            <template v-else>
                <template v-if="item.type === 'input'">
                    <template v-if="item.dataName">
                        <el-input style="width:250px" v-model="parentNode[item.name][item.dataName]"
                            :placeholder="item.placeholder ? item.placeholder : ''" />
                    </template>
                    <template v-else>
                        <el-input style="width:250px" v-model="parentNode[item.name]"
                            :placeholder="item.placeholder ? item.placeholder : ''" />
                    </template>
                </template>
                <template v-if="item.type === 'radio'">
                    <template v-if="item.dataName">
                        <el-radio-group v-model="parentNode[item.name][item.dataName]">
                            <el-radio v-for="v in item.radioList" :label="v.value" size="large">{{ v.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else>
                        <el-radio-group v-model="parentNode[item.name]">
                            <el-radio v-for="v in item.radioList" :label="v.value" size="large">{{ v.label }}</el-radio>
                        </el-radio-group>
                    </template>
                </template>
            </template>
        </div>
        <template v-if="item.children">
            <config-component :zhCN="zhCN" :level="level + '-'" v-if="parentNode[item.name].show"
                :parentNode="parentNode[item.name]" :config-list="item.children"></config-component>
        </template>
    </template>
</template>

<style lang="scss" scoped>
@import '@/styles/module/echarts.scss';
</style>