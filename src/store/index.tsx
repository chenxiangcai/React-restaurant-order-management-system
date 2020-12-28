import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers'
import sagas from "./sagas";
// 创建saga中间件
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension"


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);

