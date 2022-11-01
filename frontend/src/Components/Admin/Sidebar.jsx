import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar border text-white">
      <div className="products">
        <p className="font-bold text-center text-xl mt-2 border-b-2">
          + Products
        </p>
        <p
          className="text-center my-2 cursor-pointer bg-teal-500 py-1"
          onClick={() => {
            navigate('/dashbord');
          }}
        >
          - All Products
        </p>
        <p
          className="text-center my-2 cursor-pointer bg-teal-500 py-1"
          onClick={() => {
            navigate('/product/new');
          }}
        >
          - Add Product
        </p>
      </div>
      <div className="orders">
        <p className="font-bold text-center text-xl mt-2 border-b-2">
          + Orders
        </p>
        <p
          className="text-center my-2 cursor-pointer bg-teal-500 py-1"
          onClick={() => {
            navigate('/dashbord/order');
          }}
        >
          - All Orders
        </p>
      </div>
      <div className="users">
        <p className="font-bold text-center text-xl mt-2 border-b-2">+ Users</p>
        <p
          className="text-center my-2 cursor-pointer bg-teal-500 py-1"
          onClick={() => {
            navigate('/dashbord/users');
          }}
        >
          - All Users
        </p>
      </div>
    </div>
  );
}
