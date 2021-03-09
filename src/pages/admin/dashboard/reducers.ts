import { GETDASHBOARDSUC } from './actions'

type state = { detail: object }
const defaultState = {
      detail: {},
    }
;
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETDASHBOARDSUC:
      return {
        ...state,
        detail: action.data,
      }
    default:
      return {
        ...state,
        action
      }
  }
}
