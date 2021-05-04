import { CGETORDERLISTSUC, CORDEREDITERR, CORDEREDITSUC } from './actions'

type state = { orderlist: object[], addOStatus: number, errorMsgO: string, delOStatus: number }
const defaultState = {
  orderlist: [],
  addOStatus: 99999, //添加用户初始状态
  errorMsgO: '',
  delOStatus: 99999,
  editCStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case CGETORDERLISTSUC:
      return {
        ...state,
        orderlist: action.data.order,
      }
    case CORDEREDITSUC: {
      return {
        ...state,
        editCStatus: Math.random()
      }
    }
    case CORDEREDITERR: {
      return {
        ...state,
        editOStatus: Math.random() * 10
      }
    }
    default:
      return {
        ...state,
        action
      }
  }
}
