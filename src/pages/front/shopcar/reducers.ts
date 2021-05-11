import { RESET, SORDERADDERR, SORDERADDSUC, SORDEREDITERR, SORDEREDITSUC } from './actions'

type state = { handle: number, notEnough: string[], handleEdit: number, notE: string[] }
const defaultState = {
  handle: -1,
  notEnough: [],

  handleEdit: -1,
  notE: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case SORDERADDSUC:
      return {
        ...state,
        handle: Math.random(),
        notEnough: []
      }
    case SORDERADDERR:
      return {
        ...state,
        handle: Math.random() * 10,
        notEnough: action.data.notEnough
      }
    case SORDEREDITSUC:
      return {
        ...state,
        handleEdit: Math.random(),
        notE: []
      }
    case SORDEREDITERR:
      return {
        ...state,
        handleEdit: Math.random() * 10,
        notE: action.data.notE
      }
    case RESET: {
      const s = JSON.parse(JSON.stringify(defaultState))
      console.log(s)
      return {
        ...s
      }
    }
    default:
      return {
        ...state,
        action
      }
  }
}
