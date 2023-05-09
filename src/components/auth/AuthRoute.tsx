import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { parseRedirectLink } from '../../utils/redirectLink';
import { selectIsLoggedIn } from '../../store/auth';

interface AuthRouteProps {
  children: ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = false;
  const location = useLocation();

  return isLoggedIn ? <Navigate to={parseRedirectLink(location) || '/'} /> : <>{children}</>;
}
