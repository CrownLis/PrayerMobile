import React, { ComponentType } from 'react';

import GuestNav from '~navigation/GuestNav';
import UserNav from '~navigation/UserNav';

export interface AdditionalProps {
  children?: React.ReactNode | undefined;
}

function withAuthStack(Component: ComponentType<any>) {
  const AuthComponent = () => {
    const isAuth = true;
    return <Component>{isAuth ? <UserNav /> : <GuestNav />}</Component>;
  };

  return AuthComponent;
}

export default withAuthStack;
