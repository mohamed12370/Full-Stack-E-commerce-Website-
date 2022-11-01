import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { appContext } from '../../Context';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(appContext);
  const { user: userContext, cart } = state;
  const { user } = userContext;
  const { cartItems } = cart;
  //console.log(userContext);

  const [flag, setFlag] = useState(false);

  function showToggle() {
    setFlag(!flag);
  }

  async function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    await axios.get(`/api/v1/logout`);
    dispatch({ type: 'userLogout' });
    setFlag(false);
    navigate('/');
  }

  useEffect(() => {
    setFlag(false);
  }, []);

  return (
    <div className="container  mx-auto bg-slate-900 p-5 flex items-start justify-between mb-4">
      <div className="log text-xl cursor-pointer font-bold">
        <h1 className="text-white">
          <Link to="/">
            Shop <span className="text-yellow-300">IT</span>
          </Link>
        </h1>
      </div>
      <Search />
      <div className="links flex items-center justify-between px-3 pb-0">
        {user.name ? (
          <>
            <div className="relative flex flex-col">
              <p
                className="text-white mr-2 md:mr-4 text-sm cursor-pointer min-w-fit px-4 text-center"
                onClick={showToggle}
              >
                {user.name}
              </p>
              <div
                className={
                  flag
                    ? `bg-gray-400 absolute bottom-0 translate-y-full w-full 
              mt-4 flex justify-center items-center flex-col py-2 text-white rounded-xl z-50 `
                    : `
              hidden `
                }
              >
                <Link
                  to={'/profile'}
                  className="hover:bg-gray-500 transition-all duration-500 w-full text-center py-2"
                  onClick={() => setFlag(false)}
                >
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to={'/dashbord'}
                    className="my-2 hover:bg-gray-500 transition-all duration-500 w-full text-center py-2"
                    onClick={() => setFlag(false)}
                  >
                    Dashpord
                  </Link>
                )}
                <Link
                  to={'/order'}
                  className="hover:bg-gray-500 transition-all duration-500 w-full text-center py-2"
                  onClick={() => setFlag(false)}
                >
                  Orders
                </Link>
                <Link
                  to={'#'}
                  className="hover:bg-gray-500 transition-all duration-500 w-full text-center py-2"
                  onClick={Logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="text-slate-900 bg-yellow-300 py-1 px-4 rounded-sm mr-4"
          >
            Login
          </Link>
        )}
        <Link to={'/cart'} className="text-white">
          Cart:{' '}
          <span className="bg-yellow-300 px-1 rounded-sm">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </div>
  );
}
