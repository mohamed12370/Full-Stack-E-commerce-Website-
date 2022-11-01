import React from 'react';
import Rating from '../Layout/Rating';
import { Link, useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="box border p-4 cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="item">
          <img className="w-10/12 h-52 mx-auto" src={product.image} alt="" />
          <div className="item-content my-4 hover:text-red-500 transition-all duration-500">
            <Link to={`/product/${product._id}`}>
              <p>{product.name}</p>
            </Link>
          </div>
          <div className="item-price-rating my-4">
            <div className="rating flex mb-2">
              <div className="icons mr-4">
                <Rating rating={product.ratings} />
              </div>
              <p>({product.numOfReviews} Reviews)</p>
            </div>
            <div className="price">
              <p>$ {product.price}</p>
            </div>
          </div>
          <div className="btn bg-yellow-300 text-center py-2 rounded-md text-white hover:text-stone-900 transition-all duration-500">
            <Link to={`/product/${product._id}`}>
              <button>View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
