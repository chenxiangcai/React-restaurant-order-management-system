import {ADDERROR, ADDSUCCESS, GETFAILED, GETLIST, GETSUCCESS, TOGGLED} from './actions'

type state = { list: object[], addStatus: number, errorMsg: string }
const defaultState = {
    list: [],
    addStatus: 99999, //添加用户初始状态
    errorMsg: ''
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
    switch (action.type) {
        case GETSUCCESS:
            return {
                ...state,
                list: action.data.user
            }
        case GETLIST:
            return {
                ...state, action
            }
        case GETFAILED:
            return {
                ...state
            }
        case ADDSUCCESS:
            return {
                ...state,
                addStatus: Math.random()
            }
        case ADDERROR:
            return {
                ...state,
                addStatus: Math.random() * 10,
                errorMsg: action.data.message
            }
        case TOGGLED: {
            return {
                ...state,
                list: action.data.user
            }
        }

        default:
            return state
    }
}
