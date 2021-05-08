import { WGETORDERLISTSUC, WORDEREDITERR, WORDEREDITSUC } from './actions'

type state = { orderlist: object[], dishlist: object[] }
const defaultState = {
  orderlist: [],
  dishlist: [],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case WGETORDERLISTSUC:
      console.log(action.data)
      return {
        ...state,
        orderlist: action.data.result.order,
        dishlist: action.data.dishlist.dish
      }
    case WORDEREDITSUC: {
      return {
        ...state,
        editCStatus: Math.random()
      }
    }
    case WORDEREDITERR: {
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
