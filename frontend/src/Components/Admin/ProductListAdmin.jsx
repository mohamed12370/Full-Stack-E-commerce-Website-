import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { appContext } from '../../Context';

export default function ProductListAdmin({ product }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(appContext);

  async function deleteProduct(e) {
    const { data } = await axios.delete(
      `/api/v1/admin/product/${e._id}?fileName=${e.fileName}`
    );
    //console.log(data);
    if (data.success) {
      dispatch({ type: 'deleteProduct', payload: data.products });
    }
  }

  function handelUpdate(e) {
    navigate(`/product/update/${e}`);
  }

  return (
    <div>
      <div className="products border-2 shadow-lg rounded-xl py-2">
        <div className="img w-44 mx-auto">
          <img
            className="max-w-full h-40 rounded-2xl"
            src={
              product.image ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png'
            }
            alt=""
          />
        </div>
        <div className="desc my-4 font-bold px-2 ">
          <Link
            to={`/product/${product._id}`}
            className="hover:text-red-500 hover:font-bold transition-all duration-500"
          >
            {product.name}
          </Link>
          <p className="my-2">${product.price}</p>
          <p>stock: {product.stock}</p>
        </div>
        <div className="btns my-2 flex justify-evenly items-center flex-wrap">
          <button
            className="bg-red-500 text-white p-2 rounded-lg"
            onClick={() => deleteProduct(product)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={() => handelUpdate(product._id)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
