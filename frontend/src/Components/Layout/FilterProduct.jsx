import React, { useContext } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';

export default function FilterProduct() {
  const { dispatch } = useContext(appContext);

  async function productFilter(e) {
    if (e === 'All') e = '';
    dispatch({ type: 'all_products_request' });
    const { data } = await axios.get(`/api/v1/products?category=${e}`);
    //console.log(data);
    dispatch({ type: 'all_products_success', payload: data });
  }

  async function productFilterPrice(e) {
    if (e === 'All') e = '';
    if (e === 'Less than $100') e = '0to100';
    if (e === '$100 To $500') e = '100to500';
    if (e === 'More than $500') e = '500to1000000';
    dispatch({ type: 'all_products_request' });
    const { data } = await axios.get(`/api/v1/products?price=${e}`);
    //console.log(data);
    dispatch({ type: 'all_products_success', payload: data });
  }

  async function productFilterReview(e) {
    if (e === 'All') e = '';
    if (e === '0 to 1 Star') e = '0to1';
    if (e === '1 to 2 Star') e = '1to2';
    if (e === '2 to 3 Star') e = '2to3';
    if (e === '3 to 4 Star') e = '3to4';
    if (e === '4 to 5 Star') e = '4to5';
    dispatch({ type: 'all_products_request' });
    const { data } = await axios.get(`/api/v1/products?review=${e}`);
    console.log(data);
    dispatch({ type: 'all_products_success', payload: data });
  }

  return (
    <>
      <div className="px-4 hidden md:block border-b-2 py-6 border-blue-600">
        <h2 className="font-bold mb-2">Categoreys:</h2>
        <ul className="list-disc md:pl-4">
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            All
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Electronics
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Headphones
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Accessories
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Cameras
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Laptops
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilter(e.currentTarget.innerText)}
          >
            Food
          </li>
        </ul>
      </div>
      <div className="px-4 hidden md:block border-b-2 py-6 border-blue-600 ">
        <h2 className="font-bold mb-2">Price:</h2>
        <ul className="list-disc md:pl-4">
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterPrice(e.currentTarget.innerText)}
          >
            All
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterPrice(e.currentTarget.innerText)}
          >
            Less than $100
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterPrice(e.currentTarget.innerText)}
          >
            $100 To $500
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterPrice(e.currentTarget.innerText)}
          >
            More than $500
          </li>
        </ul>
      </div>
      <div className="px-4 hidden md:block border-b-2 py-6">
        <h2 className="font-bold mb-2">Reviews:</h2>
        <ul className="list-disc md:pl-4">
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            All
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            0 to 1 Star
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            1 to 2 Star
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            2 to 3 Star
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            3 to 4 Star
          </li>
          <li
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => productFilterReview(e.currentTarget.innerText)}
          >
            4 to 5 Star
          </li>
        </ul>
      </div>
    </>
  );
}
