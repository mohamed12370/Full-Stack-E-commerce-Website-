import React, { useContext, useEffect } from 'react';
import { appContext } from '../../Context';
import Sidebar from './Sidebar';
import axios from 'axios';
import Loading from '../Layout/Loading';
import { useNavigate } from 'react-router-dom';

export default function UserListAdmin() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(appContext);
  const { users, loading } = state;
  //console.log(users);

  useEffect(() => {
    const getAllUsers = async () => {
      dispatch({ type: 'allUsersRequest' });
      const { data } = await axios.get(`/api/v1/admin/users`);
      //console.log(data);
      if (data.success) {
        dispatch({ type: 'allUsersSuccess', payload: data.users });
      }
    };
    getAllUsers();
  }, [dispatch]);

  async function deleteUser(e) {
    const result = prompt('Are You Sure You Want To Delete this user', 'ok');
    if (result === 'ok') {
      const { data } = await axios.delete(`/api/v1/admin/user/${e}`);
      console.log(data);
      dispatch({ type: 'allUsersSuccess', payload: data.users });
    }
  }

  return (
    <div className="container mx-auto px-1 md:px-3 xl:px-0 min-h-screen mb-6 flex">
      <div className="container mx-auto w-1/3 md:w-1/4 min-h-screen  bg-slate-900">
        <Sidebar />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-1 md:px-2">
          <div className="heading mb-4 font-bold bg-slate-600 text-white p-3 flex justify-between items-center flex-wrap">
            <p className="bg-green-500 p-1 mb-2 md:mb-0">
              All Users: {users?.length || 0}
            </p>
          </div>
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-1 gap-4">
              {users &&
                users.map((el, i) => (
                  <div
                    key={i}
                    className="user border px-2 md:px-4 py-4 shadow-xl"
                  >
                    <div className="flex justify-between flex-wrap flex-col md:flex-row">
                      <div className="font-serif font-bold">
                        <p>Name: {el.name}</p>
                        <p className="my-2">Email: {el.email.slice(0, 20)}</p>
                        <p
                          className={
                            el.role === 'admin'
                              ? 'text-yellow-600'
                              : 'text-gray-900'
                          }
                        >
                          role: {el.role}
                        </p>
                      </div>
                      <img
                        className="w-32 h-32 rounded-full"
                        src={el.avatar}
                        alt={el.name}
                      />
                    </div>
                    <div className="btns mt-4 flex justify-evenly items-center flex-wrap">
                      <button
                        className="p-3 rounded-xl font-bold bg-red-500 text-white"
                        onClick={() => deleteUser(el._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="p-3 rounded-xl font-bold bg-cyan-500 text-white"
                        onClick={() => navigate(`/dashbord/user/${el._id}`)}
                      >
                        Action
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
