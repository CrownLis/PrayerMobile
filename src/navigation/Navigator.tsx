import React from 'react';

import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Navigator = () => {
  const isAuth = true;
  return isAuth ? <UserNav /> : <GuestNav />;
};

export default Navigator;
