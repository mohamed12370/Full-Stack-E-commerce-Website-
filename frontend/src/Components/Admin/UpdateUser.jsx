import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appContext } from '../../Context';
import Loading from '../Layout/Loading';
import Sidebar from './Sidebar';

const initalState = {
  user: {},
};

function getUserDtails(state, action) {
  switch (action.type) {
    case 'getUserRequest':
      return {
        ...state,
        loading: true,
        user: {},
      };

    case 'getUserSuccess':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case 'getUserFail':
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function UpdateUser() {
  const params = useParams();
  const { id } = params;

  const [state, dispatch] = useReducer(getUserDtails, initalState);
  const { loading, user } = state;
  //console.log(user._id);

  const { dispatch: dispatchContext } = useContext(appContext);

  const [role, setRole] = useState('');

  useEffect(() => {
    const getUserDtails = async () => {
      try {
        dispatch({ type: 'getUserRequest' });
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        // console.log(data);
        if (data.success) {
          dispatch({ type: 'getUserSuccess', payload: data.user });
        }
      } catch (error) {
        alert(`${error.respone.data.message}`);
      }
    };
    getUserDtails();
  }, [dispatch, id]);

  useEffect(() => {
    if (user.role) {
      setRole(user.role);
    }
  }, [user.role]);

  async function handleUpdate() {
    if (role === '') {
      return alert('Select New Role');
    } else {
      dispatch({ type: 'getUserRequest' });
      const { data } = await axios.put(`/api/v1/admin/user/${id}`, { role });
      //console.log(data);
      if (data.success) {
        dispatch({ type: 'getUserSuccess', payload: data.user });
        dispatchContext({ type: 'allUsersSuccess', payload: data.users });
      }
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
            <p className="bg-green-500 p-1 mb-2 md:mb-0">User Details:</p>
          </div>
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-1  gap-2">
              <div className="user flex justify-between flex-wrap py-6">
                <div className="left w-full md:w-1/2 ">
                  {user && (
                    <div className="w-fll flex justify-center items-center">
                      <img
                        className="w-52 h-52 rounded-full"
                        src={user?.avatar}
                        alt={user?.name}
                      />
                    </div>
                  )}
                </div>
                <div className="right w-full md:w-1/2 mt-4 md:mt-0">
                  <p className="font-bold text-xl md:text-2xl">
                    Name: {user && user.name}
                  </p>
                  <p className="font-bold text-xl md:text-2xl my-3">
                    Email: {user && user.email}
                  </p>
                  <div className="role">
                    <div className=" font-bold text-xl md:text-2xl my-3">
                      <p>Role: {user && user.role}</p>
                    </div>
                    <div className=" border-2 px-2 py-4">
                      <div className="font-bold text-xl md:text-2xl">
                        <label htmlFor="role">Change Role:</label>
                        <select
                          className="block w-11/12 mx-auto my-4"
                          name="role"
                          id="role"
                          defaultValue={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <button
                        className="p-2 bg-yellow-500 text-white rounded-xl w-full md:w-1/3 mx-auto block"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
