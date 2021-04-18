import {
  ADDTABLEERR,
  ADDTABLESUC, DELTABLEERR, DELTABLESUC, EDITTABLEERR, EDITTABLESUC, GETARRAYQRCODESUC,
  GETQRCODEERR, GETQRCODESUC, GETTABLEERR, GETTABLESUC, GETTSTAFFSUC
} from './action'

type state = {
  url: string,
  urlArray: object[],
  tableList: object[],
  staffList: object[],
  addTStatus: number,
  errorMsgT: string,
  delTStatus: number,
  editTStatus: number
}
const defaultState = {
  url: '',
  tableList: [],
  staffList: [],
  addTStatus: 99999,
  errorMsgT: '',
  delTStatus: 99999,
  editTStatus: 99999,
  urlArray: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETQRCODESUC:
      return {
        ...state,
        url: action.data.url,
      }
    case GETARRAYQRCODESUC:
      return {
        ...state,
        urlArray: action.data.qrarray,
      }
    case GETQRCODEERR: {
      return {
        ...state,
        status: 0
      }
    }
    case GETTABLESUC:
      return {
        ...state,
        tableList: action.data.table.records,
      }
    case GETTABLEERR: {
      return {
        ...state,
        status: 0
      }
    }
    case GETTSTAFFSUC:
      return {
        ...state,
        staffList: action.data,
      }
    case ADDTABLESUC: {
      return {
        ...state,
        addTStatus: Math.random(),
      }
    }
    case ADDTABLEERR: {
      return {
        ...state,
        addTStatus: Math.random() * 10,
        errorMsgT: action.data.message
      }
    }
    case EDITTABLESUC: {
      return {
        ...state,
        editTStatus: Math.random(),
      }
    }
    case EDITTABLEERR: {
      return {
        ...state,
        editTStatus: Math.random() * 10,
        errorMsgT: action.data.message
      }
    }
    case DELTABLESUC: {
      return {
        ...state,
        delTStatus: Math.random(),
      }
    }
    case DELTABLEERR: {
      return {
        ...state,
        delTStatus: Math.random() * 10,
        errorMsgT: action.data.message
      }
    }
    default:
      return {
        ...state,
        action
      }
  }
}
