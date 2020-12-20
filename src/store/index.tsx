import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers'
import sagas from "./sagas";
// 创建saga中间件
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension"
//导入数据持久化工具 + 配置
import {persistReducer, persistStore} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
    key: 'root',
    storage: storageSession,
    blacklist: ['login']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);

export const persistor = persistStore(store)