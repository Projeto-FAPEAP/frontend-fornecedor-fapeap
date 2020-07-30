import React, { useContext } from 'react';

import AuthContext from '../contexts/auth';
import StackRoutes from './Authenticated-Routes/StackRoutes';
import NotAuthenticated from './Not-Authenticated-Routes';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <StackRoutes /> : <NotAuthenticated />;
};

export default Routes;
