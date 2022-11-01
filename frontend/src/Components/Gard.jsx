import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { appContext } from '../Context';

export default function Gard({ children }) {
  //let xx = localStorage.getItem('token');
  const { state } = useContext(appContext);
  const { user } = state.user;
  //console.log(user);

  if (user.role) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}
