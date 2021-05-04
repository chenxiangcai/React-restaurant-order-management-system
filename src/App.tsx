import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { adminRoute, chefRoute, waiterRoute } from "./routes";
import { Redirect, Route, Switch } from "react-router-dom";
import LayoutWrap from "./common/Layout/Layout";
import { isLoginAndAdmin, isLoginAndChef, isLoginAndWaiter } from './utils/storage'

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
              <Redirect to='/notauth'/>
            </Switch>
          </LayoutWrap>
          :
          isLoginAndChef() ?
              <LayoutWrap>
                <Switch>
                  {
                    chefRoute.map((route: any) => {
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
                  <Redirect from='/chef' to={chefRoute[0].path}/>
                  <Redirect to='/notauth'/>
                </Switch>
              </LayoutWrap>
              : isLoginAndWaiter() ?
              <LayoutWrap>
                <Switch>
                  {
                    waiterRoute.map((route: any) => {
                      console.log(route)
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
                  <Redirect from='/waiter' to={waiterRoute[0].path}/>
                  <Redirect to='/notauth'/>
                </Switch>
              </LayoutWrap>
              : <Redirect to='/noauth'/>
  )
};

export default App;



