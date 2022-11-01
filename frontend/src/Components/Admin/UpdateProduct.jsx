import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appContext } from '../../Context';
import Sidebar from './Sidebar';
import axios from 'axios';
import Loading from '../Layout/Loading';
import Rating from '../Layout/Rating';

export default function UpdateProduct() {
  const params = useParams();
  const { id } = params;

  const { state, dispatch } = useContext(appContext);
  const { loading, singelProduct } = state;
  // console.log(cartItems);

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [price, setPrice] = useState(0);
  const [errorPrice, setErrorPrice] = useState('');

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const [category, setCategory] = useState('');
  const [errorCategory, setErrorCategory] = useState('');

  const [stock, setStock] = useState(0);
  const [errorStock, setErrorStock] = useState('');

  const [seller, setSeller] = useState('');
  const [errorSeller, setErrorSeller] = useState('');

  const [image, setImage] = useState([]);
  const [errorImage, setErrorImage] = useState('');

  const [flagImage, setFlagImage] = useState(false);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ];

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'singleProductRequest' });
      const { data } = await axios.get(`/api/v1/product/${id}`);
      if (data.success) {
        dispatch({ type: 'singleProductSuccess', payload: data.product });
      }
      //   console.log(data);
    };
    getProduct();
  }, [dispatch, id]);

  useEffect(() => {
    if (singelProduct) {
      setName(singelProduct.name);
      setPrice(singelProduct.price);
      setDescription(singelProduct.description);
      setCategory(singelProduct.category);
      setStock(singelProduct.stock);
      setSeller(singelProduct.seller);
    }
  }, [singelProduct]);

  async function hamdelSubmit(e) {
    e.preventDefault();
    if (name === '') {
      return setErrorName('name of product');
    }
    if (price === 0) {
      return setErrorPrice('Price of product'), setErrorName('');
    }
    if (description === '') {
      return (
        setErrorDescription('Description of product'),
        setErrorPrice(''),
        setErrorName('')
      );
    }
    if (category === '') {
      return (
        setErrorCategory('category of product'),
        setErrorDescription(''),
        setErrorPrice(''),
        setErrorName('')
      );
    }
    if (stock === 0) {
      return (
        setErrorStock('stock of product'),
        setErrorCategory(''),
        setErrorDescription(''),
        setErrorPrice(''),
        setErrorName('')
      );
    }
    if (seller === 0) {
      return (
        setErrorSeller('seller of product'),
        setErrorStock(''),
        setErrorCategory(''),
        setErrorDescription(''),
        setErrorPrice(''),
        setErrorName('')
      );
    } else {
      const { data } = await axios.put(`/api/v1/admin/product/${id}`, {
        name,
        price,
        category,
        description,
        seller,
        stock,
      });
      if (data.success) {
        dispatch({ type: 'singleProductSuccess', payload: data.product });
        alert('Success');
      }
      //console.log(data);
    }
  }

  async function handelChangeImage(e) {
    e.preventDefault();
    if (image.length === 0) {
      return (
        setErrorImage('image of product'),
        setErrorSeller(''),
        setErrorStock(''),
        setErrorCategory(''),
        setErrorDescription(''),
        setErrorPrice(''),
        setErrorName('')
      );
    } else {
      const formData = new FormData();
      formData.append('image', image);
      const { data } = await axios.put(
        `/api/v1/admin/product/img/${id}`,
        formData
      );
      if (data.success) {
        dispatch({ type: 'singleProductSuccess', payload: data.product });
        setImage([]);
        alert('Success');
      }
      //console.log(singelProduct.fileName);
    }
  }

  async function deleteReview(e) {
    const { data } = await axios.put(`/api/v1/review`, {
      productId: id,
      reviewId: e._id,
    });
    console.log(data);
    if (data.success) {
      dispatch({
        type: 'singleProductSuccess',
        payload: data.product,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <div className="container mx-auto px-1 md:px-3 xl:px-0 min-h-screen mb-6 flex">
        <div className="container mx-auto w-1/3 md:w-1/4 min-h-screen  bg-slate-900">
          <Sidebar />
        </div>
        <div className="container mx-auto ">
          <h2 className="font-bold my-4 text-xl text-gray-500 px-6">
            Update Product:
          </h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full mx-auto border-2 shadow-2xl px-2 md:px-6 py-5 flex justify-between flex-wrap">
              <div className="left w-48 md:w-1/3 flex justify-center items-start flex-col px-1">
                <img
                  className="w-48"
                  src={`${singelProduct.baseUrl}${singelProduct.image}`}
                  alt=""
                />
                <p
                  className="font-bold text-blue-500 cursor-pointer mx-auto"
                  onClick={() => {
                    setFlagImage(!flagImage);
                    setErrorImage('');
                  }}
                >
                  Change
                </p>
                {flagImage ? (
                  <div className=" flex flex-col">
                    <input
                      type="file"
                      className="w-44 my-3"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                      className="font-bold px-2 bg-yellow-400 my-2 text-white"
                      onClick={handelChangeImage}
                    >
                      Svae
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {errorImage ? (
                  <p className="text-red-900 font-bold my-3">{errorImage}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="right w-full md:w-2/3 px-1">
                <form onSubmit={hamdelSubmit}>
                  <label htmlFor="name" className="font-bold">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full my-2"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errorName ? (
                    <p className="text-red-900 font-bold mb-3">{errorName}</p>
                  ) : (
                    ''
                  )}

                  <label htmlFor="price" className="font-bold">
                    Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-full my-2"
                    value={price || 0}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errorPrice ? (
                    <p className="text-red-900 font-bold mb-3">{errorPrice}</p>
                  ) : (
                    ''
                  )}

                  <label htmlFor="desc" className="font-bold">
                    Description:
                  </label>
                  <textarea
                    type="text"
                    id="desc"
                    className="w-full my-2 h-44"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errorDescription ? (
                    <p className="text-red-900 font-bold mb-3">
                      {errorDescription}
                    </p>
                  ) : (
                    ''
                  )}

                  <label htmlFor="cat" className="font-bold">
                    Category:
                  </label>
                  <select
                    id="cat"
                    className="w-full my-2"
                    value={category || ''}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errorCategory ? (
                    <p className="text-red-900 font-bold mb-3">
                      {errorCategory}
                    </p>
                  ) : (
                    ''
                  )}

                  <label htmlFor="stock" className="font-bold">
                    Stock:
                  </label>
                  <input
                    type="number"
                    id="stock"
                    placeholder="ente stock"
                    className="w-full my-2"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  {errorStock ? (
                    <p className="text-red-900 font-bold mb-3">{errorStock}</p>
                  ) : (
                    ''
                  )}

                  <label htmlFor="saller" className="font-bold">
                    Saller Name:
                  </label>
                  <input
                    type="text"
                    id="saller"
                    placeholder="ente stock"
                    className="w-full my-2"
                    value={seller || ''}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                  {errorSeller ? (
                    <p className="text-red-900 font-bold mb-3">{errorSeller}</p>
                  ) : (
                    ''
                  )}

                  <div className="mt-3 flex justify-evenly flex-wrap">
                    <button
                      type="submit"
                      className="block p-2 bg-green-500 text-white"
                    >
                      Save
                    </button>
                    <button className="block p-2 bg-red-500 text-white">
                      Cancle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="comments container mx-auto shadow-2xl border mb-6 bg-slate-300 px-2">
        <h2 className="font-bold text-gray-500 text-2xl">Comments:</h2>
        <div className="">
          {singelProduct?.reviews?.length === 0 ? (
            <p className="my-4 text-red-900 font-bold text-xl">
              there are no comments
            </p>
          ) : (
            <div className="mt-4 px-4">
              {singelProduct &&
                singelProduct.reviews?.map((el, i) => (
                  <div key={i} className="border-b-2 pb-2">
                    <div className="mb-2 flex justify-between items-center">
                      <div className="">
                        <Rating rating={el.rating} />
                        <p>{el.name}</p>
                      </div>
                      <i
                        className="fas fa-close font-bold text-red-500 text-xl md:text-2xl cursor-pointer"
                        onClick={() => deleteReview(el)}
                      ></i>
                    </div>
                    <p>{el.comment}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
