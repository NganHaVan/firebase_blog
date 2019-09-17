import React from 'react';
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem('firebase_token');
        console.log({ token });
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
