import {
  GETORDERLISTSUC,
  ORDERADDERR,
  ORDERADDSUC,
  ORDERDELERR,
  ORDERDELSUC,
  ORDEREDITERR,
  ORDEREDITSUC
} from './actions'

type state = { list: object[], addOStatus: number, errorMsgO: string, delOStatus: number }
const defaultState = {
  list: [],
  addOStatus: 99999, //添加用户初始状态
  errorMsgO: '',
  delOStatus: 99999,
  editOStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETORDERLISTSUC:
      return {
        ...state,
        list: action.data.order,
      }
      // case GETCUSCATESUC:
      //   return {
      //     ...state,
      //     cateList: action.data.acuscate.records
      //   }
      // case GETCUSLISTERR:
      //   return {
      //     ...state,
      //     List: action.data.gory.records
      //   }
    case ORDERDELSUC:
      return {
        ...state,
        delOStatus: Math.random()
      }
    case ORDERDELERR: {
      return {
        ...state,
        delOStatus: Math.random() * 10
      }
    }
    case ORDERADDSUC:
      return {
        ...state,
        addOStatus: Math.random()
      }
    case ORDERADDERR: {
      return {
        ...state,
        addOStatus: Math.random() * 10,
        errorMsgO: action.data.message
      }
    }
    case ORDEREDITSUC: {
      return {
        ...state,
        editOStatus: Math.random()
      }
    }
    case ORDEREDITERR: {
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
