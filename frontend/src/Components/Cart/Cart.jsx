import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../../Context';

export default function Cart() {
  const { state, dispatch } = useContext(appContext);
  const { cartItems } = state.cart;
  //console.log(cartItems);

  function increase(e) {
    if (e.count < e.stock) {
      e.count = e.count + 1;
      const newItem = cartItems.map((el) => (el.id === e.id ? e : el));
      localStorage.setItem('products', JSON.stringify(newItem));
      dispatch({ type: 'increaseItem', payload: newItem });
    }
  }

  function decrease(e) {
    if (e.count > 1) {
      e.count = e.count - 1;
      const newItem = cartItems.map((el) => (el.id === e.id ? e : el));
      localStorage.setItem('products', JSON.stringify(newItem));
      dispatch({ type: 'decreaseItem', payload: newItem });
    }
  }

  function deleteItem(e) {
    const newItem = cartItems.filter((el) => el.id !== e.id);
    localStorage.setItem('products', JSON.stringify(newItem));
    dispatch({ type: 'deleteItem', payload: newItem });
  }

  return (
    <div className="container mx-auto min-h-screen px-6">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <Link to={'/'} className="font-bold text-xl">
            your cart is empty <span className="text-red-500">go shopping</span>{' '}
          </Link>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-3xl mb-4">
            your cart: {cartItems.length}
          </h2>
          <hr />
          <div className="container mx-auto md:px-4 flex flex-wrap mb-4">
            <div className="items w-full md:w-2/3">
              <div className="grid-rows-1">
                <div className="grid-cols-1">
                  {cartItems &&
                    cartItems.map((el, i) => (
                      <div key={i}>
                        <div className="item py-6 flex justify-center items-center flex-wrap md:flex-nowrap">
                          <div className="image">
                            <img
                              className="w-1/2 mx-auto md:w-52 rounded-full"
                              src={el.image}
                              alt=""
                            />
                          </div>
                          <div className="desc my-4 md:mb-0 flex justify-center items-center md:items-start mx-4">
                            <Link
                              to={`/product/${el.id}`}
                              className="font-bold mr-4 text-sm lg:text-lg"
                            >
                              {el.name}
                            </Link>
                            <p className="font-bold mr-4 text-yellow-300">
                              ${el.price}
                            </p>
                          </div>
                          <div className="controles flex h-fit items-center">
                            <span
                              className="bg-red-400 px-2 font-bold text-2xl rounded-lg cursor-pointer"
                              onClick={() => decrease(el)}
                            >
                              -
                            </span>
                            <span className="font-bold mx-4">{el.count}</span>
                            <span
                              className="bg-blue-400 px-2 font-bold text-2xl rounded-lg cursor-pointer"
                              onClick={() => increase(el)}
                            >
                              +
                            </span>
                            <i
                              className="fas fa-remove ml-4 text-red-500 p-4 rounded-full cursor-pointer"
                              onClick={() => deleteItem(el)}
                            ></i>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full md:w-1/3 mt-6 md:mt-12 h-fit">
              <div className="border px-6 py-8 rounded-lg">
                <h2 className="font-bold mb-2">Order summary</h2>
                <hr />
                <div className="mt-4 w-full mb-2">
                  <div className="flex justify-between">
                    <p className="font-bold">SubTotal:</p>
                    <span>
                      {' '}
                      (
                      {cartItems.reduce((acc, el) => acc + Number(el.count), 0)}
                      ) (Unites)
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="font-bold">Est Total:</p>
                    <span>
                      $
                      {cartItems
                        .reduce((acc, el) => acc + el.count * el.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="btn w-full flex justify-center items-center">
                  <Link
                    to={'/shipping'}
                    className="bg-yellow-300 mt-4 w-2/3 py-2 rounded-xl text-white text-center"
                  >
                    Check Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
