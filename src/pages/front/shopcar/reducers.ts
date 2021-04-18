import {
  GETSHOP, GETSHOPERR, GETSHOPSUC
} from './actions'
import { setStore } from "../../../utils/storage";

type state = { hotlist: object[], shopcar: any, randomlist: object[] }
const defaultState = {
  hotlist: [],
  shopcar: [],
  randomlist: [],
  homeDishState: 1
  // cateList: [],
  // addDishStatus: 99999, //添加用户初始状态
  // errorMsgDish: '',
  // delDishStatus: 99999,
  // editDishStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETSHOPSUC:
      return {
        ...state,
        hotlist: action.data.list.hotlist,
        randomlist: action.data.list.randomlist
      }
    case GETSHOPERR:
      return {
        ...state,
        homeDishState: Math.random() * 10
      }
    default:
      return {
        ...state,
        action
      }
  }
}
