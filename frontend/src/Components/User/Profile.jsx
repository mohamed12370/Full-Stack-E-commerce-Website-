import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Layout/Loading';
import { Link } from 'react-router-dom';

const initalState = {
  user: {},
};

function getUserProfile(state, action) {
  switch (action.type) {
    case 'profileRequest':
      return {
        ...state,
        loading: true,
        user: {},
        error: null,
      };
    case 'profileSuccess':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case 'profileFail':
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

export default function Profile() {
  const [state, dispatch] = useReducer(getUserProfile, initalState);
  const { user, loading } = state;
  //console.log(user);

  const [userImg, setuserImg] = useState({
    file: [],
  });

  const [flagImg, setFlagImg] = useState(false);

  const [name, setName] = useState('');
  const [flagName, setFlagName] = useState(false);
  const [errorName, setErrorName] = useState('');

  const [email, setEmail] = useState('');
  const [flagEmail, setFlagEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');

  const [password, setPassword] = useState('');
  const [flagPassword, setFlagPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');

  const [newPassword, setnewPassword] = useState('');
  const [flagnewPassword, setFlagnewPassword] = useState(false);
  const [errornewPassword, setErrornewPassword] = useState('');

  const [cPassword, setcPassword] = useState('');
  //const [flagcPassword, setFlagcPassword] = useState(false);
  const [errorcPassword, setErrorcPassword] = useState('');

  function saveImage(e) {
    setuserImg({
      file: e,
    });
  }

  async function changeImage() {
    try {
      const formData = new FormData();
      formData.append('image', userImg.file);
      const { data } = await axios.put(`/api/v1/update/profile/img`, formData);
      //console.log(data);
      if (data.success) {
        dispatch({ type: 'profileSuccess', payload: data.user });
        setuserImg((userImg.file = []));
        setFlagImg(false);
      }
    } catch (error) {
      console.log('error change profile img front' + error.message);
    }
  }

  async function handelName(e) {
    e.preventDefault();
    if (name === '') {
      setErrorName('plz enter new name');
    } else if (name.length < 2) {
      setErrorName('name must be more than or equle 3 char');
    } else {
      const { data } = await axios.put(`/api/v1/update/profile`, { name });
      if (data.success) {
        dispatch({ type: 'profileSuccess', payload: data.user });
        setName('');
        setErrorName('');
        setFlagName(false);
      } else {
        setErrorName(data.message || data.err[0][0].message);
      }
    }
  }

  async function handelEmail(e) {
    e.preventDefault();
    try {
      if (email === '') {
        setErrorEmail('plz enter new email');
      } else if (email.length < 5 || !email.includes('@')) {
        setErrorEmail('plz enter valid mail');
      } else {
        const { data } = await axios.put(`/api/v1/update/profile`, { email });
        if (data.success) {
          dispatch({ type: 'profileSuccess', payload: data.user });
          setEmail('');
          setErrorEmail('');
          setFlagEmail(false);
        } else {
          setErrorEmail(data.message || data.err[0][0].message);
        }
      }
    } catch (error) {
      setErrorEmail(error.response.data.message);
    }
  }

  async function handelPassword(e) {
    e.preventDefault();
    try {
      if (password === '') {
        return setErrorPassword('plz enter old password');
      } else if (password.length <= 5) {
        return setErrorPassword('plz enter valid password ');
      } else {
        const { data } = await axios.put(`/api/v1/password/update`, {
          oldPassword: password,
        });
        if (data.success) {
          setFlagPassword(false);
          setFlagnewPassword(true);
        }
      }
    } catch (error) {
      setErrorPassword(error.response.data.message);
    }
  }

  async function handelNewPassword(e) {
    e.preventDefault();
    try {
      if (newPassword === '') {
        return setErrornewPassword('plz enter new password');
      } else if (newPassword.length <= 5) {
        return setErrornewPassword(
          'plz enter new password must be length 6 char or more'
        );
      } else if (cPassword === '') {
        return (
          setErrorcPassword('plz enter new password'), setErrornewPassword('')
        );
      } else if (cPassword.length <= 5) {
        return (
          setErrorcPassword(
            'plz enter new password must be length 6 char or more'
          ),
          setErrornewPassword('')
        );
      } else if (
        newPassword !== cPassword &&
        newPassword.length >= 6 &&
        cPassword >= 6
      ) {
        return setErrorcPassword('confirem password not match new password');
      } else {
        const { data } = await axios.put(`/api/v1/new/password/update`, {
          newPassword,
          cPassword,
        });
        if (data.success) {
          setFlagnewPassword(false);
          alert('success');
        } else {
          setErrorcPassword(data.message || data.err[0][0].message);
        }
        //console.log(data);
      }
    } catch (error) {
      setErrorcPassword(error.response.data.message);
    }
  }

  useEffect(() => {
    const userProfile = async () => {
      dispatch({ type: 'profileRequest' });
      const { data } = await axios.get(`/api/v1/profile`);
      //   console.log(data);
      if (data.success) {
        dispatch({ type: 'profileSuccess', payload: data.user });
      } else {
        dispatch({ type: 'profileFail', payload: data.err });
      }
    };
    userProfile();
  }, [dispatch]);

  return (
    <div className="container mx-auto min-h-[100vh]">
      <h2 className="font-bold pl-5 mb-5 text-3xl">My Profile</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto flex justify-between flex-wrap">
            <div className="left w-full md:w-1/2 flex justify-center items-center flex-col">
              <img
                className="w-1/2 mx-auto rounded-full"
                src={
                  user.avatar ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt=""
              />
              <div className=" mt-3 w-full flex justify-center items-center">
                <span
                  className="font-bold  cursor-pointer text-blue-500 mr-4"
                  onClick={() => setFlagImg(true)}
                >
                  Change
                </span>
                <span
                  className="font-bold cursor-pointer text-red-500"
                  onClick={() => setFlagImg(false)}
                >
                  Cancle
                </span>
              </div>

              {flagImg ? (
                <>
                  <div className="mt-6 text-center py-6 ">
                    <input
                      className="rounded-full p-2"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(e) => saveImage(e.target.files[0])}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-red-500 p-4 rounded-full text-white mx-auto block"
                    onClick={changeImage}
                  >
                    save
                  </button>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="right w-full md:w-1/2  py-6 px-4">
              <h4 className="font-bold text-xl text-gray-500">Full Name:</h4>
              <div className="w-full md:w-10/12 flex justify-between items-center mb-6 mt-2">
                <p>{user.name}</p>
                <p
                  className="font-bold text-yellow-400 cursor-pointer"
                  onClick={() => setFlagName(true)}
                >
                  change
                </p>
              </div>
              {flagName ? (
                <>
                  <div className="">
                    <div className="">
                      <input
                        type="text"
                        placeholder="enter new name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errorName ? (
                        <>
                          <p className="font-bold text-red-300">{errorName}</p>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="w-full md:w-10/12 my-4 flex justify-between">
                      <button
                        onClick={handelName}
                        type="submit"
                        className="font-bold bg-blue-500 px-4 py-2 text-white rounded-xl"
                      >
                        change{' '}
                      </button>
                      <button
                        className="font-bold bg-red-500 px-4 py-2 text-white rounded-xl"
                        onClick={() => {
                          setFlagName(false);
                          setErrorName('');
                        }}
                      >
                        cancle
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              <h4 className="font-bold text-xl text-gray-500">
                Email Address:
              </h4>
              <div className="w-full md:w-10/12 flex justify-between items-center flex-wrap mb-6 mt-2">
                <p>{user.email}</p>
                <p
                  className="font-bold text-yellow-400 cursor-pointer"
                  onClick={() => setFlagEmail(true)}
                >
                  change
                </p>
              </div>
              {flagEmail ? (
                <>
                  <div className="">
                    <div className="">
                      <input
                        className="w-10/12"
                        type="email"
                        placeholder="enter new email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errorEmail ? (
                        <>
                          <p className="font-bold text-red-300">{errorEmail}</p>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="w-full md:w-10/12 my-4 flex justify-between">
                      <button
                        onClick={handelEmail}
                        type="submit"
                        className="font-bold bg-blue-500 px-4 py-2 text-white rounded-xl"
                      >
                        change{' '}
                      </button>
                      <button
                        className="font-bold bg-red-500 px-4 py-2 text-white rounded-xl"
                        onClick={() => {
                          setFlagEmail(false);
                          setErrorEmail('');
                        }}
                      >
                        cancle
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              <h4 className="font-bold text-xl text-gray-500">Joined On</h4>
              <p className="mb-10 mt-2">
                {String(user.createdAt).substring(0, 10)}
              </p>
              <div className="flex flex-col">
                {user.role === 'user' ? (
                  <Link
                    to={'/forget/password'}
                    className="py-4 text-center font-bold mb-4 rounded-xl text-white bg-rose-500 w-1/2"
                  >
                    My Orders
                  </Link>
                ) : (
                  ''
                )}
                <div className="w-full md:w-10/12 flex justify-between items-center flex-wrap mb-6 mt-2">
                  <p>Change password</p>
                  <p
                    className="font-bold text-yellow-400 cursor-pointer"
                    onClick={() => setFlagPassword(true)}
                  >
                    change
                  </p>
                </div>
                {flagPassword ? (
                  <>
                    <div className="">
                      <div className="">
                        <p className="mb-2 font-bold">old password</p>
                        <input
                          type="password"
                          placeholder="enter old password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorPassword ? (
                          <>
                            <p className="font-bold text-red-300">
                              {errorPassword}
                            </p>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="w-full md:w-10/12 my-4 flex justify-between">
                        <button
                          onClick={handelPassword}
                          type="submit"
                          className="font-bold bg-blue-500 px-4 py-2 text-white rounded-xl"
                        >
                          change{' '}
                        </button>
                        <button
                          className="font-bold bg-red-500 px-4 py-2 text-white rounded-xl"
                          onClick={() => {
                            setFlagPassword(false);
                            setErrorPassword('');
                          }}
                        >
                          cancle
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {flagnewPassword ? (
                  <>
                    <div className="">
                      <div className="flex flex-col w-2/3">
                        <input
                          type="password"
                          placeholder="enter new password"
                          onChange={(e) => setnewPassword(e.target.value)}
                        />
                        {errornewPassword ? (
                          <>
                            <p className="font-bold text-red-300">
                              {errornewPassword}
                            </p>
                          </>
                        ) : (
                          ''
                        )}
                        <input
                          className="mt-4"
                          type="password"
                          placeholder="enter conferim password"
                          onChange={(e) => setcPassword(e.target.value)}
                        />
                        {errorcPassword ? (
                          <>
                            <p className="font-bold text-red-300">
                              {errorcPassword}
                            </p>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="w-full md:w-10/12 my-4 flex justify-between">
                        <button
                          onClick={handelNewPassword}
                          type="submit"
                          className="font-bold bg-blue-500 px-4 py-2 text-white rounded-xl"
                        >
                          change{' '}
                        </button>
                        <button
                          className="font-bold bg-red-500 px-4 py-2 text-white rounded-xl"
                          onClick={() => {
                            setFlagnewPassword(false);
                            setErrornewPassword('');
                            setErrorcPassword('');
                          }}
                        >
                          cancle
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
