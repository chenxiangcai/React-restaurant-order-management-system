import { ORDERADDERR, ORDERADDSUC } from './actions'

type state = { handleOrderState: number }
const defaultState = {
  handleOrderState: -1
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case ORDERADDSUC:
      return {
        ...state,
        handleOrderState: Math.random()
      }
    case ORDERADDERR:
      return {
        ...state,
        handleOrderState: Math.random() * 10
      }
    default:
      return {
        ...state,
        action
      }
  }
}
