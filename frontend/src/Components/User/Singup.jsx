import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Singup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorRes, setErrorRes] = useState('');

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function handelName(e) {
    setErrorName('');
    setName(e);
  }

  function handelEmail(e) {
    setErrorEmail('');
    setEmail(e);
  }

  function handelPassword(e) {
    setErrorPassword('');
    setPassword(e);
  }

  async function handelSingup(e) {
    e.preventDefault();
    try {
      if (name === '' || name.length < 3) {
        setErrorName('Plz enter your name is required');
      }
      if (email === '') {
        setErrorEmail('Plz enter your email is required');
      }
      if (password === '') {
        setErrorPassword('Plz enter your password is required');
      }

      if (name !== '' && email !== '' && password !== '') {
        const { data } = await axios.post('/api/v1/register', {
          name,
          email,
          password,
        });
        if (data.success) {
          navigate('/login');
        } else {
          if (data.message === 'error validation') {
            return setErrorRes(data.err[0][0].message);
          }
          setErrorRes(data.message);
        }
      }
    } catch (error) {
      setErrorRes(error.response.data.message);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="w-full md:w-10/12 mx-auto shadow-2xl p-4 rounded-lg min-h-[80vh] mb-4">
        <p className="font-bold text-4xl text-gray-500 mb-6">Register Now:</p>
        <form onSubmit={handelSingup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            min={4}
            max={30}
            placeholder="Enter Your Name"
            className="w-full mt-2 mb-4"
            onChange={(e) => handelName(e.target.value)}
          />
          {errorName ? (
            <p className="text-red-500 mb-4 font-bold">{errorName}</p>
          ) : (
            ''
          )}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your email"
            className="w-full mt-2 mb-4"
            onChange={(e) => handelEmail(e.target.value)}
          />
          {errorEmail ? (
            <p className="text-red-500 mb-4 font-bold">{errorEmail}</p>
          ) : (
            ''
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your password"
            className="w-full mt-2 mb-6"
            onChange={(e) => handelPassword(e.target.value)}
          />
          {errorPassword ? (
            <p className="text-red-500 mb-4 font-bold">{errorPassword}</p>
          ) : (
            ''
          )}
          <input
            type="submit"
            value="Singup"
            className="w-1/4 bg-yellow-300 py-4 rounded-md text-gray-500 cursor-pointer hover:text-red-500 transition-all 
            duration-500"
          />
        </form>
        <div className="mt-6">
          <p className="font-bold text-lg">
            have an acount{' '}
            <Link to="/login" className="cursor-pointer text-cyan-500">
              Singin
            </Link>
          </p>
        </div>
        {errorRes ? (
          <p className="font-bold text-rose-900  text-xl">{errorRes}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
