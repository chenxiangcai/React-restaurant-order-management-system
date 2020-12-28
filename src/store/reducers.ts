import {combineReducers} from "redux";
//引入各个组件的数据
import {reducers as login} from "../pages/login/";
import {reducers as staff} from '../pages/admin/staff/'
// 数据整合导出
export default combineReducers({
    login, staff
});
