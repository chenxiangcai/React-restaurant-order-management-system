import {
  ADDDISHERR,
  ADDDISHSUC,
  DELDISHERR,
  DELDISHSUC,
  EDITDISH,
  EDITDISHDISHSUC,
  EDITDISHERR,
  GETCATELISTSUCCESS,
  GETDISHLIST,
  GETSUCCESS,
} from './actions'

type state = { list: object[], addDishStatus: number, errorMsgDish: string, delDishStatus: number }
const defaultState = {
  list: [],
  cateList: [],
  addDishStatus: 99999, //添加用户初始状态
  errorMsgDish: '',
  delDishStatus: 99999,
  editDishStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETSUCCESS:
      return {
        ...state,
        list: action.data.dish
      }
    case GETDISHLIST:
      return {
        ...state, action
      }
    case GETCATELISTSUCCESS:
      return {
        ...state,
        cateList: action.data.acategory.records
      }
    case DELDISHSUC:
      return {
        ...state,
        delDishStatus: Math.random()
      }
    case DELDISHERR: {
      return {
        ...state,
        delDishStatus: Math.random() * 10
      }
    }
    case ADDDISHSUC:
      return {
        ...state,
        addDishStatus: Math.random()
      }
    case ADDDISHERR: {
      return {
        ...state,
        addDishStatus: Math.random() * 10,
        errorMsgDish: action.data.message
      }
    }
    case EDITDISHDISHSUC: {
      return {
        ...state,
        editDishStatus: Math.random()
      }
    }
    case EDITDISHERR: {
      return {
        ...state,
        errorMsgDish: action.data.message,
        editDishStatus: Math.random() * 10
      }
    }
    case EDITDISH: {
      return {
        ...state,
        action
      }
    }

    default:
      return state
  }
}
