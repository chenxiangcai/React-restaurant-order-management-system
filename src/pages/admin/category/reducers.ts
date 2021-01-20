import {GETCATELISTS, GETCATELISTSUC} from './action'

type state = {
    categoryList: object[],
    addCateStatus: number,
    errorMsgCate: string,
    delCateStatus: number,
    editCateStatus: number
}
const defaultState = {
    categoryList: [],
    addCateStatus: 99999, //添加用户初始状态
    errorMsgCate: '',
    delCateStatus: 99999,
    editCateStatus: 99999
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: state = defaultState, action: any) => {
    switch (action.type) {
        case GETCATELISTSUC:
            return {
                ...state,
                categoryList: action.data.category
            }
        case GETCATELISTS:
            return {
                ...state, action
            }
        default:
            return state
    }
}
