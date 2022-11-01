import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { appContext } from '../Context';

export default function GardAdmin({ children }) {
  const { state } = useContext(appContext);
  const { user } = state.user;
  //console.log(user);

  if (user.role === 'admin') {
    return children;
  } else {
    return <Navigate to={'/'} />;
  }
}
