import React, { useContext, useState } from 'react';
import { countries } from 'countries-list';
import { appContext } from '../../Context';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';

export default function Shipping() {
  const navigate = useNavigate();
  const countriesList = Object.values(countries);

  const { state, dispatch } = useContext(appContext);

  const [address, setAddress] = useState(state.shipping.address);
  const [errorAddress, setErrorAddress] = useState('');

  const [city, setCity] = useState(state.shipping.city);
  const [errorCity, setErrorCity] = useState('');

  const [postalCode, setPostalCode] = useState(state.shipping.postalCode);
  const [errorPostalCode, setErrorPostalCode] = useState('');

  const [phoneNo, setPhoneNo] = useState(state.shipping.phoneNo);
  const [errorPhoneNo, setErrorPhoneNo] = useState('');

  const [country, setCountry] = useState(state.shipping.country);
  const [errorCountry, setErrorCountry] = useState('');

  const handelSubmit = (e) => {
    e.preventDefault();
    if (address === '') {
      setErrorAddress('plz enter addres required');
    } else {
      setErrorAddress('');
    }
    if (city === '') {
      setErrorCity('plz enter city required');
    } else {
      setErrorCity('');
    }
    if (postalCode === '') {
      setErrorPostalCode('plz enter Postal Code required');
    } else {
      setErrorPostalCode('');
    }
    if (phoneNo === '') {
      setErrorPhoneNo('plz enter Phone Number required');
    } else {
      setErrorPhoneNo('');
    }
    if (country === '') {
      setErrorCountry('plz enter your country required');
    } else {
      setErrorCountry('');
    }
    if (
      address !== '' &&
      city !== '' &&
      country !== '' &&
      postalCode !== '' &&
      phoneNo !== ''
    ) {
      const newAddress = {
        address,
        city,
        country,
        postalCode,
        phoneNo,
      };
      localStorage.setItem('address', JSON.stringify(newAddress));
      dispatch({ type: 'addShipping', payload: newAddress });
      navigate('/confrimOrder');
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen mb-6">
      <h2 className="font-bold mb-6 text-xl">Shipping info</h2>
      <CheckoutSteps step={'shipping'} />
      <div className="container mx-auto ">
        <form
          onSubmit={handelSubmit}
          className="w-full md:w-10/12 border p-4 mx-auto"
        >
          <label htmlFor="address" className="font-bold">
            Address:
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            className="block mt-2 mb-4 w-full"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errorAddress ? (
            <p className="mb-4 text-red-500">{errorAddress}</p>
          ) : (
            ''
          )}
          <label htmlFor="city" className="font-bold">
            City:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            className="block mt-2 mb-4 w-full"
            onChange={(e) => setCity(e.target.value)}
          />
          {errorCity ? <p className="mb-4 text-red-500">{errorCity}</p> : ''}
          <label htmlFor="phoneNo" className="font-bold">
            PhoneNo:
          </label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            value={phoneNo}
            className="block mt-2 mb-4 w-full"
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          {errorPhoneNo ? (
            <p className="mb-4 text-red-500">{errorPhoneNo}</p>
          ) : (
            ''
          )}
          <label htmlFor="postalCode" className="font-bold">
            Postal Code:
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={postalCode}
            className="block mt-2 mb-4 w-full"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {errorPostalCode ? (
            <p className="mb-4 text-red-500">{errorPostalCode}</p>
          ) : (
            ''
          )}
          <label htmlFor="country" className="font-bold">
            Country:
          </label>
          <select
            id="country_field"
            className="block mt-2 mb-4 w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errorCountry ? (
            <p className="mb-4 text-red-500">{errorCountry}</p>
          ) : (
            ''
          )}
          <button
            type="submit"
            className="bg-yellow-300 w-full md:w-1/2 mx-auto block py-4 rounded-lg mt-6"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
}
