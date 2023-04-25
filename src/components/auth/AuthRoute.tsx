import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { parseRedirectLink } from '../../utils/redirectLink';

interface AuthRouteProps {
  children: ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;
  const location = useLocation();

  return isLoggedIn ? <Navigate to={parseRedirectLink(location) || '/'} /> : <>{children}</>;
}
