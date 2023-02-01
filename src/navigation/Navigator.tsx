import React from 'react';

import { rootSelectors } from '@/store/ducks';
import { useAppSelector } from '@/store/hooks';

import GuestNav from './GuestNavigation';
import UserNav from './UserNavigation';

const Navigator = () => {
  const isAuth = useAppSelector(rootSelectors.auth.getIsAuth);
  return isAuth ? <UserNav /> : <GuestNav />;
};

export default Navigator;
