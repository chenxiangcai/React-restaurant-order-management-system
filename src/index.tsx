import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from "react-redux";
import store from "./store";
import {normalRoute} from "./routes";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*管理路由转移到APP组件进行渲染*/}
                <Route path='/admin' render={(routeProps) => <App {...routeProps}/>}/>
                {/*普通路由渲染*/}
                {
                    normalRoute.map((route: any) => {
                        return <Route key={route.path}{...route}/>
                    })
                }
                <Redirect to='/login'/>
                <Redirect to='/404'/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));


