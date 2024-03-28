import  httpInstance  from '@/utils/http'

export function getBannerAPI (params={}){
  const {distributionSite= '1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
      url:'/home/new'
    })
  }

  // 获取人气推荐
export const getHotAPI = () => {
    return httpInstance({
      url:'/home/hot'
    })
  }

  //获取product
  export const getGoodsAPI = () => {
    return httpInstance({
      url:'/home/goods'
    })
  }