import React, { useMemo } from 'react';
import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Navigator = () => {
  const isAuth = useAppSelector;
  const navigator = useMemo(() => (isAuth ? <UserNav /> : <GuestNav />));
  return { navigator };
};

export default Navigator;
