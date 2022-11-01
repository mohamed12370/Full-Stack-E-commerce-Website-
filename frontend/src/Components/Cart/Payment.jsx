import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

export default function Payment() {
  const navigate = useNavigate();
  const [cardnum, setCardNum] = useState('');
  const [cardexpriy, setCardExpriy] = useState('');
  const [cardcvc, setCardCvc] = useState('');

  async function handelSubmit(e) {
    e.preventDefault();
    if (cardnum === '' || cardnum.length <= 13) {
      return alert('plz enter correct card number');
    } else if (cardexpriy === '' || cardexpriy.length < 2) {
      return alert('plz enter correct card expriy');
    } else if (cardcvc === '' || cardcvc.length <= 2) {
      return alert('plz enter correct card cvc');
    } else {
      alert('Success');
      navigate('/');
    }
  }

  return (
    <div className="container mx-auto px-6 min-h-screen mb-6">
      <CheckoutSteps step={'payment'} />
      <div className="w-full md:w-10/12 mx-auto">
        <h2 className="font-bold text-2xl text-gray-400 mb-6">Card Info:</h2>
        <form className="shadow-2xl px-4 py-12" onSubmit={handelSubmit}>
          <label htmlFor="cardnum">Card Number:</label>
          <input
            type={'text'}
            id="cardnum"
            className="w-full mt-2 mb-4"
            placeholder="1234 1234 1234 1234"
            onChange={(e) => setCardNum(e.target.value)}
          />
          <label htmlFor="cardnum">Card Expiry:</label>
          <input
            type={'text'}
            id="cardnum"
            className="w-full mt-2 mb-4"
            placeholder="mm/dd"
            onChange={(e) => setCardExpriy(e.target.value)}
          />
          <label htmlFor="cardnum">Card CVC:</label>
          <input
            type={'text'}
            id="cardnum"
            className="w-full mt-2"
            placeholder="CVC"
            onChange={(e) => setCardCvc(e.target.value)}
          />
          <button
            type="submit"
            className="block bg-yellow-400 text-white w-full md:w-10/12 mx-auto mt-4 py-2 rounded-xl"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}
