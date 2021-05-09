import { WGETCUSCATESUC, WGETCUSLISTSUC } from './action'

type state = { list: object[], cateList: object[] }
const defaultState = {
  list: [],
  cateList: [],
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
    default:
      return { ...state, action }
  }
}
