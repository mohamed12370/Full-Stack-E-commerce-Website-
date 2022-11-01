import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { appContext } from '../../Context';
import Loading from '../Layout/Loading';
import ProductListAdmin from './ProductListAdmin';
import Sidebar from './Sidebar';

export default function Dashbord() {
  const { state, dispatch } = useContext(appContext);
  const { loading, products } = state;
  //console.log(products);
  let outOFStock = 0;
  if (products) {
    products.forEach((el) => {
      if (el.stock === 0) {
        outOFStock += 1;
      }
    });
  }

  useEffect(() => {
    const getAllProduct = async () => {
      dispatch({ type: 'all_products_request' });
      const { data } = await axios.get(`/api/v1/admin/prodcuts`);
      //console.log(data);
      if (data.success) {
        dispatch({ type: 'all_products_success', payload: data });
      }
    };
    getAllProduct();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-1 md:px-3 xl:px-0 min-h-screen mb-6 flex">
      <div className="container mx-auto w-1/3 md:w-1/4 min-h-screen  bg-slate-900">
        <Sidebar />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-1 md:px-2">
          <div className="heading mb-4 font-bold bg-slate-600 text-white p-3 flex justify-between items-center flex-wrap">
            <p className="bg-green-500 p-1 mb-2 md:mb-0">
              Product Items: {products?.length || 0}
            </p>
            <p className="bg-yellow-500 p-1">Out OF Stock: {outOFStock}</p>
          </div>
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {products &&
                products.map((el, i) => (
                  <ProductListAdmin key={i} product={el} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
