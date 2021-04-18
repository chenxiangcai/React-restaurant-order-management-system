import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { adminRoute } from "./routes";
import { Redirect, Route, Switch } from "react-router-dom";
import LayoutWrap from "./common/Layout/Layout";
import { isLoginAndAdmin } from './utils/storage'

type Props = RouteComponentProps;

const App: FunctionComponent<Props> = () => {
  return (
      isLoginAndAdmin() ?
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
              <Redirect to='/notfound'/>
            </Switch>
          </LayoutWrap> : <Redirect to='/noauth'/>
  )
};

export default App;



