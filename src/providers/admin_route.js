import { useState, useEffect, useContext } from 'react';
import { Route, Redirect, redirect } from 'react-router-dom';
import  AuthContext  from './auth_provider';
import { findUser } from '../controllers/app_controller';

const AdminRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    findUser(user).then((response) => {
      setAuthorized(roles && roles.includes(response.accountType));
    });
  }, [user, roles]);

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : redirect('/unauthorized')
      }
    />
  );
};

export default AdminRoute;




