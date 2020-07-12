import React, { useContext, useReducer } from 'react';

import AuthContext from '../contexts/auth';
import Authenticated from './Authenticated-Routes';
import NotAuthenticated from './Not-Authenticated-Routes';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <Authenticated /> : <NotAuthenticated />;
};

export default Routes;
