// 封装购物车模块
import { defineStore } from 'pinia'
import { computed,ref } from 'vue'
import { useUserStore } from './userStore'
import { delCartAPI, findNewCartListAPI, insertCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // state
    const cartList = ref([])
    // 封装一个获取最新购物车列表action函数
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    // action
    const addCart = async (goods) => {
        const {skuId,count} = goods
        if(isLogin.value){
            // 登录之后的购物车逻辑
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if(item){
                item.count++
            }else{
                cartList.value.push(goods)
            }
        }   
    }

    // 删除购物车
    const delCart = async (skuId) => {
        if(isLogin.value){
            await delCartAPI([skuId])
            updateNewList()
        }else{
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx,1)
        }
        
    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    } 


    // 单选功能
    const singleCheck = (skuId,selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
       cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性---总数量+总价格
    const allCount = computed(() => cartList.value.reduce ((a,c) =>a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce ((a,c) =>a + c.count*c.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 已选择数量+价格
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce ((a,c) =>a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce ((a,c) =>a + c.count*c.price, 0))

    return{
        cartList,
        addCart,
        delCart,
        clearCart,
        updateNewList,
        singleCheck,
        allCheck,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice
    }

}, {
    persist: true,
})