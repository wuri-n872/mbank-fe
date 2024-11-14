import React, { ComponentType, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useRedirector } from 'hooks/useRedirector'
import { setIntended } from 'store/features/routeSlice'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

export type ProtectedPageProps  = object & {
  allowedRoles?: string[];
  redirect?: string;
}

function withRestriction<P extends ProtectedPageProps>(WrappedPageComponent: ComponentType<P>) {
  const ProtectedPageComponent = (props: P) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { isLoggedIn } = useAppSelector(({ userState }) => userState);

    useEffect(() => {
      !isLoggedIn && dispatch(setIntended(pathname));
    }, [isLoggedIn, dispatch, pathname]);

    const { redirect } = props

    useRedirector(redirect || '/', !isLoggedIn)

    return <WrappedPageComponent {...props} />
  }

  return ProtectedPageComponent;
}

export default withRestriction;
