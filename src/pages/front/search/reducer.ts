import { SEARCHDISHERR, SEARCHDISHSUC } from './action'

type state = {
  searchlist: object[],
}
const defaultState = {
  searchlist: [],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
  switch (action.type) {
    case SEARCHDISHSUC:
      return {
        ...state,
        searchlist: action.data.dishes
      }
    case SEARCHDISHERR:
      return {
        ...state,
        searchlist: []
      }
    default:
      return {
        ...state,
        action
      }
  }
}
