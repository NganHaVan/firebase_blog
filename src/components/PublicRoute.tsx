import React from 'react';
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export default function PublicRoute({
  component: Component,
  ...rest
}: PublicRouteProps) {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem('firebase_token');
        console.log({ token });
        if (token) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
