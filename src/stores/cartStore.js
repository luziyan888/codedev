// 封装购物车模块
import { defineStore } from 'pinia'
import { computed,ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    // state
    const cartList = ref([])
    // action
    const addCart = async (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item){
            item.count++
        }else{
            cartList.value.push(goods)
        }
    }

    // 删除购物车
    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx,1)
    }

    // 计算属性---总数量+总价格
    const allCount = computed(() => cartList.value.reduce ((a,c) =>a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce ((a,c) =>a + c.count*c.price, 0))


    return{
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }

}, {
    persist: true,
})