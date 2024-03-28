import {getCategoryAPI} from '@/apis/category'
import {onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory(){
    const route = useRoute()
    const categoryData = ref({ })
    const getCategory = async (id=route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => getCategory())

    // 目标:路由参数变化的时候 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
    })

    return {
        categoryData
      }
}