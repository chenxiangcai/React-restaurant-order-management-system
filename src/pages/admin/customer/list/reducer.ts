import {
  CUSADDERR,
  CUSADDSUC, CUSDELERR, CUSDELSUC, CUSEDITERR, CUSEDITSUC, GETCUSCATESUC,
  GETCUSLIST, GETCUSLISTERR,
  GETCUSLISTSUC

} from './action'

type state = { list: object[], addCStatus: number, errorMsgC: string, delCStatus: number }
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
    case GETCUSLISTSUC:
      return {
        ...state,
        list: action.data.customer
      }
    case GETCUSCATESUC:
      return {
        ...state,
        cateList: action.data.acuscate.records
      }
      // case GETCUSLISTERR:
      //   return {
      //     ...state,
      //     List: action.data.gory.records
      //   }
    case CUSDELSUC:
      return {
        ...state,
        delCStatus: Math.random()
      }
    case CUSDELERR: {
      return {
        ...state,
        delCStatus: Math.random() * 10
      }
    }
    case CUSADDSUC:
      return {
        ...state,
        addCStatus: Math.random()
      }
    case CUSADDERR: {
      return {
        ...state,
        addCStatus: Math.random() * 10,
        errorMsgC: action.data.message
      }
    }
    case CUSEDITSUC: {
      return {
        ...state,
        editCStatus: Math.random()
      }
    }
    case CUSEDITERR: {
      return {
        ...state,
        editCStatus: Math.random() * 10
      }
    }
    default:
      return { ...state, action }
  }
}
