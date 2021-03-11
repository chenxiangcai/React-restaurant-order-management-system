import { EDITUSERINFOERR, EDITUSERINFOSUC } from './actions'

type state = { topBarEditState: number, tberr: string }
const defaultState = {
      topBarEditState: 7,
      tberr: ''
    }
;
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case EDITUSERINFOSUC:
      return {
        ...state,
        topBarEditState: Math.random(),
      }
    case EDITUSERINFOERR:
      return {
        ...state,
        tberr: action.data.message,
        topBarEditState: Math.random() * 10
      }
    default:
      return {
        ...state,
        action
      }
  }
}
