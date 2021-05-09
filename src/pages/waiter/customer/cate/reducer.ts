import { WGETCUSCATELIST, WGETCUSCATELISTSUC, } from './action'

type state = { list: object[], addCcateStatus: number, errorMsgCcate: string, delCcateStatus: number }
const defaultState = {
  list: [],
  CcateList: [],
  addCcateStatus: 99999, //添加用户初始状态
  errorMsgCcate: '',
  delCcateStatus: 99999,
  editCcateStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case WGETCUSCATELISTSUC:
      return {
        ...state,
        list: action.data.acuscate
      }
    case WGETCUSCATELIST:
      return {
        ...state, action
      }
      // case GETCUSCATELISTERR:
      //   return {
      //     ...state,
      //     cateList: action.data.category.records
      //   }
    default:
      return { ...state, action }
  }
}
