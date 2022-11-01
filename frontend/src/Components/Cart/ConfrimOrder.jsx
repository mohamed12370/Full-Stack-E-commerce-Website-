import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../../Context';
import CheckoutSteps from './CheckoutSteps';

export default function ConfrimOrder() {
  const navigate = useNavigate();

  const { state } = useContext(appContext);
  const { user } = state.user;
  const { shipping } = state;
  const { cartItems } = state.cart;
  //console.log(cartItems);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const saveOrder = async () => {
    const oderInfo = {
      shippingInfo: shipping,
      orderItems: [...cartItems],
      paymentInfo: { status: 'no' },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };
    const { data } = await axios.post(`/api/v1/order/new`, oderInfo);
    if (data.success) {
      navigate('/payment');
    }
    console.log(oderInfo.orderItems);
  };

  const processToPayment = async () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    await saveOrder();
  };

  return (
    <>
      <CheckoutSteps step={'confirmOrder'} />
      <div className="container mx-auto px-6 min-h-screen mb-4">
        <div className="w-full flex flex-wrap">
          <div className="mainContentLeft w-full md:w-2/3">
            <div className="left mb-4">
              <h2 className="font-bold text-2xl mb-4 text-gray-400">
                Shipping Info
              </h2>
              <div className="px-6 font-bold">
                <p>Name: {user.name}</p>
                <p className="my-3">Phone: {shipping.phoneNo}</p>
                <p>
                  Address: {shipping.country}, {shipping.address},{' '}
                  {shipping.city},{shipping.postalCode}
                </p>
              </div>
            </div>
            <hr />
            <div className="right mt-4">
              <h2 className="font-bold text-2xl mb-4 text-gray-400">
                Your Cart Items
              </h2>
              <div className="grid-rows-1">
                <div className="grid-cols-1">
                  {cartItems &&
                    cartItems.map((el, index) => (
                      <div key={index}>
                        <div className="item flex justify-evenly md:justify-around items-center flex-wrap mb-4">
                          <div className="img w-1/4 md:w-32 ">
                            <img
                              className="rounded-full"
                              src={el.image}
                              alt=""
                            />
                          </div>
                          <div className="name md:mr-4 my-2 xl:my-0 text-center">
                            <Link to={`/product/${el.id}`}>{el.name}</Link>
                          </div>
                          <div className="price">
                            {el.count} * ${el.price} = ${el.count * el.price}
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mainContentRight w-full md:w-1/3 px-6">
            <div className="box mt-12 border p-4 ">
              <h2 className="font-bold mb-2">Order Summary</h2>
              <hr />
              <div className="my-4">
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <span>${itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <p>Shipping:</p>
                  <span>${shippingPrice}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <p>tax: </p>
                  <span>${taxPrice}</span>
                </div>
                <hr />
                <div className="flex justify-between mt-4">
                  <p>Total: </p>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <hr />
              <button
                className="bg-yellow-300 block mt-4 py-2 px-4 rounded-xl text-white mx-auto"
                onClick={processToPayment}
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
