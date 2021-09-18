import React from "react";
import { Route, Redirect } from "react-router-dom";
// import Auth from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
    {...rest}
    render={props =>
        window.localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     if (Auth.fakeAuth()) {
    //       return <Component {...props} />;
    //     } 
    //     else {
    //       return <Redirect to={
    //           {
    //           pathname: "/login",
    //           state: {
    //             from: props.location,
    //           }
    //         }
    //     }/>
    //     }
    //   }}
    // />
  );
};
