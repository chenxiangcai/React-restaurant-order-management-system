import {ERRORLOGIN, NETERROR, SUCCESSLOGIN, TOLOGIN} from "./actions";
import {Action} from "redux";
const defaultState = {
    //登录状态
    status: 0
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: Action) => {
    switch (action.type) {
        case TOLOGIN :
            return {
                ...state, action,
            };
        case SUCCESSLOGIN:


            return {
                ...state,
                status: 1
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