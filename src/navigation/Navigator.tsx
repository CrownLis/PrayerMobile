import React from 'react';

import { rootSelectors } from '@/store/ducks';
import { useAppSelector } from '@/store/hooks';

import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Navigator = () => {
  const isAuth = useAppSelector(rootSelectors.auth.getIsAuth);
  return isAuth ? <UserNav /> : <GuestNav />;
};

export default Navigator;
