import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { appContext } from '../../Context';

export default function Login() {
  const { dispatch } = useContext(appContext);
  const navigate = useNavigate();

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resError, setResError] = useState('');

  function handelEmail(e) {
    setErrorEmail('');
    setEmail(e);
  }

  function handelPassword(e) {
    setErrorPassword('');
    setPassword(e);
  }

  async function handelLogin(e) {
    e.preventDefault();
    try {
      if (email === '') {
        setErrorEmail('email is required');
      }
      if (password === '') {
        setErrorPassword('password is required');
      }
      if (email !== '' && password !== '') {
        const { data } = await axios.post('/api/v1/login', {
          email,
          password,
        });
        //console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.findEmail));
          dispatch({ type: 'userLogin', payload: data.findEmail });
          navigate('/home');
        } else {
          setResError(data.err[0][0].message);
        }
      }
    } catch (error) {
      setResError(error.response.data.message);
    }
  }

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-center items-center flex-col">
      <div className="w-full md:w-1/2 md:mx-auto shadow-2xl p-4">
        <h2 className="font-bold text-2xl mb-6 text-gray-500">Login Now:</h2>
        <form onSubmit={handelLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Entre Email"
            className="block mt-2 mb-4 w-full"
            onChange={(e) => handelEmail(e.target.value)}
          />
          {errorEmail ? (
            <div className="mb-4">
              <p className="font-bold text-red-900">{errorEmail}</p>
            </div>
          ) : (
            ''
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Entre Password"
            className="block mt-2 mb-4 w-full"
            onChange={(e) => handelPassword(e.target.value)}
          />
          {errorPassword && (
            <div className="mb-4">
              <p className="font-bold text-red-900">{errorPassword}</p>
            </div>
          )}
          <Link
            to="/forget/password"
            className="text-gray-500 font-bold hover:text-red-500 transition-all duration-500 ml-auto block cursor-pointer "
          >
            Froget Password?
          </Link>
          <input
            type="submit"
            value="Login"
            className="my-4 bg-yellow-300 p-4 rounded-lg cursor-pointer text-cyan-800"
          />
        </form>
        <div className="my-4">
          <p className="font-bold text-lg">
            Create New Acount{' '}
            <Link
              to="/singup"
              className="text-gray-500 hover:text-red-500 transition-all duration-500"
            >
              Sing Up
            </Link>
          </p>
        </div>
        <p className="text-rose-900 font-bold my-6">
          {resError ? resError : ''}
        </p>
      </div>
    </div>
  );
}
