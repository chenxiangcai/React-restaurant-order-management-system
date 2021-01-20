import {
    ADDERROR,
    ADDSUCCESS,
    DELERROR,
    DELSTAFF,
    DELSUCCESS, EDITERROR,
    EDITSTAFF,
    EDITSUCCESS,
    GETFAILED,
    GETLIST,
    GETSUCCESS,
    TOGGLED
} from './actions'

type state = { list: object[], addStatus: number, errorMsg: string, delStatus: number }
const defaultState = {
    list: [],
    addStatus: 99999, //添加用户初始状态
    errorMsg: '',
    delStatus: 99999,
    editStatus: 99999
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
        case DELSTAFF: {
            return {
                ...state, action
            }
        }
        case DELSUCCESS: {
            return {
                ...state,
                delStatus: Math.random()
            }
        }
        case DELERROR: {
            return {
                ...state,
                delStatus: Math.random() * 10
            }
        }
        case EDITSTAFF: {
            return {
                ...state, action
            }
        }
        case EDITSUCCESS: {
            return {
                ...state,
                editStatus: Math.random()
            }
        }
        case EDITERROR: {
            return {
                ...state,
                editStatus: Math.random() * 10
            }
        }

        default:
            return state
    }
}
