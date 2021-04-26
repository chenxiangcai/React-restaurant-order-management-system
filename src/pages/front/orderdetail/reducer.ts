import { ISCUSERR, ISCUSSUC } from './action'

type state = {
  iscus: number,
  cusInfo: object
}
const defaultState = {
  iscus: -1,
  cusInfo: {}
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case ISCUSSUC:
      console.log('action', action)
      return {
        ...state,
        iscus: Math.random() * 10,
        cusInfo: action.data
      }
    case ISCUSERR:
      console.log('actionshibai', action)
      return {
        ...state,
        iscus: Math.random() * 100
      }
    default:
      return {
        ...state,
        action
      }
  }
}
