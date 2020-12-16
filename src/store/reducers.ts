import { combineReducers } from "redux";
//引入各个组件的数据
import { reducers as login } from "../pages/login/";
// 数据整合导出
export default combineReducers({
    login,
});