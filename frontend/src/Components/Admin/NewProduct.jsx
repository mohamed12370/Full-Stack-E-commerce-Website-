import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function NewProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [price, setPrice] = useState(0);
  const [errorPrice, setErrorPrice] = useState('');

  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const [category, setCategory] = useState('Electronics');
  const [errorCategory, setErrorCategory] = useState('');

  const [stock, setStock] = useState(0);
  const [errorStock, setErrorStock] = useState('');

  const [seller, setSeller] = useState('');
  const [errorSeller, setErrorSeller] = useState('');

  const [image, setImage] = useState([]);
  const [errorImage, setErrorImage] = useState('');

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

  async function handelSubmit(e) {
    e.preventDefault();
    if (name === '') {
      return setErrorName('name of product');
    }
    if (price === 0) {
      return (setErrorPrice('Price of product'),
        setErrorName(''));
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
    }
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
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('seller', seller);
      formData.append('stock', stock);

      const { data } = await axios.post(`/api/v1/admin/product/new`, formData);
      if (data.success) {
        alert('Success');
        navigate('/dashbord');
        // console.log(data);
      }
    }
  }

  return (
    <div className="container mx-auto px-1 md:px-3 xl:px-0 min-h-screen mb-6 flex">
      <div className="container mx-auto w-1/3 md:w-1/4 min-h-screen  bg-slate-900">
        <Sidebar />
      </div>
      <div className="addproduct container mx-auto">
        <div className="w-full md:w-2/3 mx-auto border-2 shadow-2xl px-2 md:px-6 py-5">
          <h2 className="font-bold my-4 text-xl text-gray-500">
            Add New Product
          </h2>
          <form onSubmit={handelSubmit}>
            <label htmlFor="name" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="entre name"
              className="w-full my-2"
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
              placeholder="ente price"
              className="w-full my-2"
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
              id="desc"
              placeholder="ente price"
              className="w-full my-2 h-32"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errorDescription ? (
              <p className="text-red-900 font-bold mb-3">{errorDescription}</p>
            ) : (
              ''
            )}

            <label htmlFor="cat" className="font-bold">
              Category:
            </label>
            <select
              id="cat"
              className="w-full my-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errorCategory ? (
              <p className="text-red-900 font-bold mb-3">{errorCategory}</p>
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
              onChange={(e) => setSeller(e.target.value)}
            />
            {errorSeller ? (
              <p className="text-red-900 font-bold mb-3">{errorSeller}</p>
            ) : (
              ''
            )}

            <label htmlFor="image" className="font-bold">
              image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full my-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {errorImage ? (
              <p className="text-red-900 font-bold mb-3">{errorImage}</p>
            ) : (
              ''
            )}

            <button
              type="submit"
              className="block bg-yellow-400 text-white mt-4 p-2 rounded-xl "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
