import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { appContext } from '../Context';
import Product from './Product/Product';
import Loading from './Layout/Loading';
import { toast, ToastContainer } from 'react-toastify';
import FilterProduct from './Layout/FilterProduct';
import NumPages from './Layout/NumPages';

export default function Home() {
  const { state, dispatch } = useContext(appContext);
  const { loading, products, productsCount, count } = state;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({ type: 'all_products_request' });
        const { data } = await axios.get(`/api/v1/products`);
        //console.log(data);
        dispatch({ type: 'all_products_success', payload: data });
      } catch (error) {
        toast.error(`${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: 'all_products_fatil',
          payload: error.response.message,
        });
      }
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto my-4">
        <h2 className="font-bold text-2xl pl-4">Latest Products</h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto flex flex-row-reverse min-h-screen">
          <section className="flex flex-col items-center w-full">
            <ToastContainer />
            <div className="grid grid-rows-1 mb-4">
              {count ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {products &&
                      products.map((product, index) => (
                        <Product key={index} product={product} />
                      ))}
                  </div>
                </>
              ) : (
                <div className="bg-red-400 text-white p-6 font-bold cursor-pointer text-2xl">
                  there are no products try anthoer way
                </div>
              )}
            </div>
            <NumPages productsCount={productsCount} count={count} />
          </section>
          <section className="mr-auto mt-auto">
            <FilterProduct />
          </section>
        </div>
      )}
    </>
  );
}
