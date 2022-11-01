import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Layout/Loading';

const stateOrder = {
  order: [],
};

function getAllOrders(state, action) {
  switch (action.type) {
    case 'orderRequest':
      return {
        ...state,
        loading: true,
        order: [],
      };

    case 'orderSuccess':
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case 'orderFail':
      return {
        ...state,
        loading: false,
        order: [],
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function ListOrder() {
  const [state, dispatch] = useReducer(getAllOrders, stateOrder);
  const { order, loading } = state;
  //console.log(order);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        dispatch({ type: 'orderRequest' });
        const { data } = await axios.get(`api/v1/orders/me`);
        dispatch({ type: 'orderSuccess', payload: data.order });
        //console.log(data);
      } catch (error) {
        dispatch({ type: 'orderFail', payload: error.response.data.message });
      }
    };
    getAllOrders();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 min-h-screen mb-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto px-4">
            <h2 className="font-bold text-2xl mb-6">My Orders</h2>
            <div className="grid-rows-1">
              {order.length === 0 ? (
                <Link
                  to={'/'}
                  className="grid-cols-1 font-bold text-2xl text-center w-full block text-red-500"
                >
                  NO Order Here
                </Link>
              ) : (
                order.map((el, i) => (
                  <div key={i}>
                    <div className="grid-cols-1 mb-4">
                      <div className="item flex justify-between items-center flex-wrap border-b p-1">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">OrderID:</p>
                          <p className="ml-1">{el._id}</p>
                        </div>
                        <div className="flex justify-between items-center md:mx-2 xl:mx-0 my-2 xl:my-0">
                          <p className="font-bold">Num OF Items:</p>
                          <p className="ml-1">{el.orderItems.length}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold">Total:</p>
                          <p className="ml-1">${el.totalPrice}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold">Status:</p>
                          <p
                            className={
                              el.orderStatus === 'Processing'
                                ? 'ml-1 text-red-500'
                                : 'ml-1 text-green-500'
                            }
                          >
                            {el.orderStatus}
                          </p>
                        </div>
                        <div className="">
                          <Link
                            to={`/order/${el._id}`}
                            className="font-bold text-blue-500 cursor-pointer"
                          >
                            Action
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
