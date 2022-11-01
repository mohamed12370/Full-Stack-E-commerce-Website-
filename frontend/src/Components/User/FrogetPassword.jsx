import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FrogetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorCPassword, setErrorCPassword] = useState('');

  const [emailflag, setEmailFlag] = useState(true);
  const [Passwordflag, setPasswordFlag] = useState(false);

  const [message, setMessage] = useState('');
  const [id, setId] = useState('');

  function handelEmail(e) {
    setMessage('');
    setErrorEmail('');
    setEmail(e);
  }

  function handelPassword(e) {
    setMessage('');
    setErrorPassword('');
    setPassword(e);
  }

  function handelCPassword(e) {
    setMessage('');
    setErrorCPassword('');
    setCPassword(e);
  }

  async function handelConfiremEmail(e) {
    e.preventDefault();
    try {
      if (email === '') {
        setMessage('');
        setErrorEmail('Plz enter email is Required');
      }
      if (email !== '') {
        const { data } = await axios.post(`/api/v1/password/forgot`, { email });
        if (data.success) {
          setId(data.id);
          setEmailFlag(false);
          setPasswordFlag(true);
        } else {
          if (data.err) {
            return setMessage(data.err[0][0].message);
          }
          setMessage(data.message);
        }
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  async function handelConfiremPassword(e) {
    e.preventDefault();
    if (password === '') {
      setMessage('');
      setErrorPassword('Plz enter password is Required');
    }
    if (cPassword === '') {
      setMessage('');
      setErrorCPassword('Plz enter Confrim password is Required');
    }
    if (password.length < 6 && password !== '') {
      setMessage('');
      setErrorPassword(
        'Plz enter password min length is 3 and max length is 30 Required'
      );
    }
    if (cPassword.length < 6 && cPassword !== '') {
      setMessage('');
      setErrorCPassword(
        'Plz enter confirm password min length is 3 and max length is 30 Required'
      );
    }
    if (password !== cPassword) {
      setErrorCPassword('');
      setErrorPassword('');
      setMessage('confrim password not match password');
    }
    if (password !== '' && cPassword !== '' && password === cPassword) {
      const { data } = await axios.post(`/api/v1/password/forgot`, {
        password,
        cPassword,
        id,
      });
      if (data.success) {
        setMessage('succes');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        if (data.err) {
          return setMessage(data.err[0][0].message);
        }
        setMessage(data.message);
      }
    }
  }

  return (
    <div className="container mx-auto mb-4">
      <div className="w-full md:w-10/12 mx-auto shadow-2xl rounded-xl min-h-[80vh] p-4">
        <h2 className="font-bold text-2xl mb-6 text-gray-500">
          Reset Password
        </h2>
        {emailflag ? (
          <div className="">
            <form onSubmit={handelConfiremEmail}>
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-2 mb-4"
                onChange={(e) => handelEmail(e.target.value)}
              />
              {errorEmail ? (
                <p className="font-bold text-red-900 mb-4">{errorEmail}</p>
              ) : (
                ''
              )}
              <input
                type="submit"
                value="Confirem Email"
                className="bg-yellow-300 py-2 px-4 rounded-lg cursor-pointer"
              />
            </form>
          </div>
        ) : (
          ''
        )}
        {Passwordflag ? (
          <div className="">
            <form onSubmit={handelConfiremPassword}>
              <label htmlFor="password">Enter Password:</label>
              <input
                type="password"
                id="password"
                className="w-full mt-2 mb-4"
                onChange={(e) => handelPassword(e.target.value)}
              />
              {errorPassword ? (
                <p className="font-bold text-red-900 mb-4 ">{errorPassword}</p>
              ) : (
                ''
              )}
              <label htmlFor="cpassword">Confrim Password:</label>
              <input
                type="password"
                id="cpassword"
                onChange={(e) => handelCPassword(e.target.value)}
                className="w-full mt-2 mb-4"
              />
              {errorCPassword ? (
                <p className="font-bold text-red-900 mb-4">{errorCPassword}</p>
              ) : (
                ''
              )}
              <input
                type="submit"
                value="Reset Passwword"
                className="bg-yellow-300 py-2 px-4 rounded-lg cursor-pointer"
              />
            </form>
          </div>
        ) : (
          ''
        )}
        {message ? (
          <p className="font-bold text-blue-900 mb-4 mt-4 text-2xl">
            {message}
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
