import {
  CATEADDERR,
  CATEADDSUC,
  CATEDELERR,
  CATEDELSUC,
  CATEEDITERR,
  CATEEDITSUC,
  GETCATELISTS,
  GETCATELISTSUC
} from './action'

type state = {
  categoryList: object[],
  addCateStatus: number,
  errorMsgCate: string,
  delCateStatus: number,
  editCateStatus: number
}
const defaultState = {
  categoryList: [],
  addCateStatus: 99999, //添加用户初始状态
  errorMsgCate: '',
  delCateStatus: 99999,
  editCateStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETCATELISTSUC:
      return {
        ...state,
        categoryList: action.data.acategory
      }
    case GETCATELISTS:
      return {
        ...state, action
      }
    case CATEADDSUC:
      return {
        ...state,
        addCateStatus: Math.random()
      }
    case CATEADDERR:
      return {
        ...state,
        addCateStatus: Math.random() * 10,
        errorMsgCate: action.data.message
      }
    case CATEEDITSUC:
      return {
        ...state,
        editCateStatus: Math.random()
      }
    case CATEEDITERR:
      return {
        ...state,
        editCateStatus: Math.random() * 10,
        errorMsgCate: action.data.message
      }
      case CATEDELSUC:
      return {
        ...state,
        delCateStatus: Math.random()
      }
    case CATEDELERR:
      return {
        ...state,
        delCateStatus: Math.random() * 10,
        errorMsgCate: action.data.message
      }
    default:
      return state
  }
}
