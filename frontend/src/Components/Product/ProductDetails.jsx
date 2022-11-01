import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Rating from '../Layout/Rating';
import ProductReview from './ProductReview';
import { useState } from 'react';
import Loading from '../Layout/Loading';
import { useContext } from 'react';
import { appContext } from '../../Context';

export default function ProductDetails() {
  const [addReview, setAddReview] = useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const { state: stateContext, dispatch: dispatchContext } =
    useContext(appContext);
  const { cartItems } = stateContext.cart;
  const { singelProduct: product, loading } = stateContext;
  const { user } = stateContext.user;

  function addToCart() {
    const newProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      count,
    };
    if (product.stock) {
      const isItemExist = cartItems.find((el) => el.id === newProduct.id);
      if (!isItemExist) {
        cartItems.push(newProduct);
        localStorage.setItem('products', JSON.stringify(cartItems));
        dispatchContext({ type: 'addToCart', payload: cartItems });
      } else {
        const cartItempUpdate = cartItems.map((el) =>
          el.id === newProduct.id ? newProduct : el
        );
        localStorage.setItem('products', JSON.stringify(cartItempUpdate));
        dispatchContext({ type: 'addToCart', payload: cartItempUpdate });
      }
      //console.log(isItemExist);
    }
  }

  const changeAddReview = () => {
    setAddReview(!addReview);
  };

  const increase = () => {
    let newCount = count;
    if (count < product.stock) {
      newCount += 1;
      setCount(newCount);
    }
  };

  const decrease = () => {
    let newCount = count;
    if (count > 1) {
      newCount -= 1;
      setCount(newCount);
    }
  };

  async function deleteReview(e) {
    const { data } = await axios.put(`/api/v1/review`, {
      productId: id,
      reviewId: e._id,
    });
    console.log(data);
    if (data.success) {
      dispatchContext({
        type: 'singleProductSuccess',
        payload: data.product,
      });
    }
  }

  useEffect(() => {
    const myProduct = async () => {
      try {
        dispatchContext({ type: 'singleProductRequest' });
        const { data } = await axios.get(`/api/v1/product/${id}`);
        if (data.success) {
          dispatchContext({
            type: 'singleProductSuccess',
            payload: data.product,
          });
        } else {
          toast.error(`${data.err[0][0].message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
        dispatchContext({
          type: 'singleProductFail',
          payload: error.response.data.message,
        });
      }
    };
    myProduct();
  }, [dispatchContext, id]);

  return (
    <div className="container mx-auto min-h-screen mb-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto">
            <ToastContainer />
            {product && (
              <div className="flex justify-between px-1 relative flex-wrap xl:flex-nowrap">
                <div
                  className="left w-2/3 mx-auto mb-4 flex justify-center items-center md:w-1/2 md:flex md:justify-center
                 md:items-center"
                >
                  <img className="w-52" src={product.image} alt="" />
                </div>
                <div className="right w-full md:w-1/2">
                  <h2 className="font-bold text-sm md:text-2xl pb-2 max-w-10/12">
                    {product.name}
                  </h2>
                  <hr />
                  <div className="py-3">
                    <Rating rating={product.ratings} /> ({product.numOfReviews})
                    Reviews
                  </div>
                  <hr />
                  <p className="pt-2 text-lg md:text-2xl font-bold">
                    ${product.price}
                  </p>
                  <br />
                  <div className="flex flex-wrap pb-3">
                    <div className="">
                      <span
                        className="bg-red-600 p-1 md:py-1 md:px-2 text-white mr-1 md:mr-3 cursor-pointer"
                        onClick={decrease}
                      >
                        -
                      </span>
                      {count}
                      <span
                        className="bg-blue-600 p-1 md:py-1 md:px-2 text-white ml-1 md:ml-3 cursor-pointer"
                        onClick={increase}
                      >
                        +
                      </span>
                    </div>
                    <button
                      className="bg-yellow-300 block rounded-full w-fit p-2 md:py-2 md:px-4 ml-10"
                      onClick={addToCart}
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <hr />
                  <p
                    className={
                      product.stock > 0
                        ? `py-5 font-bold text-green-500`
                        : 'py-5 font-bold text-red-500'
                    }
                  >
                    Status:{product.stock > 0 ? ' in Stock' : ' Unavailable'}
                  </p>
                  <hr />
                  <div className="desc py-4">
                    <span className="font-bold text-xl">Description:</span>{' '}
                    <br />
                    <p className="mt-4">{product.description}</p>
                  </div>
                  <hr />
                  <p className="font-bold py-4">Sold by: {product.seller}</p>
                  <hr />
                  <div className="py-4">
                    <button
                      className="bg-yellow-300 py-3 px-6 rounded-full"
                      onClick={changeAddReview}
                    >
                      Submit Your Review
                    </button>
                  </div>
                </div>
              </div>
            )}
            <ProductReview
              addReview={addReview}
              changeAddReview={changeAddReview}
              product={product}
            />
            <div className="container mx-auto px-6">
              <h2 className="font-bold text-2xl text-gray-400 mb-4">
                Comments:
              </h2>
              <div className="container mx-auto px-6">
                {product.reviews &&
                  product.reviews.map((el, i) => (
                    <div key={i} className="border-b-2 pb-2">
                      <div className="mb-2 flex justify-between items-center">
                        <div className="">
                          <Rating rating={el.rating} />
                          <p>{el.name}</p>
                        </div>
                        {user._id === el.user ? (
                          <i
                            className="fas fa-close font-bold text-red-500 text-xl md:text-2xl cursor-pointer"
                            onClick={() => deleteReview(el)}
                          ></i>
                        ) : (
                          ''
                        )}
                      </div>
                      <p>{el.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
