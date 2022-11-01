import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const { dispatch } = useContext(appContext);

  //async function searchHandler(e) {}
  useEffect(() => {
    const searchHandler = async () => {
      dispatch({ type: 'all_products_request' });
      const { data } = await axios.get(`/api/v1/products?key=${keyword}`);
      //console.log(data);
      dispatch({ type: 'all_products_success', payload: data });
    };
    searchHandler();
  }, [dispatch, keyword]);

  return (
    <div className="w-1/2 hidden  sm:hidden md:block">
      <div className="search relative hidden  sm:hidden md:flex">
        <input
          className="w-full border-none focus:ring-0 "
          type="search"
          placeholder="Enter Product Name..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="bg-yellow-300 flex items-center px-2 cursor-pointer">
          <i className="fas fa-search  "></i>
        </div>
      </div>
    </div>
  );
}
