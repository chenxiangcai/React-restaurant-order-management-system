import {
  CUSCATEADDERR,
  CUSCATEADDSUC, CUSCATEDELERR, CUSCATEDELSUC, CUSCATEEDITERR, CUSCATEEDITSUC,
  GETCUSCATELIST,
  GETCUSCATELISTSUC

} from './action'

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
    case GETCUSCATELISTSUC:
      return {
        ...state,
        list: action.data.acuscate
      }
    case GETCUSCATELIST:
      return {
        ...state, action
      }
      // case GETCUSCATELISTERR:
      //   return {
      //     ...state,
      //     cateList: action.data.category.records
      //   }
    case CUSCATEDELSUC:
      return {
        ...state,
        delCcateStatus: Math.random()
      }
    case CUSCATEDELERR: {
      return {
        ...state,
        delCcateStatus: Math.random() * 10
      }
    }
    case CUSCATEADDSUC:
      return {
        ...state,
        addCcateStatus: Math.random()
      }
    case CUSCATEADDERR: {
      return {
        ...state,
        addCcateStatus: Math.random() * 10,
        errorMsgCcate: action.data.message
      }
    }
    case CUSCATEEDITSUC: {
      return {
        ...state,
        editCcateStatus: Math.random()
      }
    }
    case CUSCATEEDITERR: {
      return {
        ...state,
        editCcateStatus: Math.random() * 10
      }
    }
    default:
      return { ...state, action }
  }
}
