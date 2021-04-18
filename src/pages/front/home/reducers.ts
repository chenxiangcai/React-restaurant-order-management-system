import { ADD2CAR, GETHCATESUC, GETHDISHERR, GETHDISHSUC, LESS2CAR, RESETCAR } from './actions'
import { setStore } from "../../../utils/storage";

type state = {
  hotlist: object[],
  shopcar: any,
  randomlist: object[],
  cate: object[],
  catedish: object[]
}
const defaultState = {
  hotlist: [],
  shopcar: [],
  randomlist: [],
  homeDishState: 1,
  cate: [],
  catedish: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETHDISHSUC:
      return {
        ...state,
        hotlist: action.data.list.hotlist,
        randomlist: action.data.list.randomlist
      }
    case GETHDISHERR:
      return {
        ...state,
        homeDishState: Math.random() * 10
      }
    case GETHCATESUC:
      return {
        ...state,
        cate: action.data.acategory,
        catedish: action.data.dishes
      }
    case ADD2CAR:
      const dishes = action.data
      const added_dish = defaultState.shopcar
      //如果存在
      if (added_dish.some((value: any) => value._id === dishes._id)) {
        console.log('存在')
        added_dish.forEach((value: any) => {
          if (value._id === dishes._id) value.num++
        })
      } else {
        added_dish.push({
          // @ts-ignore
          _id: dishes._id,
          // @ts-ignore
          price: dishes.price,
          // @ts-ignore
          name: dishes.name,
          // @ts-ignore
          num: 1,
          // @ts-ignore
          url: dishes.url
        })
      }
      const data = JSON.stringify(defaultState.shopcar)
      setStore('shopcar', data)
      return {
        ...state,
        shopcar: [...JSON.parse(JSON.stringify(defaultState.shopcar))]
      }
    case LESS2CAR:
      const dishess = action.data
      const lessed_dish = defaultState.shopcar

      lessed_dish.forEach((value: any, index: number) => {
        if (value._id === dishess._id) value.num--
        if (value.num === 0) lessed_dish.splice(index, 1)
      })
      const data2 = JSON.stringify(defaultState.shopcar)
      setStore('shopcar', data2)
      return {
        ...state,
        shopcar: [...JSON.parse(JSON.stringify(defaultState.shopcar))]
      }
    case RESETCAR:
      defaultState.shopcar = action.data
      return {
        ...state,
        shopcar: action.data
      }
    default:
      return {
        ...state,
        action
      }
  }
}
