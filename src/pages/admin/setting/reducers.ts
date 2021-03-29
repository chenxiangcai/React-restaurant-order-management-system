import {
  GETQRCODE,
  GETQRCODEERR,
  GETQRCODESUC
} from './action'

type state = { url: string }
const defaultState = {
  url: '',
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case GETQRCODESUC:
      return {
        ...state,
        url: action.data.url,
      }
    case GETQRCODEERR: {
      return {
        ...state,
        status: 0
      }
    }
    default:
      return {
        ...state,
        action
      }
  }
}
