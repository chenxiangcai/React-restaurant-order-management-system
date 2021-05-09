import { WGETQRCODEERR, WGETQRCODESUC, WGETTABLEERR, WGETTABLESUC, WGETTSTAFFSUC } from './action'

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
    case WGETQRCODESUC:
      return {
        ...state,
        url: action.data.url,
      }
    case WGETQRCODEERR: {
      return {
        ...state,
        status: 0
      }
    }
    case WGETTABLESUC:
      console.log(action.data.table.records)
      return {
        ...state,
        tableList: action.data.table.records,
      }
    case WGETTABLEERR: {
      return {
        ...state,
        status: 0
      }
    }
    case WGETTSTAFFSUC:
      return {
        ...state,
        staffList: action.data,
      }
    default:
      return {
        ...state,
        action
      }
  }
}
