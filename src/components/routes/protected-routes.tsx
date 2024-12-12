import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuth,
  selectIsLoading
} from '../../services/slices/user-slice';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: TProtectedRouteProps) => {
  const { isAuth, loading } = useSelector((state) => ({
    isAuth: selectIsAuth(state),
    loading: selectIsLoading(state)
  }));

  const location = useLocation();

  if (!isAuth && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuth && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};