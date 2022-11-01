import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Loading from '../Layout/Loading';
import { appContext } from '../../Context';

const stateOrder = {
  order: [],
};

function getOrder(state, action) {
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

export default function UpdateOrder() {
  const params = useParams();
  const { id } = params;

  const [status, setStatus] = useState('');

  const [state, dispatch] = useReducer(getOrder, stateOrder);
  const { loading, order } = state;

  const { dispatch: dispatchContext } = useContext(appContext);

  const { orderItems, user, shippingInfo } = order;
  //console.log(orderItems);

  useEffect(() => {
    const getOrder = async () => {
      try {
        dispatch({ type: 'orderRequest' });
        const { data } = await axios.get(`/api/v1/order/${id}`);
        //console.log(data);
        dispatch({ type: 'orderSuccess', payload: data.order });
      } catch (error) {
        dispatch({ type: 'orderFail', payload: error.response.data.message });
      }
    };
    getOrder();
  }, [dispatch, id]);

  async function updateOrder() {
    try {
      if (status === '') {
        alert('chose your status');
      }
      const { data } = await axios.put(`/api/v1/admin/order/${id}`, {
        status,
      });
      console.log(data);
      if (data.success) {
        dispatch({ type: 'orderSuccess', payload: data.upOrder });
        dispatchContext({ type: 'allOrdersSuccess', payload: data });
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
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
        order && (
          <div className="container mx-auto px-1 md:px-2">
            <h1 className="font-bold text-sm  md:text-2xl mb-6">
              Order: {order._id}
            </h1>
            {shippingInfo && (
              <>
                <div className="shipping border-b-2">
                  <h2 className="font-bold text-xl mb-4 text-gray-400">
                    Shipping Info:
                  </h2>
                  <div className="px-4">
                    <p className="font-bold">Name: {user.name}</p>
                    <p className="font-bold my-2">
                      Phone: {shippingInfo.phoneNo}
                    </p>
                    <p className="font-bold">
                      Address: {shippingInfo.postalCode}, {shippingInfo.city},{' '}
                      {shippingInfo.address}, {shippingInfo.country}
                    </p>
                    <p className="font-bold my-2">Total: ${order.totalPrice}</p>
                  </div>
                </div>
              </>
            )}
            <div className="payment mt-4 border-b-2">
              <h2 className="font-bold text-xl mb-4 text-gray-400">
                Payment Info:
              </h2>
              <div className="mb-4">
                {order.paymentInfo?.status === 'no' ? (
                  <p className="text-red-500 font-bold">Not Payed</p>
                ) : (
                  <p className="text-green-500 font-bold">Payed</p>
                )}
              </div>
            </div>
            <div className="orderStatus mt-4 border-b-2">
              <h2 className="font-bold text-xl mb-4 text-gray-400">
                OrderStatus :
              </h2>
              <div className="flex justify-between flex-col md:flex-row">
                <div className="mb-4">
                  {order?.orderStatus && (
                    <p
                      className={
                        order.orderStatus === 'Processing'
                          ? 'text-red-500 font-bold'
                          : order.orderStatus === 'Shipped'
                          ? 'text-yellow-500 font-bold'
                          : 'text-green-500 font-bold'
                      }
                    >
                      {order.orderStatus}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    className="bg-cyan-500 text-white block p-3 rounded-lg my-3"
                    onClick={updateOrder}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
            {orderItems && (
              <>
                <div className="orderItems mt-4 border-b-2">
                  <h2 className="font-bold text-xl mb-4 text-gray-400">
                    Order Items :
                  </h2>
                  <div className="mb-4">
                    {orderItems &&
                      orderItems.map((el, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center flex-wrap flex-col md:flex-row pr-4 mb-2"
                        >
                          <img
                            className="w-32"
                            src={
                              el.image ||
                              'https://digital-aarena.com/wp-content/uploads/2022/01/10622.jpg'
                            }
                            alt=""
                          />
                          <Link to={`/product/${el.id}`} className="font-bold">
                            {' '}
                            {el.name}
                          </Link>
                          <p className="font-bold"> ${el.price}</p>
                          <p className="font-bold">count: ({el.count})</p>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}
