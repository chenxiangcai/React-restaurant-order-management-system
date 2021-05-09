import { WCUSADDERR, WCUSADDSUC, WGETCUSCATESUC, WGETCUSLISTSUC } from './action'

type state = { list: object[], cateList: object[] }
const defaultState = {
  list: [],
  cateList: [],
  addCStatus: 99999, //添加用户初始状态
  errorMsgC: '',
  delCStatus: 99999,
  editCStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case WGETCUSLISTSUC:
      return {
        ...state,
        list: action.data.customer,
        cateList: action.data.acuscate.records
      }
    case WGETCUSCATESUC:
      return {
        ...state,
        cateList: action.data.acuscate.records
      }
    case WCUSADDSUC:
      return {
        ...state,
        addCStatus: Math.random()
      }
    case WCUSADDERR: {
      return {
        ...state,
        addCStatus: Math.random() * 10,
        errorMsgC: action.data.message
      }
    }
    default:
      return { ...state, action }
  }
}
