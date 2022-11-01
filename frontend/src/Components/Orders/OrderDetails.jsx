import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Layout/Loading';

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

export default function OrderDetails() {
  const params = useParams();
  const { id } = params;

  const [state, dispatch] = useReducer(getOrder, stateOrder);
  const { loading, order } = state;
  const { orderItems, shippingInfo, user } = order;
  //console.log(order);

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
  }, [id, dispatch]);

  return (
    <div className="container mx-auto px-6 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-2">
          <h1 className="font-bold text-xl md:text-2xl mb-6">
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
            <div className="mb-4">
              {order.orderStatus === 'Processing' ? (
                <p className="text-red-500 font-bold">Processing</p>
              ) : (
                <p className="text-green-500 font-bold">Delivered</p>
              )}
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
                        className="flex justify-between items-center flex-wrap pr-4 mb-2"
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
      )}
    </div>
  );
}
