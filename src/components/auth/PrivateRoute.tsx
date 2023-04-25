import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getRedirectLink } from '../../utils/redirectLink';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true; // temp
  const location = useLocation();

  return isLoggedIn ? <>{children}</> : <Navigate to={`/login${getRedirectLink(location)}`} />;
}
