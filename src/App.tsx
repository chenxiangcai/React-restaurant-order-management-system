import React, {FunctionComponent} from "react";
import {RouteComponentProps} from "react-router";
import {adminRoute} from "./routes";
import {Redirect, Route, Switch} from "react-router-dom";
import LayoutWrap from "./components/Layout";

type Props = RouteComponentProps;

const App: FunctionComponent<Props> = () => {
        return (
            <LayoutWrap>
                <Switch>
                    {
                        adminRoute.map((route: any) => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    render={routeProps => {
                                        return <route.component {...routeProps} />
                                    }}
                                />

                            )
                        })
                    }
                    <Redirect from='/admin' to={adminRoute[0].path}/>
                    <Redirect to='404'/>
                </Switch>
            </LayoutWrap>
        )
    }
;

export default App;



