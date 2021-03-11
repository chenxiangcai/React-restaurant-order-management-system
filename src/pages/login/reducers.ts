import {  ERRORLOGIN, NETERROR, SUCCESSLOGIN, TOLOGIN } from "./actions";
import { setStore } from "../../utils/storage";

const defaultState = {
  //登录状态
  status: 0
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: any) => {
  switch (action.type) {
    case TOLOGIN :
      return {
        ...state, action,
      };
    case SUCCESSLOGIN:
      const { token } = action.data
      const { role } = action.data.userInfo
      setStore('token', token)
      setStore('userInfo', action.data.userInfo)
      switch (role) {
        case 'admin':
          return {
            ...state,
            status: Math.random(),
          }
        case 'chef':
          return {
            ...state,
            status: Math.random() * 10,
          }
        case 'waiter':
          return {
            ...state,
            status: Math.random() * 100,
          }
      }
      return {
        ...state
      }
    case ERRORLOGIN:
      return {
        ...state,
        status: Math.random()
      }
    case NETERROR:
      return {
        ...state,
        status: -1
      }
    default:
      return state;
  }
};
