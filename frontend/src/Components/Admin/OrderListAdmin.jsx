import React, { useContext, useEffect } from 'react';
import { appContext } from '../../Context';
import Sidebar from './Sidebar';
import axios from 'axios';
import Loading from '../Layout/Loading';
import { useNavigate } from 'react-router-dom';

export default function OrderListAdmin() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(appContext);
  const { orders, loading, totalAmount } = state;
  //console.log(orders);

  useEffect(() => {
    const getAllOrders = async () => {
      dispatch({ type: 'allOrdersRequest' });
      const { data } = await axios.get(`/api/v1/admin/orders`);
      //console.log(data);
      if (data.success) {
        dispatch({ type: 'allOrdersSuccess', payload: data });
      }
    };
    getAllOrders();
  }, [dispatch]);

  async function deleteOrder(e) {
    const { data } = await axios.delete(`/api/v1/admin/order/${e}`);
    //console.log(data);
    if (data.success) {
      dispatch({ type: 'allOrdersSuccess', payload: data });
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
        <div className="container mx-auto px-2">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="font-bold text-gray-500 text-2xl">
              All Orders:{' '}
              <span className="text-yellow-500">{orders?.length || 0}</span>{' '}
            </h2>
            <h2 className="font-bold text-gray-500 text-2xl mt-2 md:mt-0">
              Total Amount: <span className="text-cyan-500">{totalAmount}</span>
            </h2>
          </div>
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-1 gap-2">
              {orders?.length === 0 ? (
                <p>There No Order Here</p>
              ) : (
                orders.map((el, i) => (
                  <div
                    key={i}
                    className="order border px-2 py-3 shadow-xl mt-6"
                  >
                    <div className="font-bold">
                      <p className="cursor-pointer">
                        ID: {el._id.slice(0, 20)}
                      </p>
                      <p className="my-3">
                        Num Of Items: {el.orderItems?.length}
                      </p>
                      <p className="my-3"> Amount: {el.totalPrice}</p>
                      <p
                        className={
                          el.orderStatus === 'Processing'
                            ? 'text-red-500 font-bold'
                            : el.orderStatus === 'Shipped'
                            ? 'text-yellow-500 font-bold'
                            : 'text-green-500 font-bold'
                        }
                      >
                        Status: {el.orderStatus}
                      </p>
                    </div>
                    <div className="btns mt-4 flex justify-evenly items-center flex-wrap">
                      <button
                        className="font-bold p-3 bg-red-500 text-white rounded-xl"
                        onClick={() => deleteOrder(el._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="font-bold p-3 bg-cyan-500 text-white rounded-xl"
                        onClick={() => {
                          navigate(`/dashbord/order/${el._id}`);
                        }}
                      >
                        Action
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
